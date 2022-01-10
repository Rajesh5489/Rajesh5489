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
  storeId!: any;
  constructor(private router: Router,
    private storeService: RetailerStoreService,
    private route: ActivatedRoute,
    private appStateService: AppStateService) { }
  states: any = ["telangana", "AndhraPradesh", "Orissa"];
  areaInSfts: any = ["1000sft", "2000sft", "300sft"];
  projectedFootfalls: any = [10, 20, 30]
  estimatedFootfalls: any = [10, 20, 30]
  storeForm = new FormGroup({
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
      this.storeId = params.storeId ?? null;
      if (this.storeId) {
        this.initialiseForm();
      }
    });
  }
  initialiseForm() {
    var storeInfo = this.appStateService.storeList.find((x: any) => x.storeId == this.storeId);
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
      }
    }
  }

  saveStoreDetails() {
    if (!this.storeId) {
      let storeDetails = this.getStoreDetails();
      this.storeService.createStore(storeDetails,
        (res: any) => {
          if (res) {
            this.storeId = res.storeId;
          }
        },
        (err: any) => {
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
        });
        this.router.navigate(["/storelist"]);
    }
  }

  getStoreDetails() {
    var storeDetails = new NewStoreRequest();
    storeDetails.retailerId = this.appStateService.retailerId;
    storeDetails.storeName = this.storeForm.value.storeName;
    storeDetails.fullAddress = this.storeForm.value.fullAddress;
    storeDetails.country = this.storeForm.value.country;
    storeDetails.state = this.storeForm.value.state;
    storeDetails.city = this.storeForm.value.city;
    storeDetails.location = this.storeForm.value.location;
    storeDetails.pinCode = this.storeForm.value.pinCode;
    storeDetails.latitude = this.storeForm.value.latitude;
    storeDetails.longitude = this.storeForm.value.longitude;
    storeDetails.areaInSft = this.storeForm.value.areaInSft;
    storeDetails.gstin = this.storeForm.value.retailerId;
    storeDetails.projectedFootfallPerMonth = this.storeForm.value.projectedFootfallPerMonth;
    storeDetails.estimatedSalesPerMonth = this.storeForm.value.estimatedSalesPerMonth;
    storeDetails.createdDate = new Date().toISOString();
    storeDetails.createdBy = "manju";

    return storeDetails;
  }
}
