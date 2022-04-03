import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NewRetailerProfileRequest } from '../../_models/NewRetailerProfileRequest';
import { AppStateService } from '../../_services/appStateService';
import { CompanyService } from '../../_services/companyService';

@Component({
  selector: 'app-retailer-registration',
  templateUrl: './retailer-registration.component.html',
  styleUrls: ['./retailer-registration.component.scss']
})

export class RetailerRegistrationComponent {
  sampleMessage!: string;
  banks: any = ["hdfc", "axis", "sbi"];
  retailerRegistrationForm = new FormGroup({
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
  }

  public completeRegistration() {
    if (this.retailerRegistrationForm.valid) {
      var retailerRegistrationDetails = new NewRetailerProfileRequest();
      retailerRegistrationDetails = this.retailerRegistrationForm.getRawValue();
      retailerRegistrationDetails.createdBy = retailerRegistrationDetails.primaryContactName;
      retailerRegistrationDetails.createdDate = new Date().toISOString();
      this.companyService.createRetailerProfile(retailerRegistrationDetails,
        (res: any) => {
          if (res) {
            this.sampleMessage = "Registration Sucessful. Please login using primary email or contact number to proceed further.";
          }
        },
        (err: any) => {
          if(err.statusCode = 218)
          {
            this.sampleMessage = "Primary contact number and email are already present."
          }
        });
    }
    else
      this.sampleMessage = "All required fields need to be provided.";
  }
}
