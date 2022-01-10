import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RetailerBookingSummary } from '../Models/RetailerBookingSummary';
import { StoreSummary } from '../Models/StoreSummary';
import { AppStateService } from '../shared/appStateService';
import { BookingService } from '../shared/bookingService';
import { RetailerStoreService } from '../shared/retailerStoreService';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  storesList!: Array<RetailerBookingSummary>;
  constructor(
    private router: Router,
    private bookingService: BookingService,
    private appStateService: AppStateService) { }

  ngOnInit() {
    this.bookingService.getAllBookingsForRetailer(this.appStateService.retailerId,
      (res: any) => {
        this.storesList = res;
      },
      (err: any) => { });
  }
  editSpace(storeId: number) {
    this.router.navigate(["/addSpaces"], { queryParams: { storeId: storeId } });
  }
  editBookings(storeId: number) {
    this.router.navigate(["/bookings"], { queryParams: { storeId: storeId } });
  }
  editStore(storeId: number) {
    this.router.navigate(["/storedetails"], { queryParams: { storeId: storeId } });
  }
  addStore() {
    this.router.navigate(["/storedetails"]);
  }
}
