import { Component, OnInit } from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {segmentsToGoogleMarkersArr, segmentsToGooglePolylineArr} from "../../../common/utils/mapLocalization";

@Component({
  selector: 'app-view-camera',
  templateUrl: './view-camera.component.html',
  styleUrls: ['./view-camera.component.scss']
})
export class ViewCameraComponent implements OnInit {

  mapOptions: any;
  selectedOption: any;

  constructor() { }

  ngOnInit(): void {
    this.mapOptions = [
      {
        name: "Wszystkie",
        center: new google.maps.LatLng(52.1645673, 19.9203192),
        zoom: 7.3
      },
      {
        name: "Mazowieckie",
        center: new google.maps.LatLng(52.1334436, 21.1397419),
        zoom: 8.5
      }
    ]
    this.selectedOption = this.mapOptions[0]
  }

  onVoivodeSelect(map: any) {
    const zoom = this.selectedOption.zoom
    console.log("AAAAAAAAAA", zoom)
    map.setCenter(this.selectedOption.center);
    map.setZoom(this.selectedOption.zoom)
  }

}
