import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { Subscription } from 'rxjs';
import { BrandSearchResultSummaryResponse } from 'src/app/_models/BrandSearchResultSummaryResponse';
import { CommonService } from 'src/app/_services/common.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrandBookingRequest } from 'src/app/_models/BrandBookingRequest';
import { AppStateService } from 'src/app/_services/appStateService';
import { ShelfSummary } from 'src/app/_models/ShelfSummary';
import { BookingLedger } from 'src/app/_models/BookingLedger';
import { BookingService } from 'src/app/_services/bookingService';

@Component({
  selector: 'app-store-cart',
  templateUrl: './store-cart.component.html',
  styleUrls: ['./store-cart.component.scss']
})

export class StoreCartComponent implements OnInit {

  private subscriptionName: Subscription;
  bookingStartDate!: string;
  bookingEndDate!: string;
  storesList = Array<BrandSearchResultSummaryResponse>();
  finalBookingsList= Array<BrandBookingRequest>();
  bookingDaysCount!: number;
  showFinalCartResults:boolean = false;
  totalCostOfBooking:number = 0.0;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private appStateService: AppStateService,
    private bookingService : BookingService
  ) {
    // subscribe to sender component messages
    this.subscriptionName = this.commonService.getSelectedStoresUpdate().subscribe
      (message => { //message contains the data sent from service
        this.storesList = message;
      });

    this.subscriptionName = this.commonService.getBookingDaysCountUpdate().subscribe
      (message => { //message contains the data sent from service
        this.bookingDaysCount = message;
      });
  }

  ngOnInit(): void { }

  onCheckboxChange(store:BrandSearchResultSummaryResponse, shelf:ShelfSummary, isSelected: boolean) {
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

  public onProceedToPaymentClick(){
      // Get all the records
      this.showFinalCartResults = true;
      this.bookingStartDate = this.appStateService.bookingStartDate;
      this.bookingEndDate = this.appStateService.bookingEndDate;

      let total = 0.0;
      this.finalBookingsList.forEach(function(value){
        total += value.totalAmount
      });

      this.totalCostOfBooking = total;
  }

  public onCompleteBooking(){
    this.bookingService.createBookingsForBrand(
      this.appStateService.retailerOrBrandId, this.finalBookingsList,
      (res: any) => {
        if (res) {
          let temp = res;
        }
      },
      (err: any) => {
        let errorValue = err;
      });
  }
}
