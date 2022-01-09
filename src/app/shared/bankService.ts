import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewRetailerBankRequest } from "../Models/NewRetailerBankRequest";
import { RetailerBankRequest } from "../Models/RetailerBankRequest";
import { RetailerBookingApprovalStatusRequest } from "../Models/RetailerBookingApprovalStatusRequest";
import { AppStateService } from "./appStateService";

@Injectable({
    providedIn: "root"
})
export class BankService {
    baseUrl: string;
    constructor(private http: HttpClient, public appStateService: AppStateService) {
        this.baseUrl = this.appStateService.getBaseUrl();
    }

    getBankDetailsForRetailer(retailerId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Bank/GetBankDetailsForRetailer/' + retailerId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    createBankForRetailer(retailerBankDetails: NewRetailerBankRequest, bookingId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Bank/CreateBankForRetailer', retailerBankDetails).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    updateBankForRetailer(retailerBankDetails: RetailerBankRequest, retailerId: number, bankId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'Bank/UpdateBankForRetailer/' + retailerId + '/' + bankId,
                retailerBankDetails).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
}
