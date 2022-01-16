import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

import { NewStoreRequest } from '../Models/NewStoreRequest';

@Injectable({
  providedIn: 'root'
})
export class MapMarkerService {
  allStores: string = 'https://localhost:7271/api/shelf/SearchShelvesBasicFilter'

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
      `<div>Store Name: ${data.storeName}</div>` +
      `<div>Area in SFT: ${data.areaInSft}</div>` +
      `<div>Footfall per Month: ${data.projectedFootfallPerMonth}</div>` +
      `<div>Sales per Month: ${data.estimatedSalesPerMonth}</div>`
  }
}