import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewStoreRequest } from '../../_models/NewStoreRequest';
import { StoreRequest } from '../../_models/StoreRequest';
import { AppStateService } from '../../_services/appStateService';
import { RetailerStoreService } from '../../_services/retailerStoreService';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent {
  constructor(private router: Router,
    private storeService: RetailerStoreService,
    private route: ActivatedRoute,
    private appStateService: AppStateService) { }

  storeId!: any;
  states: any = ["Telangana", "Andhra Pradesh", "Orissa", "Karnataka", "Madhya Pradesh", "Uttar Pradesh", "Gujarat"];
  @Output() showAddStoreView = new EventEmitter<string>();

  getIfAddStoreViewNeeded(value: string) {
    this.showAddStoreView.emit(value);
  }

  storeForm = new FormGroup({
    storeName: new FormControl(''),
    fullAddress: new FormControl(''),
    managerContactName: new FormControl(''),
    managerContactNumber: new FormControl(''),
    managerEmailAddress: new FormControl(''),
    secondaryContactName: new FormControl(''),
    secondaryContactNumber: new FormControl(''),
    secondaryEmailAddress: new FormControl(''),
    storeContactNumber: new FormControl(''),
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

    // Fetch store id from appstateservice
    this.storeId = this.appStateService.storeId;

    // If store id is present, implies existing record is being viewed/edited
    // Fetch the details from the DB and initialise
    if (this.storeId) {
      this.initialiseForm();
    }

    // this.route.queryParams.subscribe(params => {
    //   this.storeId = +params.storeId ?? null;
    //   if (this.storeId) {
    //     this.initialiseForm();
    //   }
    // });
  }

  initialiseForm() {
    var storeInfo = this.appStateService.storeList.find((x: any) => x.storeId == this.storeId);
    this.storeForm.patchValue({
      storeName: storeInfo?.storeName,
      fullAddress: storeInfo?.fullAddress,
      managerContactName: storeInfo?.managerContactName,
      managerContactNumber: storeInfo?.managerContactNumber,
      managerEmailAddress: storeInfo?.managerEmailAddress,
      secondaryContactName: storeInfo?.secondaryContactName,
      secondaryContactNumber: storeInfo?.secondaryContactNumber,
      secondaryEmailAddress: storeInfo?.secondaryEmailAddress,
      storeContactNumber: storeInfo?.storeContactNumber,
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
      let storeDetails = this.getStoreDetails(true);
      this.storeService.createStore(storeDetails,
        (res: any) => {
          if (res) {
            this.storeId = res.storeId;
          }
        },
        (err: any) => {
        });
      this.router.navigate(["/retail-home"]);
    } 
    else 
    {
      let storeDetails = this.getStoreDetails(false);
      this.storeService.updateStore(storeDetails, this.appStateService.retailerOrBrandId, this.storeId,
        (res: any) => {
          if (res) {
            this.router.navigate(["/retail-home"]);
          }
        },
        (err: any) => {
        });
    }
  }

  // Method that fetches the store details from DB if UPDATE scenario
  // or gets the details from the UI form if its a new CREATE scenario
  getStoreDetails(isNew: boolean) {
    var storeDetails: any;
    if (isNew) {
      storeDetails = new NewStoreRequest();
      storeDetails.retailerId = this.appStateService.retailerOrBrandId;
      storeDetails.country = this.storeForm.value.country;
      storeDetails.state = this.storeForm.value.state;
      storeDetails.city = this.storeForm.value.city;
      storeDetails.pinCode = this.storeForm.value.pinCode;
      storeDetails.gstin = this.storeForm.value.gstin;
      storeDetails.createdDate = new Date().toISOString();
      storeDetails.createdBy = this.appStateService.userName;
    }
    else {
      storeDetails = new StoreRequest();
      storeDetails.storeId = this.storeId;
      storeDetails.modifiedDate = new Date().toISOString();
      storeDetails.modifiedBy = this.appStateService.userName;
      storeDetails.isActive = true;
    }
    storeDetails.storeName = this.storeForm.value.storeName;
    storeDetails.fullAddress = this.storeForm.value.fullAddress;
    storeDetails.managerContactName = this.storeForm.value.managerContactName;
    storeDetails.managerContactNumber = this.storeForm.value.managerContactNumber;
    storeDetails.managerEmailAddress = this.storeForm.value.managerEmailAddress;
    storeDetails.secondaryContactName = this.storeForm.value.secondaryContactName;
    storeDetails.secondaryContactNumber = this.storeForm.value.secondaryContactNumber;
    storeDetails.secondaryEmailAddress = this.storeForm.value.secondaryEmailAddress;
    storeDetails.storeContactNumber = this.storeForm.value.storeContactNumber;
    storeDetails.location = this.storeForm.value.location;

    var latitude = 17.4 + (Math.floor(Math.random() * 90000) + 10000) / 1000000;
    latitude = Math.round(latitude * 100000) / 100000;

    var longitude = 78.3 + (Math.floor(Math.random() * 90000) + 10000) / 1000000;
    longitude = Math.round(longitude * 100000) / 100000;

    storeDetails.latitude = latitude; //this.storeForm.value.latitude;
    storeDetails.longitude = longitude; // this.storeForm.value.longitude;    
    storeDetails.areaInSft = this.storeForm.value.areaInSft;
    storeDetails.projectedFootfallPerMonth = this.storeForm.value.projectedFootfallPerMonth;
    storeDetails.estimatedSalesPerMonth = this.storeForm.value.estimatedSalesPerMonth;

    return storeDetails;
  }

  close() {
    this.appStateService.clearRetailerOrBrandId();
    this.getIfAddStoreViewNeeded("false");
    this.router.navigate(["/retail-home"]);
  }
}
