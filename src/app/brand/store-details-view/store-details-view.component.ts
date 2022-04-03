import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreSummary } from 'src/app/_models/StoreSummary';

@Component({
  selector: 'app-store-details-view',
  templateUrl: './store-details-view.component.html',
  styleUrls: ['./store-details-view.component.scss']
})
export class StoreDetailsViewComponent implements OnInit {

  storeDetails!:StoreSummary;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
