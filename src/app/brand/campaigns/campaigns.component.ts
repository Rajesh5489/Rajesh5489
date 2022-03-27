import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewBrandCampaignRequest } from 'src/app/_models/NewBrandCampaignRequest';
import { NewBrandProfileRequest } from 'src/app/_models/NewBrandProfileRequest';
import { AppStateService } from 'src/app/_services/appStateService';
import { CampaignService } from 'src/app/_services/campaign.service';
import { CompanyService } from 'src/app/_services/companyService';
import { AddSpacesService } from 'src/app/_services/metadata.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styles: [
  ]
})
export class CampaignsComponent implements OnInit {

  sampleMessage!: string;
  productCategories: any;
  campaigns: any;

  registrationForm = new FormGroup({
    name: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    objective: new FormControl(),
    description: new FormControl(),
    productName: new FormControl(''),
    productCategory: new FormControl('')
  });
  
  constructor(
    private router: Router,
    private companyService: CompanyService,
    public appStateService: AppStateService,
    private addSpacesService: AddSpacesService,
    private campaignService: CampaignService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getProductCategories();
  }

  private getProductCategories() {
    this.addSpacesService.getProductCategories(
      (res: any) => {
        this.productCategories = res;
      },
      (err: any) => { })
  }

  private getCampaignsForBrand() {
    this.campaignService.getCampaigns(this.appStateService.retailerOrBrandId,
      (res: any) => {
        this.campaigns = res;
      },
      (err: any) => { })
  }

  public createCampaign()
  {
    if (this.registrationForm.valid) {
      this.sampleMessage = "";
      var campaignDetails = new NewBrandCampaignRequest();
      campaignDetails = this.registrationForm.getRawValue();
      campaignDetails.brandId = this.appStateService.retailerOrBrandId;
      campaignDetails.startDate = this.datepipe.transform(new Date(campaignDetails.startDate), 'yyyy-MM-dd')!;
      campaignDetails.endDate = this.datepipe.transform(new Date(campaignDetails.endDate), 'yyyy-MM-dd')!;
      campaignDetails.tagIds = [];
      campaignDetails.createdBy = "testing";
      campaignDetails.createdDate = new Date().toISOString();

      this.campaignService.createCampaign(campaignDetails,
        (res: any) => {
          if (res) {
            this.sampleMessage = "Campaign Creation Sucessful.";
          }
        },
        (err: any) => {
          if (err.statusCode = 218) {
            this.sampleMessage = "Error creating the campaign."
          }
        });
    }
    else
      this.sampleMessage = "All required fields need to be provided.";
  }

}
