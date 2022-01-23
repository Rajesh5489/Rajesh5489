import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/_services/appStateService';

@Component({
  selector: 'app-retail-sub-home',
  templateUrl: './retail-sub-home.component.html',
  styleUrls: ['./retail-sub-home.component.scss']
})
export class RetailSubHomeComponent implements OnInit {

  constructor(private appStateService: AppStateService) { }

  storeName!:string;
  storeLocation!:string;

  ngOnInit(): void {
      this.storeName = this.appStateService.storeName;
      this.storeLocation = this.appStateService.storeLocation;
  }

}
