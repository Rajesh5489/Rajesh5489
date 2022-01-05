import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  showMaps: boolean = true;
  constructor() { }

  ngOnInit(): void {


  }
  userDetailsForm = new FormGroup({
    bussinessName: new FormControl(''),
    primaryContactName: new FormControl(''),
    primaryContactNumber: new FormControl(''),
    secondaryContactName: new FormControl(''),
    secondaryContactNumber: new FormControl(''),
    secondaryEmailId: new FormControl(''),
    pANNo: new FormControl(''),
    bankName: new FormControl(''),
    primaryEmailid: new FormControl(''),
    accountNumber: new FormControl(''),
    ifscCode: new FormControl(''),
    gstNo: new FormControl(''),
  });
}
