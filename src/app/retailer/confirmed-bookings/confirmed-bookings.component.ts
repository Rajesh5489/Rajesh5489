import { Component, OnInit } from '@angular/core';
import { RetailerBookingApprovalStatusRequest } from 'src/app/_models/RetailerBookingApprovalStatusRequest';
import { RetailerBookingDetails } from 'src/app/_models/RetailerBookingDetails';
import { AppStateService } from 'src/app/_services/appStateService';
import { BookingService } from 'src/app/_services/bookingService';

export enum ShelfBookingStatusType {
  Requested,
  Booked,
  Rejected,
  Completed
}

@Component({
  selector: 'app-confirmed-bookings',
  templateUrl: './confirmed-bookings.component.html',
  styleUrls: ['./confirmed-bookings.component.scss']
})
export class ConfirmedBookingsComponent implements OnInit {

  confirmedBookings!: RetailerBookingDetails[];
  public statusType = ShelfBookingStatusType;

  constructor(private bookingService: BookingService,
    private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.bookingService.getRetailerBookingDetailsById(this.appStateService.retailerOrBrandId,1,
      (res: Array<RetailerBookingDetails>) => {
        this.confirmedBookings = res.filter((x: RetailerBookingDetails) => x.shelfBookingStatusType == this.statusType.Booked.toString());
      },
      (err: any) => { })
  }
}
