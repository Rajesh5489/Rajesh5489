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

}
