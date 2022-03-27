import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewBrandCampaignRequest } from '../_models/NewBrandCampaignRequest';
import { AppStateService } from './appStateService';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  baseUrl: string;
  constructor(private http: HttpClient, public appStateService: AppStateService) {
      this.baseUrl = this.appStateService.getBaseUrl();
  }
  
  getCampaigns(brandId: number, successCallback: Function, errorCallback: Function) {
      return this.http
          .get(this.baseUrl + 'CampaignTag/GetCampaigns/' + brandId).subscribe(
              response => successCallback(response),
              error => errorCallback(error)
          );
  }

  createCampaign(campaignDetails: NewBrandCampaignRequest, successCallback: Function, errorCallback: Function) {
    return this.http
        .post(this.baseUrl + 'CampaignTag/CreateCampaignForBrand', campaignDetails).subscribe(
            response => successCallback(response),
            error => errorCallback(error)
        );
}
  
}
