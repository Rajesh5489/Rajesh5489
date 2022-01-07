import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { AppStateService } from '../shared/appStateService';
import { RetailerCompanyProfileRequest } from '../Models/RetailerCompanyProfileRequest';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  baseUrl: string;
  constructor(private http: HttpClient, public appStateService: AppStateService) {
    this.baseUrl = this.appStateService.getBaseUrl();
  }

  createRegistration(retailerDetails: RetailerCompanyProfileRequest, successCallback: Function, errorCallback: Function) {
    return this.http
      .post(this.baseUrl + 'Company/CreateRetailerCompanyProfile',
        retailerDetails).subscribe(
          response => successCallback(response),
          error => errorCallback(error)
        );
  }
}
