import { Component, Input, OnInit } from '@angular/core';
import { BrandSearchResultSummaryResponse } from 'src/app/_models/BrandSearchResultSummaryResponse';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input() bookingsList = new Array<BrandSearchResultSummaryResponse>();

  constructor() {}

  ngOnInit(): void {}
}
