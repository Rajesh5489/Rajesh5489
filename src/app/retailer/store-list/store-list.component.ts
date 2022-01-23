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
  showAddStoreView:boolean = false;
  
  constructor(
    private router: Router,
    private bookingService: BookingService,
    private appStateService: AppStateService,
    private storeService: RetailerStoreService) { }

  ngOnInit() {
    this.storeService.getAllStores(this.appStateService.retailerOrBrandId,
      (res: any) => {
        this.bookingsList = res;
      },
      (err: any) => { });
  }

  editSpace(storeId: number, storeName:string, storeLocation:string) {
    this.setStoreDetails(storeId,storeName,storeLocation);
    this.router.navigate(["/retail-sub-home"]);
  }

  editBookings(storeId: number, storeName:string, storeLocation:string) {
    this.setStoreDetails(storeId,storeName,storeLocation);
    this.router.navigate(["/retail-sub-home"]);
  }

  editStore(storeId: number, storeName:string, storeLocation:string) {
    this.storeService.getAllStores(this.appStateService.retailerOrBrandId,
      (res: any) => {
        this.storesList = res;
        this.appStateService.storeList = this.storesList;
        this.setStoreDetails(storeId,storeName,storeLocation);
        this.router.navigate(["/retail-sub-home"]);
      },
      (err: any) => { });
  }

  public addStore(): void {
    this.showAddStoreView = true;
  }

  public checkForShowAddStoreView(addStoreViewValue:string){
    this.showAddStoreView = addStoreViewValue.toLocaleLowerCase() === 'true';
  }

  private setStoreDetails(storeId: number, storeName:string, storeLocation:string)
  {
    this.appStateService.storeId = storeId;
    this.appStateService.storeName = storeName;
    this.appStateService.storeLocation = storeLocation;
  }
}
