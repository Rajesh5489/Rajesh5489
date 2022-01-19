import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewBrandProfileRequest } from 'src/app/_models/NewBrandProfileRequest';
import { AppStateService } from 'src/app/_services/appStateService';
import { CompanyService } from 'src/app/_services/companyService';

@Component({
  selector: 'app-brand-registration',
  templateUrl: './brand-registration.component.html',
  styleUrls: ['./brand-registration.component.scss']
})
export class BrandRegistrationComponent implements OnInit {

  sampleMessage!: string;

  registrationForm = new FormGroup({
    registeredName: new FormControl(),
    businessName: new FormControl(),
    primaryContactName: new FormControl(),
    primaryContactNumber: new FormControl(),
    primaryEmailAddress: new FormControl(),
    secondaryContactName: new FormControl(''),
    secondaryContactNumber: new FormControl(''),
    secondaryEmailAddress: new FormControl(''),
    pan: new FormControl(),
    gstin: new FormControl()
  });

  constructor(
    private router: Router,
    private companyService: CompanyService,
    public appStateService: AppStateService
  ) { }

  ngOnInit() {
  }

  public completeRegistration() {

    if (this.registrationForm.valid) {
      var brandRegistrationDetails = new NewBrandProfileRequest();
      brandRegistrationDetails = this.registrationForm.getRawValue();
      brandRegistrationDetails.createdBy = brandRegistrationDetails.primaryContactName;
      brandRegistrationDetails.createdDate = new Date().toISOString();

      this.companyService.createBrandProfile(brandRegistrationDetails,
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
