import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      if(params.act=="cart")
      {
        document.getElementById("v-pills-messages-tab")?.click();
      }
      else if(params.act=="profile")
      {
        document.getElementById("v-pills-profile-tab")?.click();
      }
      else if(params.act=="bks")
      {
        document.getElementById("v-pills-bookings-tab")?.click();
      }
    });
  }
}
