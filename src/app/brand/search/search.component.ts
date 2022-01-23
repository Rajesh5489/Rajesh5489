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

  searchDetailsForm = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    shelfType: new FormControl(''),
    productCategory: new FormControl('')
  });

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

  public getSearchResults() {
    this.shelfService.searchShelfBasicFilter(
      new Date(this.searchDetailsForm.value.fromDate).toISOString().split('T')[0],
      new Date(this.searchDetailsForm.value.toDate).toISOString().split('T')[0],
      this.searchDetailsForm.value.shelfType,
      this.searchDetailsForm.value.productCategory, 'na',
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
