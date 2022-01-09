import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewShelfRequest } from "../Models/NewShelfRequest";
import { ShelfRequest } from "../Models/ShelfRequest";
import { AppStateService } from "./appStateService";

@Injectable({
    providedIn: "root"
})
export class ShelfService {
    baseUrl: string;
    constructor(private http: HttpClient, public appStateService: AppStateService) {
        this.baseUrl = this.appStateService.getBaseUrl();
    }
    createShelf(shelfDetails: NewShelfRequest, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'RetailerStore/CreateShelf',
                shelfDetails).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
    updateShelf(shelfDetails: ShelfRequest, retailerId: number, storeId: number, shelfId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'RetailerStore/UpdateShelf/' + retailerId + '/' + storeId + '/' + shelfId,
                shelfDetails).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
    blockShelf(retailerId: number, storeId: number, shelfId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'RetailerStore/BlockShelf/' + retailerId + '/' + storeId + '/' + shelfId
                , null).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
    deleteShelf(retailerId: number, storeId: number, shelfId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .delete(this.baseUrl + 'RetailerStore/DeleteShelf/' + retailerId + '/' + storeId + '/' + shelfId
            ).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }
}