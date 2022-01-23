import { Component, OnInit } from '@angular/core';
import { RetailerBookingApprovalStatusRequest } from '../../_models/RetailerBookingApprovalStatusRequest';
import { RetailerBookingDetails } from '../../_models/RetailerBookingDetails';
import { AppStateService } from '../../_services/appStateService';
import { BookingService } from '../../_services/bookingService';

export enum ShelfBookingStatusType {
  Requested,
  Booked,
  Rejected,
  Completed
}
@Component({
  selector: 'app-retailer-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  
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
    this.bookingService.getRetailerBookingDetailsById(this.appStateService.retailerOrBrandId,
      1,
      (res: Array<RetailerBookingDetails>) => {
        this.allBookings = res;
        this.requestedBookings = res.filter((x: RetailerBookingDetails) => x.shelfBookingStatusType == this.statusType.Requested.toString());
        this.confirmedBookings = res.filter((x: RetailerBookingDetails) => x.shelfBookingStatusType == this.statusType.Booked.toString());
        this.rejectedBookings = res.filter((x: RetailerBookingDetails) => x.shelfBookingStatusType == this.statusType.Rejected.toString());
        this.requestedBookings.forEach(x => x.selected = false);
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

  // openConfirmedBooking() {
  //   this.bookingDetails = this.confirmedBookings;
  //   this.bookingType = this.statusType.Booked;
  // }

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
    res.retailerId = this.appStateService.retailerOrBrandId;
    res.bookingId = booking.bookingId;
    res.approvalStatus = status;
    res.modifiedBy = this.appStateService.userName;
    res.modifiedDate = new Date().toISOString();
    return res;
  }
}
