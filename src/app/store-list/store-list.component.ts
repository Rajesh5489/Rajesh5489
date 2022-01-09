import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  constructor(
    private router: Router) { }

  ngOnInit() {

  }
  editSpace() {
    this.router.navigate(["/addSpaces"]);
  }
  editBookings() {
    this.router.navigate(["/addSpaces"]);
  }
  editStore() {
    this.router.navigate(["/storedetails"], {queryParams: {storeId: null}});
  }
}
