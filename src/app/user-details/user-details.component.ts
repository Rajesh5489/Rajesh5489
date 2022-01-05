import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailsService } from '../user-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  constructor(
    private route: Router,
    public UserDetais: UserDetailsService
  ) { }
  
  banks: any = ["hdfc", "axis", "sbi"];
  userDetailsForm = new FormGroup({
    bussinessName: new FormControl(''),
    ownersName: new FormControl(''),
    primaryContactNumber: new FormControl(''),
    secondaryContactName: new FormControl(''),
    secondaryContactNumber: new FormControl(''),
    secondaryEmailId: new FormControl(''),
    pANNo: new FormControl(''),
    bankName: new FormControl(''),
    branch: new FormControl(''),
    accountNumber: new FormControl(''),
    ifscCode: new FormControl(''),
    upiId: new FormControl(''),
  });
  addStoreDetails() {
    this.UserDetais.getList().subscribe((response: any) => {
      console.log(response);
      // this.studentsData = response;
    })
    this.route.navigate(["/storedetails"])
  }

}
