import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RetailerBookingApprovalStatusRequest } from "../Models/RetailerBookingApprovalStatusRequest";
import { AppStateService } from "./appStateService";

@Injectable({
    providedIn: "root"
})
export class BookingService {
    baseUrl: string;
    constructor(private http: HttpClient, public appStateService: AppStateService) {
        this.baseUrl = this.appStateService.getBaseUrl();
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
            .get(this.baseUrl + 'Booking/GetRetailerBookingDetailsById/' + retailerId +'/'+ bookingId).subscribe(
                response => successCallback(response),
                error => errorCallback(error)
            );
    }

    updateRetailerApprovalBookingsStatus(bookingDetails: RetailerBookingApprovalStatusRequest, successCallback: Function, errorCallback: Function) {
        return this.http
            .post(this.baseUrl + 'Booking/UpdateRetailerApprovalBookingsStatus',
                bookingDetails).subscribe(
                    response => successCallback(response),
                    error => errorCallback(error)
                );
    }
}
