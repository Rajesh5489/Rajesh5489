import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/_services/appStateService';

@Component({
  selector: 'app-retail-sub-home',
  templateUrl: './retail-sub-home.component.html',
  styleUrls: ['./retail-sub-home.component.scss']
})
export class RetailSubHomeComponent implements OnInit {

  expandMenuSubscription!: Subscription;
  constructor(private appStateService: AppStateService) { }

  storeName!: string;
  storeLocation!: string;

  ngOnInit(): void {
    this.storeName = this.appStateService.storeName;
    this.storeLocation = this.appStateService.storeLocation;

  }

  ngAfterViewInit(): void {
    this.expandMenuSubscription = this.appStateService
      .getonExpandMenu()
      .subscribe((item: any) => {
        switch (item) {
          case "storeDetails":
            document.getElementById("v-pills-stores-tab")?.setAttribute("aria-expanded", "true");
            break;
          case "shelves":
            document.getElementById("v-pills-Shelves-tab")?.setAttribute("aria-expanded", "true");
            break;
          case "bookings":
            document.getElementById("v-pills-pending-bookings-tab")?.setAttribute("aria-expanded", "true");
            break;
          default:
            break;
        }
      });
  }
}
