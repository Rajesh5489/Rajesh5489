import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/_services/appStateService';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.scss']
})
export class StoreHomeComponent implements OnInit {

  public storeName! : string;

  constructor(private appstateService : AppStateService) { }

  ngOnInit(): void {
    this.storeName = this.appstateService.userName;
  }

}
