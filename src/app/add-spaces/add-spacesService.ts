import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { AppStateService } from '../shared/appStateService';
import { RetailerCompanyProfileRequest } from '../Models/RetailerCompanyProfileRequest';

@Injectable({
  providedIn: 'root'
})
export class AddSpacesService {
  baseUrl: string;
  constructor(private http: HttpClient, public appStateService: AppStateService) {
    this.baseUrl = this.appStateService.getBaseUrl();
  }

  getShelfTypes(successCallback: Function, errorCallback: Function) {
    return this.http
      .get(this.baseUrl + 'Metadata/ListShelfTypes').subscribe(
          response => successCallback(response),
          error => errorCallback(error)
        );
  }

  getProductCategories(successCallback: Function, errorCallback: Function) {
    return this.http
      .get(this.baseUrl + 'Metadata/ListProductCategories').subscribe(
          response => successCallback(response),
          error => errorCallback(error)
        );
  }
}
