import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { BrandSearchResultSummaryResponse } from '../_models/BrandSearchResultSummaryResponse';

@Injectable({
  providedIn: 'root'
})
export class MapMarkerService {

  constructor() { }

  makeStoreMarkers(map: L.Map, bookingSearchResults: Array<BrandSearchResultSummaryResponse>): void {
    
    if(bookingSearchResults && bookingSearchResults.length>0)
    {
      for (const c of bookingSearchResults) {
        const marker = L.marker([+c.latitude, +c.longitude]);
        marker.bindPopup(this.makeStoreDetailsPopup(c));
        marker.addTo(map);
      }
    }
    // else
    //   {
    //     map.eachLayer(function (layer) {
    //       map.removeLayer(layer);
    //     });
    //   }
  }

  makeStoreDetailsPopup(data: any): string {
    return `` +
      `<div>Store Name: ${data.storeName}</div>` +
      `<div>Area in SFT: ${data.storeAreaInSft}</div>` +
      `<div>Footfall per Month: ${data.projectedFootfallPerMonth}</div>` +
      `<div>Retailer Name: ${data.retailerName}</div>` +
      `<div>Sales per Month: ${data.estimatedSalesPerMonth}</div>`
  }
}