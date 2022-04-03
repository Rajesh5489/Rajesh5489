import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppStateService } from 'src/app/_services/appStateService';
import { BookingService } from 'src/app/_services/bookingService';
import { RetailerStoreService } from 'src/app/_services/retailerStoreService';
import { ShelfService } from 'src/app/_services/shelfService';
import { StoreDetailsViewComponent } from '../store-details-view/store-details-view.component';
import {StoreSummary} from 'src/app/_models/StoreSummary';
import { BrandBookingRequest } from 'src/app/_models/BrandBookingRequest';
import { ShelfSummary } from 'src/app/_models/ShelfSummary';
import { ShelfDetailsViewComponent } from '../shelf-details-view/shelf-details-view.component';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss']
})
export class AllBookingsComponent implements OnInit {

  bookingDetails = new Array<BrandBookingRequest>();
  shelfDetails = new ShelfSummary();
  storeDetails = new StoreSummary();

  constructor(
    private bookingService: BookingService,
    private retailerStoreService: RetailerStoreService,
    private shelfService: ShelfService,
    private appStateService: AppStateService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.bookingService.getAllBookingsForBrand(
      this.appStateService.retailerOrBrandId,
      (res: any) => {
        if (res) {
          this.bookingDetails = res;
        }
      },
      (err: any) => {
        let errorValue = err;
      });
  }

  public onViewStoreDetailsClick(storeId: number) {
    this.retailerStoreService.getStoreDetailsByStoreId(storeId,
      (res: any) => {
        if (res) {
          this.storeDetails = res;
          const activeModal = this.modalService.open(StoreDetailsViewComponent, { size: "xl", backdrop: "static" });
          activeModal.componentInstance.storeDetails = this.storeDetails
        }
      },
      (err: any) => {
        let errorValue = err;
      });
  }

  public onViewShelfDetailsClick(shelfId: number) {
    this.shelfService.getShelvesDetailsByShelfId(shelfId,
      (res: any) => {
        if (res) {
          this.shelfDetails = res;
          const activeModal = this.modalService.open(ShelfDetailsViewComponent, { size: "xl", backdrop: "static" });
          activeModal.componentInstance.shelfDetails = this.shelfDetails
        }
      },
      (err: any) => {
        let errorValue = err;
      });
  }

}
