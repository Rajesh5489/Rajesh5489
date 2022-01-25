import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BrandSearchResultSummaryResponse } from 'src/app/_models/BrandSearchResultSummaryResponse';
import { CommonService } from 'src/app/_services/common.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrandBookingRequest } from 'src/app/_models/BrandBookingRequest';
import { AppStateService } from 'src/app/_services/appStateService';

@Component({
  selector: 'app-store-cart',
  templateUrl: './store-cart.component.html',
  styleUrls: ['./store-cart.component.scss']
})

export class StoreCartComponent implements OnInit {

  private subscriptionName: Subscription;
  bookingFromDate!: string;
  bookingToDate!: string;
  storesList = Array<BrandSearchResultSummaryResponse>();
  finalBookingsList = Array<BrandBookingRequest>();

  constructor(
    private router: Router,
    private commonService: CommonService,
    private appStateService: AppStateService
  ) {
    // subscribe to sender component messages
    this.subscriptionName = this.commonService.getSelectedStoresUpdate().subscribe
      (message => { //message contains the data sent from service
        this.storesList = message;
      });
  }

  ngOnInit(): void {}

  onCheckboxChange(isSelected: boolean, shelfId: number, storeId: string) {
    if (isSelected) {
      let bookingRecord = new BrandBookingRequest();
      bookingRecord.storeId = Number(storeId);
      bookingRecord.shelfId = shelfId;
      bookingRecord.brandId = this.appStateService.retailerOrBrandId;
      bookingRecord.bookingStatusId = 1;
      bookingRecord.startDate = this.appStateService.bookingStartDate;
      bookingRecord.endDate = this.appStateService.bookingEndDate;
      this.finalBookingsList.push(bookingRecord);
    }
    else {
      this.finalBookingsList = this.finalBookingsList.filter(item => item.shelfId == shelfId);
    }
  }
}
