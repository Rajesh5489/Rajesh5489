import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShelfSummary } from 'src/app/_models/ShelfSummary';

@Component({
  selector: 'app-shelf-details-view',
  templateUrl: './shelf-details-view.component.html',
  styleUrls: ['./shelf-details-view.component.scss']
})
export class ShelfDetailsViewComponent implements OnInit {

  shelfDetails!:ShelfSummary;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
