import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../shared/appStateService';
import { RetailerStoreService } from '../shared/retailerStoreService';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  states: any = ["telangana", "AndhraPradesh", "Orissa"];

  constructor(private router: Router, private storeService: RetailerStoreService,
    private appStateService: AppStateService) { }

  ngOnInit(): void {
  }
  banks: any = ["hdfc", "axis", "sbi"];
  bankDetailsForm = new FormGroup({
    bankName: new FormControl(''),
    branch: new FormControl(''),
    accountNumber: new FormControl(''),
    ifscCode: new FormControl(''),
    upiId: new FormControl(''),
  });
  addStore() {
    this.storeService.getAllStores(this.appStateService.retailerId,
      (res: any) => {
        this.appStateService.storeList = res;
        if (res.length != 0) {
          this.router.navigate(["/storelist"]);
        }
        else {
          this.router.navigate(["/storedetails"]);
        }
      },
      (err: any) => { })
    this.router.navigate(["/storedetails"]);
  }
}
