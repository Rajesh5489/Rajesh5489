import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewShelfRequest } from "../_models/NewShelfRequest";
import { ShelfRequest } from "../_models/ShelfRequest";
import { AppStateService } from "./appStateService";

@Injectable({
    providedIn: "root"
})
export class ShelfService {
    baseUrl: string;
    constructor(private http: HttpClient, public appStateService: AppStateService) {
        this.baseUrl = this.appStateService.getBaseUrl();
    }

    searchShelfBasicFilter(startDate: string, endDate: string, shelfTypeId: number, categoryId: number, customCategoryName: string, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Shelf/SearchShelfBasicFilter/' + startDate + '/' + endDate + '/' + shelfTypeId + '/' + categoryId + '/' + customCategoryName).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    getShelfDetailsForBrand(brandId: number, shelfId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Shelf/GetShelfDetailsForBrand/' + brandId + '/' + shelfId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }
    createShelf(shelfDetails: NewShelfRequest, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Shelf/CreateShelf',
                shelfDetails).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
    updateShelf(shelfDetails: ShelfRequest, retailerId: number, storeId: number, shelfId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'Shelf/UpdateShelf/' + retailerId + '/' + storeId + '/' + shelfId,
                shelfDetails).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
    blockShelf(retailerId: number, storeId: number, shelfId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'Shelf/BlockShelf/' + retailerId + '/' + storeId + '/' + shelfId
                , null).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
    deleteShelf(retailerId: number, storeId: number, shelfId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .delete(this.baseUrl + 'Shelf/DeleteShelf/' + retailerId + '/' + storeId + '/' + shelfId
            ).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }
    
    getShelvesDetailsForRetailerByStore(retailerId: number, storeId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Shelf/GetShelvesDetailsForRetailerByStore/' + retailerId + '/' + storeId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }
}