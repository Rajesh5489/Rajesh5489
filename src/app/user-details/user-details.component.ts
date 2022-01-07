import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailerCompanyProfileRequest } from '../Models/RetailerCompanyProfileRequest';
import { UserDetailsService } from './user-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  banks: any = ["hdfc", "axis", "sbi"];
  userDetailsForm = new FormGroup({
    businessName: new FormControl(''),
    primaryContactName: new FormControl(''),
    primaryContactNumber: new FormControl(''),
    secondaryContactName: new FormControl(''),
    secondaryContactNumber: new FormControl(''),
    secondaryEmailAddress: new FormControl(''),
    pan: new FormControl(''),
    // bankName: new FormControl(''),
    // branch: new FormControl(''),
    // accountNumber: new FormControl(''),
    // ifscCode: new FormControl(''),
    // upiId: new FormControl(''),
  });
  constructor(
    private route: Router,
    public UserDetailsService: UserDetailsService
  ) { }

  ngOnInit() {
    //this.addStoreDetails();
  }
  completeRegistration() {
    var retailerDetails = new RetailerCompanyProfileRequest();
    retailerDetails = this.userDetailsForm.getRawValue();
    retailerDetails.primaryEmailAddress = "manjusha@gmail.com";
    retailerDetails.registeredName = "PrimeSHelf";
    retailerDetails.createdBy = "manju";
    retailerDetails.createdDate = new Date().toISOString();
    retailerDetails.modifiedBy = "manju";
    retailerDetails.modifiedDate = new Date().toISOString();
    this.UserDetailsService.createRegistration(retailerDetails,
      (res: any) => {
        if (res) {
          this.route.navigate(["/storedetails"]);
        }
      },
      (err: any) => { 
        this.route.navigate(["/storedetails"]);
      });
      this.route.navigate(["/storedetails"]);
  }
}
