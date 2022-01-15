import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

import { NewStoreRequest } from '../Models/NewStoreRequest';

@Injectable({
  providedIn: 'root'
})
export class MapMarkerService {
  allStores: string = 'https://localhost:7271/api/retailerstore/stores'

  constructor(
    private http: HttpClient,
  ) { }

  makeStoreMarkers(map: L.Map, storeDetails: NewStoreRequest): void {
    this.http.post(this.allStores, storeDetails).subscribe((res: any) => {
      for (const c of res) {
        const lon = c.longitude;
        const lat = c.latitude;
        const marker = L.marker([lat, lon]);
        marker.bindPopup(this.makeStoreDetailsPopup(c));
        marker.addTo(map);
      }
    });
  }

  makeStoreDetailsPopup(data: any): string {
    return `` +
      `<div>Capital: ${data.storeName}</div>` +
      `<div>State: ${data.state}</div>` +
      `<div>State: ${data.city}</div>` +
      `<div>State: ${data.areaInSft}</div>` +
      `<div>Population: ${data.country}</div>`
  }
}