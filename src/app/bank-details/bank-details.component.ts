import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../shared/appStateService';
import { RetailerStoreService } from '../shared/retailerStoreService';
import { FormGroup, FormControl } from '@angular/forms';
import { BankService } from '../shared/bankService';
import { NewRetailerBankRequest } from '../Models/NewRetailerBankRequest';
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  states: any = ["telangana", "AndhraPradesh", "Orissa"];

  constructor(private router: Router,
    private storeService: RetailerStoreService,
    private bankService: BankService,
    private appStateService: AppStateService) { }

  ngOnInit(): void {
  }
  banks: any = ["hdfc", "axis", "sbi"];
  bankDetailsForm = new FormGroup({
    bankName: new FormControl(''),
    branch: new FormControl(''),
    accountNumber: new FormControl(''),
    ifsc: new FormControl(''),
    upi: new FormControl(''),
  });

  addBankDetails() {
    var bankDetails = new NewRetailerBankRequest();
    bankDetails = this.bankDetailsForm.getRawValue();
    bankDetails.retailerId = this.appStateService.retailerId;
    bankDetails.createdBy = this.appStateService.retailerName;
    bankDetails.createdDate = new Date().toISOString();
    this.bankService.createBankForRetailer(bankDetails,
      (res: any) => {
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
          (err: any) => { });
      },
      (err: any) => { });
  }
}
