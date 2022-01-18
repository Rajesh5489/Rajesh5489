import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, FormArray, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageDetails } from '../Models/ImageDetails';
import { NewShelfRequest } from '../Models/NewShelfRequest';
import { RetailerStoreDetailsImageRequest } from '../Models/RetailerStoreDetailsImageRequest';
import { ShelfRequest } from '../Models/ShelfRequest';
import { ShelfSummary } from '../Models/ShelfSummary';
import { AppStateService } from '../shared/appStateService';
import { RetailerStoreService } from '../shared/retailerStoreService';
import { ShelfService } from '../shared/shelfService';
import { AddSpacesService } from './add-spacesService';
@Component({
  selector: 'app-add-spaces',
  templateUrl: './add-spaces.component.html',
  styleUrls: ['./add-spaces.component.scss']
})
export class AddSpacesComponent {
  states: any = ["telangana", "AndhraPradesh", "Orissa"];
  url = "./assets/plus.png"
  images!: Array<RetailerStoreDetailsImageRequest>;
  spaceFormArray: Array<FormGroup> = [];
  shelfTypes: any;
  productCategories: any;
  formBuilder: any;
  isAddMoreDisable!: boolean;
  storeId!: any;
  shelves: Array<ShelfSummary> = [];

  constructor(
    private router: Router,
    private addSpacesService: AddSpacesService,
    private shelfService: ShelfService,
    private domSanitizer: DomSanitizer,
    private appStateService: AppStateService,
    private storeService: RetailerStoreService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.storeId = +params.storeId;
      this.getShelfTypes();
      this.getProductCategories();
      this.getShelvesDetails();
    });
  }
  getShelvesDetails() {
    this.shelfService.getShelvesDetailsForRetailerByStore(this.appStateService.retailerId,
      this.storeId,
      (res: any) => {
        if (res && res.length > 0) {
          this.shelves = res.reverse();
          this.shelves.forEach((element: any) => {
            this.spaceFormArray.push(this.intialiseItem(element));
          });
        }
        else{
          this.addNewSpace();
        }
      },
      (err: any) => { }
    )
  }

  getShelfTypes() {
    this.addSpacesService.getShelfTypes(
      (res: any) => {
        this.shelfTypes = res;
      },
      (err: any) => { })
  }

  getProductCategories() {
    this.addSpacesService.getProductCategories(
      (res: any) => {
        this.productCategories = res;
      },
      (err: any) => { })
  }

  onSelectFile(event: any) {
    let file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(
        this,
        file.name
      );
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(filename: any, readerEvt: any) {
    let base64String = btoa(readerEvt.target.result);
    this.setImgFromBinary(base64String, filename);
  }
  setImgFromBinary(base64String: any, filename: any) {
    var image = new ImageDetails;
    image.imageUrl = base64String;
    var image1 = this.domSanitizer.bypassSecurityTrustUrl(
      "data:image/;base64, " + base64String
    );
  }

  addNewSpace() {
    this.isAddMoreDisable = true;
    this.spaceFormArray.unshift(
      this.createItem());
  }

  deleteSpace(space: any, index: any) {
    this.shelfService.deleteShelf(
      this.appStateService.retailerId,
      this.storeId,
      space.value.shelfId,
      (res: any) => { this.deleteSuccessCallback(space, index); },
      (err: any) => { }
    )
  }
  deleteSuccessCallback(space: any, index: any) {
    let i = this.spaceFormArray.findIndex(
      x => x.value.shelfId === space.value.shelfId
    );
    this.spaceFormArray.splice(i, 1);
  }

  editSpace(space: any, index: any) {
    space.patchValue({
      isEditClicked: true
    });
    this.isAddMoreDisable = true;
  }

  saveSpace(space: FormGroup, index: any) {
    if (space.value.shelfId) {
      let shelf = new ShelfRequest();
      shelf.shelfId = +space.value.shelfId;
      shelf.modifiedDate = new Date().toISOString();
      shelf.modifiedBy = this.appStateService.retailerName;
      shelf.isActive = space.value.isActive === "true" ? true : false;
      this.buildShelfRequest(shelf, space);
      this.shelfService.updateShelf(
        shelf,
        this.appStateService.retailerId,
        this.storeId,
        space.value.shelfId,
        (res: any) => {
          this.saveSuccessCallback(space, res);
        },
        (err: any) => { }
      )
    }
    else {
      let shelf = new NewShelfRequest();
      shelf.retailerId = this.appStateService.retailerId;
      shelf.storeId = this.storeId;
      shelf.createdDate = new Date().toISOString();
      shelf.createdBy = this.appStateService.retailerName;
      this.buildShelfRequest(shelf, space);
      this.shelfService.createShelf(
        shelf,
        (res: any) => {
          space.patchValue({
            shelfId: res.shelfId,
            isEditClicked: false
          });
          this.shelves.push(this.createShelfSummary(space));
          this.isAddMoreDisable = false;
        },
        (err: any) => { }
      )
      space.patchValue({
        isEditClicked: false
      });
      this.isAddMoreDisable = false;
    }
  }

  createShelfSummary(space: FormGroup): ShelfSummary {
    var shelf = new ShelfSummary();
    shelf.shelfId = +space.value.shelfId;
    shelf.shelfTypeId = +space.value.shelfTypeId;
    shelf.rowNumber = +space.value.rowNumber;
    shelf.customName = space.value.customName;
    shelf.currentCategory = +space.value.currentCategory;
    shelf.prohibitedCategories = space.value.prohibitedCategories;
    shelf.areaInSft = +space.value.areaInSft;
    shelf.costPerSft = +space.value.costPerSft;
    shelf.minimumBookingPeriodInDays = +space.value.minimumBookingPeriodInDays;
    shelf.preBookingPeriodInDays = +space.value.preBookingPeriodInDays;
    return shelf;
  }

  updateShelfSummary(space: FormGroup) {
    var shelf = this.shelves.find((x: any) => x.shelfId == space.value.shelfId);
    if (shelf) {
      shelf.shelfId = +space.value.shelfId;
      shelf.shelfTypeId = +space.value.shelfTypeId;
      shelf.rowNumber = +space.value.rowNumber;
      shelf.customName = space.value.customName;
      shelf.currentCategory = +space.value.currentCategory;
      shelf.prohibitedCategories = space.value.prohibitedCategories;
      shelf.areaInSft = +space.value.areaInSft;
      shelf.costPerSft = +space.value.costPerSft;
      shelf.minimumBookingPeriodInDays = +space.value.minimumBookingPeriodInDays;
      shelf.preBookingPeriodInDays = +space.value.preBookingPeriodInDays;
      shelf.isActive = space.value.isActive === "true" ? true : false;
    }
  }

  private buildShelfRequest(shelf: any, space: any) {
    shelf.shelfTypeId = +space.value.shelfTypeId;
    shelf.rowNumber = +space.value.rowNumber;
    shelf.customName = space.value.customName;
    shelf.currentCategory = +space.value.currentCategory;
    shelf.prohibitedCategories = space.value.prohibitedCategories;
    shelf.areaInSft = +space.value.areaInSft;
    shelf.costPerSft = +space.value.costPerSft;
    shelf.minimumBookingPeriodInDays = +space.value.minimumBookingPeriodInDays;
    shelf.preBookingPeriodInDays = +space.value.preBookingPeriodInDays;
  }

  saveSuccessCallback(space: any, res: any) {
    space.patchValue({
      shelfId: res.shelfId,
      isEditClicked: false
    });
    this.updateShelfSummary(space);
    this.isAddMoreDisable = false;
  }

  createItem(): FormGroup {
    return new FormGroup({
      rowNumber: new FormControl(1),
      shelfId: new FormControl(''),
      shelfTypeId: new FormControl(''),
      customName: new FormControl(''),
      currentCategory: new FormControl(''),
      prohibitedCategories: new FormControl(''),
      areaInSft: new FormControl(''),
      costPerSft: new FormControl(''),
      minimumBookingPeriodInDays: new FormControl(''),
      preBookingPeriodInDays: new FormControl(''),
      isEditClicked: new FormControl(true),
      isActive: new FormControl(true)
    });
  }

  intialiseItem(element: ShelfSummary): FormGroup {
    return new FormGroup({
      rowNumber: new FormControl(element.rowNumber),
      shelfId: new FormControl(element.shelfId),
      shelfTypeId: new FormControl(element.shelfTypeId),
      customName: new FormControl(element.customName),
      currentCategory: new FormControl(element.currentCategory),
      prohibitedCategories: new FormControl(element.prohibitedCategories),
      areaInSft: new FormControl(element.areaInSft),
      costPerSft: new FormControl(element.costPerSft),
      minimumBookingPeriodInDays: new FormControl(element.minimumBookingPeriodInDays),
      preBookingPeriodInDays: new FormControl(element.preBookingPeriodInDays),
      isEditClicked: new FormControl(false),
      isActive: new FormControl(element.isActive)
    });
  }

  cancel(space: any, i: any) {
    if (!space.value.shelfId) {
      this.deleteSuccessCallback(space, i);
    } else {
      var shelf = this.shelves.find((x: any) => x.shelfId == space.value.shelfId);
      if (shelf) {
        this.reintialiseItem(space, shelf);
      }
    }
    this.isAddMoreDisable = false;
  }

  reintialiseItem(space: FormGroup, element: ShelfSummary) {
    space.patchValue({
      rowNumber: element.rowNumber,
      shelfId: element.shelfId,
      shelfTypeId: element.shelfTypeId,
      customName: element.customName,
      currentCategory: element.currentCategory,
      prohibitedCategories: element.prohibitedCategories,
      areaInSft: element.areaInSft,
      costPerSft: element.costPerSft,
      minimumBookingPeriodInDays: element.minimumBookingPeriodInDays,
      preBookingPeriodInDays: element.preBookingPeriodInDays,
      isEditClicked: false,
      isActive: element.isActive
    });
  }

  close() {
    this.router.navigate(["/storelist"]);
  }
}
