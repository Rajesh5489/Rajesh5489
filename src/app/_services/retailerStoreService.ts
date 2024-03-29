import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewStoreRequest } from "../_models/NewStoreRequest";
import { StoreRequest } from "../_models/StoreRequest";
import { AppStateService } from "./appStateService";

@Injectable({
    providedIn: "root"
})
export class RetailerStoreService {
    baseUrl: string;
    constructor(private http: HttpClient, public appStateService: AppStateService) {
        this.baseUrl = this.appStateService.getBaseUrl();
    }

    getAllStores(retailerId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'RetailerStore/GetAllStores/' + retailerId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }
    createStore(storeDetails: NewStoreRequest, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'RetailerStore/CreateStore',
                storeDetails).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
    updateStore(storeDetails: StoreRequest, retailerId: number, storeId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'RetailerStore/UpdateStore/' + retailerId + '/' + storeId,
                storeDetails).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
    deleteStore(retailerId: number, storeId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .delete(this.baseUrl + 'RetailerStore/DeleteStore/' + retailerId + '/' + storeId,
        ).subscribe(
            response => successCallback(response),
            error => errorCallback(error)
        );
    }

    getStoreDetailsByStoreId(storeId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'RetailerStore/GetStoreDetails/' + storeId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    upload(formData: FormData, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'RetailerStore/upload', formData).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
}
