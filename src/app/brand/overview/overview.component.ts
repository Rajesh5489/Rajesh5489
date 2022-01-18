import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewStoreRequest } from '../../Models/NewStoreRequest';
import { ShelfService } from '../../shared/shelfService';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  allStores: string = 'https://localhost:7271/api/shelf/SearchShelvesBasicFilter'
  bookingsList : any;
  constructor(private shelfService: ShelfService,private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post(this.allStores, new NewStoreRequest()).subscribe((res: any) => {
      this.bookingsList = res;
      }
    );
  }
}
