import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewRetailerCompanyProfileRequest } from "../Models/NewRetailerCompanyProfileRequest";
import { RetailerCompanyProfileRequest } from "../Models/RetailerCompanyProfileRequest";
import { AppStateService } from "./appStateService";

@Injectable({
    providedIn: "root"
})
export class CompanyService {
    baseUrl: string;
    constructor(private http: HttpClient, public appStateService: AppStateService) {
        this.baseUrl = this.appStateService.getBaseUrl();
    }

    createRetailerCompanyProfile(retailerCompanyProfile: NewRetailerCompanyProfileRequest, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Company/CreateRetailerCompanyProfile', retailerCompanyProfile).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    updateRetailerCompanyProfile(retailerCompanyProfile: RetailerCompanyProfileRequest, retailerId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'Company/UpdateRetailerCompanyProfile/' + retailerId, retailerCompanyProfile).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    deleteRetailerApprovalBookingsStatus(retailerId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .delete(this.baseUrl + 'Company/DeleteRetailerCompanyProfile/' +
                retailerId).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
}
