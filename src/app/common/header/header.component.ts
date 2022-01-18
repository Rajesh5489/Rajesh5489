import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/_services/appStateService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public appstateService:AppStateService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public logout(){
    this.appstateService.retailerId = null;
    this.router.navigate(["/"]);
  }
}
