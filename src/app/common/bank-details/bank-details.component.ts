import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../_services/appStateService';
import { RetailerStoreService } from '../../_services/retailerStoreService';
import { FormGroup, FormControl } from '@angular/forms';
import { BankService } from '../../_services/bankService';
import { NewRetailerBankRequest } from '../../_models/NewRetailerBankRequest';
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
    this.checkAndSaveBankDetails();
  }
  
  banks: any = ["hdfc", "axis", "sbi"];
  bankSaveEdit : string = "Save";
  disableBankEdit : boolean = false;

  bankDetailsForm = new FormGroup({
    bankName: new FormControl(''),
    branch: new FormControl(''),
    accountNumber: new FormControl(''),
    ifsc: new FormControl(''),
    upi: new FormControl(''),
  });

  public checkAndSaveBankDetails(){
      this.bankService.getBankDetailsForRetailer(this.appStateService.retailerOrBrandId, 
        (res: any) => { 
          if(res!=null && res.bankId >0)
          {
            this.bankDetailsForm.disable();
            // implies there are bank details associated.
            // Fetch and show them for the user
            this.bankDetailsForm.value.bankName = res.bankName;
            this.bankDetailsForm.value.branch = res.branch;
            this.bankDetailsForm.value.accountNumber = res.accountNumber;
            this.bankDetailsForm.value.ifsc = res.ifsc;
            this.bankDetailsForm.value.upi = res.upi;
          }
        },
        (err: any) => { });
  }

  addBankDetails() {
    var bankDetails = new NewRetailerBankRequest();
    bankDetails = this.bankDetailsForm.getRawValue();
    bankDetails.retailerId = this.appStateService.retailerOrBrandId;
    bankDetails.createdBy = this.appStateService.userName;
    bankDetails.createdDate = new Date().toISOString();
    this.bankService.createBankForRetailer(bankDetails,
      (res: any) => {

        // DONT REDIRECT ANYWHERE AFTER SAVING BANK DETAILS.
        // CHANGE TO READ-ONLY VIEW OF BANK DETAILS AND CHANGE BUTTON TO EDIT INSTEAD OF SAVE
        this.disableBankEdit = true;

        // this.storeService.getAllStores(this.appStateService.retailerOrBrandId,
        //   (res: any) => {
        //     this.appStateService.storeList = res;
        //     if (res.length != 0) {
        //       this.router.navigate(["/retail-home"]);
        //     }
        //     else {
        //       this.router.navigate(["/storedetails"]);
        //     }
        //   },
        //   (err: any) => { });
      },
      (err: any) => { });
  }
}
