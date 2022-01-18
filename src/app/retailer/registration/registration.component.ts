import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NewRetailerProfileRequest } from '../../_models/NewRetailerProfileRequest';
import { AppStateService } from '../../_services/appStateService';
import { CompanyService } from '../../_services/companyService';

@Component({
  selector: 'app-retailer-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {
  banks: any = ["hdfc", "axis", "sbi"];
  userDetailsForm = new FormGroup({
    registeredName: new FormControl(''),
    businessName: new FormControl(''),
    primaryContactName: new FormControl(''),
    primaryContactNumber: new FormControl(''),
    primaryEmailAddress: new FormControl(''),
    secondaryContactName: new FormControl(''),
    secondaryContactNumber: new FormControl(''),
    secondaryEmailAddress: new FormControl(''),
    pan: new FormControl('')
  });
  constructor(
    private router: Router,
    private companyService: CompanyService,
    public appStateService: AppStateService
  ) { }

  ngOnInit() {
    //this.addStoreDetails();
  }
  completeRegistration() {
    var retailerDetails = new NewRetailerProfileRequest();
    retailerDetails = this.userDetailsForm.getRawValue();
    retailerDetails.createdBy = retailerDetails.primaryContactName;
    retailerDetails.createdDate = new Date().toISOString();
    // this.companyService.createRetailerProfile(retailerDetails,
    //   (res: any) => {
    //     if (res) {
    //       this.appStateService.retailerId = res.retailerId;
    //       this.appStateService.retailerName = retailerDetails.primaryContactName;
    //       this.router.navigate(["/bankdetails"]);
    //     }
    //   },
    //   (err: any) => {
    //   });
    this.appStateService.retailerId = 2;
    this.appStateService.retailerName = "manju";
    this.router.navigate(["/storelist"]);
  }
}
