import { Component, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { MapMarkerService } from '../../_services/mapMarkerService';
import { NewStoreRequest } from '../../_models/NewStoreRequest';
import { BrandSearchResultSummaryResponse } from 'src/app/_models/BrandSearchResultSummaryResponse';

const iconRetinaUrl = '/assets/mapicons/blue-marker.svg';
const iconUrl = '/assets/mapicons/blue-marker.svg';
const shadowUrl = '/assets/mapicons/blue-marker.svg';
const iconDefault = L.icon({
  //iconRetinaUrl,
  iconUrl,
  //shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {

  private map!: L.Map;
  @Input() bookingsList = new Array<BrandSearchResultSummaryResponse>();

  private initMap(): void {
    this.map = L.map('map', {
      center: [17.3850, 78.4867],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private markerService: MapMarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeStoreMarkers(this.map, this.bookingsList);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === "bookingsList") {
        this.markerService.makeStoreMarkers(this.map, this.bookingsList);
      }
    }
  }
}