import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppStateService } from 'src/app/_services/appStateService';
import { AddSpacesService } from 'src/app/_services/metadata.service';
import { BrandSearchResultSummaryResponse } from 'src/app/_models/BrandSearchResultSummaryResponse';
import { ShelfService } from 'src/app/_services/shelfService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  showMaps: boolean = true;
  shelfTypes: any;
  productCategories: any;
  bookingsList: any;
  map!: L.Map;
  expectedCategory!: any;
  fullName!: string;

  searchResults!: Array<BrandSearchResultSummaryResponse>;

  constructor(
    private addSpacesService: AddSpacesService,
    private appStateService: AppStateService,
    private shelfService: ShelfService
  ) { }

  ngOnInit(): void {
    this.getProductCategories();
    this.getShelfTypes();
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

  public onChangeGetSearchResults() {

    if (this.fromDate && this.toDate && this.shelfType && this.productCategory) {
      // this.appStateService.bookingStartDate = new Date(this.fromDate).toISOString().split('T')[0];
      // this.appStateService.bookingEndDate = new Date(this.toDate).toISOString().split('T')[0];
      this.appStateService.bookingStartDate = new Date(this.fromDate).toLocaleDateString();
      this.appStateService.bookingEndDate = new Date(this.toDate).toLocaleDateString();

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
