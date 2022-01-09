import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BrandProfileRequest } from "../Models/BrandProfilerequest";
import { NewBrandProfileRequest } from "../Models/NewBrandProfileRequest";
import { NewRetailerProfileRequest } from "../Models/NewRetailerProfileRequest";
import { RetailerProfileRequest } from "../Models/RetailerProfileRequest";
import { AppStateService } from "./appStateService";

@Injectable({
    providedIn: "root"
})
export class CompanyService {
    baseUrl: string;
    constructor(private http: HttpClient, public appStateService: AppStateService) {
        this.baseUrl = this.appStateService.getBaseUrl();
    }

    getRetailerProfile(retailerId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Company/GetRetailerProfile/' + retailerId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    createRetailerProfile(retailerProfile: NewRetailerProfileRequest, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Company/CreateRetailerProfile', retailerProfile).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    updateRetailerProfile(retailerProfile: RetailerProfileRequest, retailerId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'Company/UpdateRetailerProfile/' + retailerId, retailerProfile).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    deleteRetailerProfile(retailerId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .delete(this.baseUrl + 'Company/DeleteRetailerProfile/' +
                retailerId).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }

    getBrandProfile(brandId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Company/GetBrandProfile/' + brandId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    createBrandProfile(brandProfile: NewBrandProfileRequest, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Company/CreateBrandProfile', brandProfile).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    updateBrandProfile(brandProfile: BrandProfileRequest, brandId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'Company/UpdateBrandProfile/' + brandId, brandProfile).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    deleteBrandProfile(brandId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .delete(this.baseUrl + 'Company/DeleteBrandProfile/' +
                brandId).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
}
