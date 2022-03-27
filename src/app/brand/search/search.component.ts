import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppStateService } from 'src/app/_services/appStateService';
import { AddSpacesService } from 'src/app/_services/metadata.service';
import { BrandSearchResultSummaryResponse } from 'src/app/_models/BrandSearchResultSummaryResponse';
import { ShelfService } from 'src/app/_services/shelfService';
import { DatePipe } from '@angular/common'
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  showMaps: boolean = true;
  shelfTypes: any;
  productCategories: any;
  campaigns: any;
  bookingsList: any;
  map!: L.Map;
  expectedCategory!: any;
  selectedCampaignId!:any;
  fullName!: string;

  searchResults!: Array<BrandSearchResultSummaryResponse>;
  bookingDaysCount!: number;
  isCampaignSearch!: boolean;

  constructor(
    private addSpacesService: AddSpacesService,
    private appStateService: AppStateService,
    private campaignService: CampaignService,
    private shelfService: ShelfService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getProductCategories();
    this.getShelfTypes();
    this.getCampaignsForBrand();
  }

  fromDate!: string;
  toDate!: string;
  shelfType!: number;
  productCategory!: number;

  private getShelfTypes() {
    this.addSpacesService.getShelfTypes(
      (res: any) => {
        this.shelfTypes = res;
      },
      (err: any) => { })
  }

  private getProductCategories() {
    this.addSpacesService.getProductCategories(
      (res: any) => {
        this.productCategories = res;
      },
      (err: any) => { })
  }

  private getCampaignsForBrand() {
    this.campaignService.getCampaigns(this.appStateService.retailerOrBrandId,
      (res: any) => {
        this.campaigns = res;
      },
      (err: any) => { })
  }

  public getSearchResults() {

  }

  public onChangeGetSearchResults() {

    if (this.fromDate && this.toDate && this.shelfType && this.productCategory) {
      var fromDate = new Date(this.fromDate);
      var toDate = new Date(this.toDate)
      this.appStateService.bookingStartDate = this.datepipe.transform(new Date(this.fromDate), 'yyyy-MM-dd')!; //fromDate.toLocaleDateString();
      this.appStateService.bookingEndDate = this.datepipe.transform(new Date(this.toDate), 'yyyy-MM-dd')!;//toDate.toLocaleDateString();
      this.bookingDaysCount = parseInt(((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)).toString());
      this.appStateService.bookingDaysCount = this.bookingDaysCount;

      this.shelfService.searchShelfBasicFilter(
        this.appStateService.bookingStartDate,
        this.appStateService.bookingEndDate,
        this.shelfType,
        this.productCategory, 'na',
        (res: any) => {
          if (res) {
            this.searchResults = res;
          }
        },
        (err: any) => {
          let errorValue = err;
        });
    }
  }
}
