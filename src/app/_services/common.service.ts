import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BrandSearchResultSummaryResponse } from '../_models/BrandSearchResultSummaryResponse';
import { ShelfSummary } from '../_models/ShelfSummary';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private selectedStoresSubject = new Subject<Array<BrandSearchResultSummaryResponse>>();
  private selectedShelvesSubject = new Subject<Array<ShelfSummary>>();
  private bookingDaysCount = new Subject<Number>();
  private cartViewClickedUpdate = new Subject<boolean>();

  sendSelectedStoresUpdate(message: any) { 
    this.selectedStoresSubject.next(message); //next() will feed the value in Subject
  }

  getSelectedStoresUpdate(): Observable<any> { 
    return this.selectedStoresSubject.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  sendSelectedShelvesUpdate(message: any) { 
    this.selectedShelvesSubject.next(message);
  }

  getSelectedShelvesUpdate(): Observable<any> { 
    return this.selectedShelvesSubject.asObservable();
  }

  sendBookingDaysCountUpdate(message: any) { 
    this.bookingDaysCount.next(message);
  }

  getBookingDaysCountUpdate(): Observable<any> { 
    return this.bookingDaysCount.asObservable();
  }

  sendCartViewClickedUpdate(message: boolean) { 
    this.cartViewClickedUpdate.next(message);
  }

  getCartViewClickedUpdate(): Observable<boolean> { 
    return this.cartViewClickedUpdate.asObservable();
  }

}
