import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BrandBookingRequest } from "../_models/BrandBookingRequest";
import { RetailerBookingApprovalStatusRequest } from "../_models/RetailerBookingApprovalStatusRequest";
import { AppStateService } from "./appStateService";

@Injectable({
    providedIn: "root"
})
export class BookingService {
    baseUrl: string;
    constructor(private http: HttpClient, public appStateService: AppStateService) {
        this.baseUrl = this.appStateService.getBaseUrl();
    }
    getAllBookingsForBrand(brandId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Booking/GetAllBookingsForBrand/' + brandId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    getBrandBookingDetailsById(brandId: number, bookingId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Booking/GetBrandBookingDetailsById/' + brandId + '/' + bookingId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    getBrandBookingDetailsByMultipleIds(brandId: number, bookingIds: Array<number>, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Booking/GetBrandBookingDetailsByMultipleIds/' + brandId + '/' + bookingIds).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    createBookingsForBrand(brandBookingDetails: Array<BrandBookingRequest>, bookingIds: Array<number>, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Booking/CreateBookingsForBrand/', brandBookingDetails).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    updateBookingForBrand(brandId: number, retailerId: number, bookingId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .put(this.baseUrl + 'Booking/UpdateBookingForBrand/' + brandId + '/' + retailerId + '/' + bookingId,
                null).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }

    deleteBookingForBrand(brandId: number, retailerId: number, bookingId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .delete(this.baseUrl + 'Booking/DeleteBookingForBrand/' + brandId + '/' + retailerId + '/' + bookingId
            ).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    getAllBookingsForRetailer(retailerId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Booking/GetAllBookingsForRetailer/' + retailerId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    getRetailerBookingDetailsById(retailerId: number, bookingId: number, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Booking/GetRetailerBookingDetailsById/' + retailerId + '/' + bookingId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    getRetailerBookingDetailsByMultipleIds(retailerId: number, bookingIds: Array<number>, successCallback: Function, errorCallback: Function) {
        return this.http
            .get(this.baseUrl + 'Booking/GetRetailerBookingDetailsByMultipleIds/' + retailerId + '/' + bookingIds).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    updateRetailerApprovalBookingsStatus(bookingDetails: Array<RetailerBookingApprovalStatusRequest>, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Booking/UpdateRetailerApprovalBookingsStatus',
                bookingDetails).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
}
