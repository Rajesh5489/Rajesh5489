import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingLedger } from 'src/app/_models/BookingLedger';
import { BrandBookingRequest } from 'src/app/_models/BrandBookingRequest';
import { BrandSearchResultSummaryResponse } from 'src/app/_models/BrandSearchResultSummaryResponse';
import { ShelfSummary } from 'src/app/_models/ShelfSummary';
import { AppStateService } from 'src/app/_services/appStateService';
import { BookingService } from 'src/app/_services/bookingService';
import { CartService } from 'src/app/_services/cart.service';
import { CommonService } from 'src/app/_services/common.service';
import { BrandRegistrationComponent } from '../brand-registration/brand-registration.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input() bookingsList = new Array<BrandSearchResultSummaryResponse>();
  @Input() bookingDaysCount !: number;
  selectedStoreList = new Array<BrandSearchResultSummaryResponse>();
  finalBookingsList= Array<BrandBookingRequest>();

  // Dictionary of Store Details and corresponding selected shelf details (for Cart structure)
  cartDetails = new Map()

  constructor(
    private commonService:CommonService,
    private appStateService: AppStateService,
    private bookingService : BookingService,
    private cartService : CartService,
    private router: Router) {}

  ngOnInit(): void {}

  public addSelectedToCart()
  {
    this.selectedStoreList = this.bookingsList.filter((value, index) => {
      return value.isSelected;
    });

    this.commonService.sendSelectedStoresUpdate(this.selectedStoreList);
    this.commonService.sendBookingDaysCountUpdate(this.bookingDaysCount);
    this.router.navigate(["/brand-home"], {queryParams:{act:"cart"}});
  }

  
  public onCheckboxChange(store:BrandSearchResultSummaryResponse, shelf:ShelfSummary, isSelected: boolean) {
    if (isSelected) {
      let bookingRecord = new BrandBookingRequest();
      bookingRecord.storeId = Number(store.storeId);
      bookingRecord.shelfId = shelf.shelfId;
      bookingRecord.brandId = this.appStateService.retailerOrBrandId;
      bookingRecord.bookingStatus = 1;
      bookingRecord.startDate = this.appStateService.bookingStartDate;
      bookingRecord.endDate = this.appStateService.bookingEndDate;
      bookingRecord.totalAmount = (shelf.costPerSft / 30) * (shelf.areaInSft) * (this.bookingDaysCount);

      let bookingLedger = new BookingLedger();
      bookingLedger.storeId = Number(store.storeId);
      bookingLedger.storeName = store.storeName;
      bookingLedger.shelfTypeId = shelf.shelfTypeId;
      bookingLedger.categoryId = shelf.currentCategory;
      bookingLedger.customName = shelf.customName;
      bookingLedger.prohibitedCategories = shelf.prohibitedCategories;
      bookingLedger.areaInSft = shelf.areaInSft;
      bookingLedger.costPerSft = shelf.costPerSft;
      bookingLedger.minimumBookingPeriodInDays = shelf.minimumBookingPeriodInDays;
      bookingLedger.preBookingPeriodInDays = shelf.preBookingPeriodInDays;
      bookingRecord.bookingLedger = bookingLedger;
      this.finalBookingsList.push(bookingRecord);
    }
    else {
      this.finalBookingsList = this.finalBookingsList.filter(item => item.shelfId == shelf.shelfId);
    }
  }
}
