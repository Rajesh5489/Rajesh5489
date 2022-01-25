import { Component, Input, OnInit } from '@angular/core';
import { BrandSearchResultSummaryResponse } from 'src/app/_models/BrandSearchResultSummaryResponse';
import { CommonService } from 'src/app/_services/common.service';
import { BrandRegistrationComponent } from '../brand-registration/brand-registration.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input() bookingsList = new Array<BrandSearchResultSummaryResponse>();
  selectedStoreList = new Array<BrandSearchResultSummaryResponse>();

  constructor(private commonService:CommonService) {}

  ngOnInit(): void {}

  public addSelectedToCart()
  {
    this.selectedStoreList = this.bookingsList.filter((value, index) => {
      return value.isSelected;
    });

    this.commonService.sendSelectedStoresUpdate(this.selectedStoreList);
  }
}
