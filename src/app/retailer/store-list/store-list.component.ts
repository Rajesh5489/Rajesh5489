import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RetailerBookingSummary } from '../../_models/RetailerBookingSummary';
import { StoreSummary } from '../../_models/StoreSummary';
import { AppStateService } from '../../_services/appStateService';
import { BookingService } from '../../_services/bookingService';
import { RetailerStoreService } from '../../_services/retailerStoreService';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  storesList!: Array<StoreSummary>;
  bookingsList!: Array<RetailerBookingSummary>;
  constructor(
    private router: Router,
    private bookingService: BookingService,
    private appStateService: AppStateService,
    private storeService: RetailerStoreService) { }

  ngOnInit() {
    this.bookingService.getAllBookingsForRetailer(this.appStateService.retailerOrBrandId,
      (res: any) => {
        this.bookingsList = res;
      },
      (err: any) => { });
  }
  editSpace(storeId: number) {
    this.router.navigate(["/shelves"], { queryParams: { storeId: storeId } });
  }
  editBookings(storeId: number) {
    this.router.navigate(["/bookings"], { queryParams: { storeId: storeId } });
  }
  editStore(storeId: number) {
    this.storeService.getAllStores(this.appStateService.retailerOrBrandId,
      (res: any) => {
        this.storesList = res;
        this.appStateService.storeList = this.storesList;
        this.router.navigate(["/storedetails"], { queryParams: { storeId: storeId } });
      },
      (err: any) => { });
  }
  addStore() {
    this.router.navigate(["/storedetails"]);
  }
}
