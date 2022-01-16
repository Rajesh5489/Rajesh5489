import { Component, OnInit } from '@angular/core';
import { RetailerBookingApprovalStatusRequest } from '../Models/RetailerBookingApprovalStatusRequest';
import { RetailerBookingDetails } from '../Models/RetailerBookingDetails';
import { AppStateService } from '../shared/appStateService';
import { BookingService } from '../shared/bookingService';

export enum ShelfBookingStatusType {
  Requested,
  Booked,
  Rejected,
  Completed
}
@Component({
  selector: 'app-retailer-requested',
  templateUrl: './retailer-requested.component.html',
  styleUrls: ['./retailer-requested.component.scss']
})
export class RetailerRequestedComponent implements OnInit {
  allBookings!: RetailerBookingDetails[];
  requestedBookings!: RetailerBookingDetails[];
  confirmedBookings!: RetailerBookingDetails[];
  rejectedBookings!: RetailerBookingDetails[];
  bookingDetails!: RetailerBookingDetails[];
  bookingType!: ShelfBookingStatusType;
  public statusType = ShelfBookingStatusType;
  constructor(private bookingService: BookingService,
    private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.bookingService.getRetailerBookingDetailsById(this.appStateService.retailerId,
      1,
      (res: Array<RetailerBookingDetails>) => {
        this.allBookings = res;
        this.requestedBookings = res.filter((x: RetailerBookingDetails) => x.shelfBookingStatusType == this.statusType.Requested.toString());
        this.confirmedBookings = res.filter((x: RetailerBookingDetails) => x.shelfBookingStatusType == this.statusType.Booked.toString());
        this.rejectedBookings = res.filter((x: RetailerBookingDetails) => x.shelfBookingStatusType == this.statusType.Rejected.toString());
        if (this.requestedBookings.length > 0) {
          this.bookingDetails = this.requestedBookings;
          this.bookingType = this.statusType.Requested;
        } else {
          this.bookingDetails = this.confirmedBookings;
          this.bookingType = this.statusType.Booked;
        }
      },
      (err: any) => { })
    this.bookingType = this.statusType.Requested;
  }
  openConfirmedBooking() {
    this.bookingDetails = this.confirmedBookings;
    this.bookingType = this.statusType.Booked;
  }

  approveBookings(status: any) {
    let approvalBookings!: RetailerBookingApprovalStatusRequest[];
    this.requestedBookings.filter((x: any) => x.selected).forEach((x: any) =>
      approvalBookings.push(this.buildBookingApprovalRequest(x, status))
    );
    this.bookingService.updateRetailerApprovalBookingsStatus(
      approvalBookings,
      (res: any) => {
        this.requestedBookings = this.requestedBookings.filter((x: any) => !x.selected);
        this.confirmedBookings = this.confirmedBookings.concat(this.requestedBookings.filter((x: any) => x.selected));
       },
      (err: any) => { });
  }

  buildBookingApprovalRequest(booking: RetailerBookingDetails, status: any): RetailerBookingApprovalStatusRequest {
    let res = new RetailerBookingApprovalStatusRequest;
    res.retailerId = this.appStateService.retailerId;
    res.bookingId = booking.bookingId;
    res.approvalStatus = status;
    res.modifiedBy = this.appStateService.retailerName;
    res.modifiedDate = new Date().toISOString();
    return res;
  }
}
