import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewStoreRequest } from '../Models/NewStoreRequest';
import { StoreRequest } from '../Models/StoreRequest';
import { AppStateService } from '../shared/appStateService';
import { RetailerStoreService } from '../shared/retailerStoreService';
@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent {
  storeId: any;
  constructor(private router: Router,
    private storeService: RetailerStoreService,
    private route: ActivatedRoute,
    private appStateService: AppStateService) { }
  states: any = ["telangana", "AndhraPradesh", "Orissa"];
  areaInSfts: any = ["1000sft", "2000sft", "300sft"];
  projectedFootballs: any = ["Projected Football per Month", "Projected Football per Month2", "Projected Football per Month3"]
  estimatedFootballs: any = ["Estimated Football per Month", "Estimated Football per Month", "Estimated Football per Month"]
  url = "./assets/plus.png"
  storeForm = new FormGroup({
    retailerId: new FormControl(''),
    storeName: new FormControl(''),
    fullAddress: new FormControl(''),
    location: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    pinCode: new FormControl(''),
    geoTag: new FormControl(''),
    areaInSft: new FormControl(''),
    gstin: new FormControl(''),
    projectedFootfallPerMonth: new FormControl(''),
    estimatedSalesPerMonth: new FormControl(''),
  });
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.storeId = params.storeId;
      if (this.storeId) {
        this.initialiseForm();
      }
    });
  }
  initialiseForm() {
    var storeInfo = this.appStateService.storeList.find(x => x.storeId == this.storeId);
    this.storeForm.patchValue({
      storeName: storeInfo?.storeName,
      fullAddress: storeInfo?.fullAddress,
      location: storeInfo?.location,
      geoTag: storeInfo?.storeName,
      areaInSft: storeInfo?.areaInSft,
      projectedFootfallPerMonth: storeInfo?.projectedFootfallPerMonth,
      estimatedSalesPerMonth: storeInfo?.estimatedSalesPerMonth,
    })
  }
  onSelectFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
  
  saveStoreDetails() {
    if (!this.storeId) {
      let storeDetails = this.getStoreDetails();
      this.storeService.createStore(storeDetails,
        (res: any) => {
          if (res) {
            this.router.navigate(["/storelist"]);
          }
        },
        (err: any) => {
          this.router.navigate(["/storelist"]);
        });
      this.router.navigate(["/storelist"]);
    } else {      
      let storeDetails = new StoreRequest();
      this.storeService.updateStore(storeDetails, this.appStateService.retailerId, this.storeId,
        (res: any) => {
          if (res) {
            this.router.navigate(["/storelist"]);
          }
        },
        (err: any) => {
          this.router.navigate(["/storelist"]);
        });
    }
  }

  getStoreDetails() {
    var storeDetails = new NewStoreRequest();
    return storeDetails;
  }
}
