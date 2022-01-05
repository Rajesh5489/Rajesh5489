import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { ShelfTypes } from './meta-data';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  base_path ="https://app-backend-dev-centralindia.azurewebsites.net/api"
  constructor(private http: HttpClient) { }

  getList(): Observable<ShelfTypes> {
    return this.http
      .get<ShelfTypes>(this.base_path+ '/metadata/getshelftypes')
      // .subscribe(
      //   issues => {
      //     successcallback(issues);
      //   },
      //   error=> errorcallback(error);
      // )
  }
}
