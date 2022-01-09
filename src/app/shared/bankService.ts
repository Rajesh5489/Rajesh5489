import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BrandBankRequest } from "../Models/BrandBankRequest";
import { NewBrandBankRequest } from "../Models/NewBrandBankRequest";
import { NewRetailerBankRequest } from "../Models/NewRetailerBankRequest";
import { RetailerBankRequest } from "../Models/RetailerBankRequest";
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

    createBankForRetailer(retailerBankDetails: NewRetailerBankRequest, successCallback: Function, errorCallback: Function) {
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

    deleteBankForRetailer(retailerId: number, bankId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .delete(this.baseUrl + 'Bank/DeleteBankForRetailer/' + retailerId + '/' + bankId
            ).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    getBankDetailsForBrand(brandId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Bank/GetBankDetailsForBrand/' + brandId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    createBankForBrand(brandBankDetails: NewBrandBankRequest, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Bank/CreateBankForBrand', brandBankDetails).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    updateBankForBrand(brandBankDetails: BrandBankRequest, brandId: number, bankId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'Bank/UpdateBankForBrand/' + brandId + '/' + bankId,
                brandBankDetails).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }

    deleteBankForBrand(brandId: number, bankId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .delete(this.baseUrl + 'Bank/DeleteBankForBrand/' + brandId + '/' + bankId
            ).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }
}
