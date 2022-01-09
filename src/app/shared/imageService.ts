import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RetailerStoreDetailsImageRequest } from "../Models/RetailerStoreDetailsImageRequest";
import { AppStateService } from "./appStateService";

@Injectable({
    providedIn: "root"
})
export class ImageService {
    baseUrl: string;
    constructor(private http: HttpClient, public appStateService: AppStateService) {
        this.baseUrl = this.appStateService.getBaseUrl();
    }
    getImage(retailerId: number, storeId: number, shelfId: number, storeImageId: number, sequenceId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Image/GetImage/', retailerId + '/' + storeId + '/' + shelfId + '/' + storeImageId + '/' + sequenceId)
            .subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }
    uploadNewmage(retailerImage: RetailerStoreDetailsImageRequest, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Image/UploadNewmage', retailerImage).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    updateExistingImage(retailerImage: RetailerStoreDetailsImageRequest, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'Image/UpdateExistingImage', retailerImage).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }
    deleteImage(retailerId: number, storeId: number, shelfId: number, storeImageId: number, sequenceId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .delete(this.baseUrl + 'Image/DeleteImage/' + retailerId + '/' + storeId + '/' + shelfId + '/' + storeImageId + '/' + sequenceId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }
}
