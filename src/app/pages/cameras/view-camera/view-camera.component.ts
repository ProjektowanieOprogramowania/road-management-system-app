import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {CameraStream, CameraStreamService, Voivodeship} from "../../../services/generated";
import {coordParsed} from "../../../common/utils/mapLocalization";

@Component({
  selector: 'app-view-camera',
  templateUrl: './view-camera.component.html',
  styleUrls: ['./view-camera.component.scss']
})
export class ViewCameraComponent implements OnInit {

  mapOptions: any;
  selectedOption: any;
  subscriptions: Subscription = new Subscription();
  overlays: any;
  displayCameraStream = false;
  selectedCamera: CameraStream | undefined
  isLoading = true;

  constructor(private cameraStreamService: CameraStreamService) { }

  ngOnInit(): void {
    this.overlays = []
    this.mapOptions = [
      {
        name: "Dolnośląskie",
        value: "dolnoslaskie",
        center: new google.maps.LatLng(50.9500713, 16.5659413),
        zoom: 9.29
      },
      {
        name: "Kujawsko-Pomorskie",
        value: "kujawskopomorskie",
        center: new google.maps.LatLng(53.0553645, 17.9440441),
        zoom: 9
      },
      {
        name: "Lubelskie",
        value: "lubelskie",
        center: new google.maps.LatLng(51.269244, 22.320349),
        zoom: 9
      },
      {
        name: "Lubuskie",
        value: "lubuskie",
        center: new google.maps.LatLng(52.2666674, 15.2432843),
        zoom: 9
      },
      {
        name: "Łódzkie",
        value: "lodzkie",
        center: new google.maps.LatLng(51.6196027, 19.1438606),
        zoom: 9.29
      },
      {
        name: "Małopolskie",
        value: "malopolskie",
        center: new google.maps.LatLng(49.8693469, 20.1812266),
        zoom: 9.58
      },
      {
        name: "Mazowieckie",
        value: "mazowieckie",
        center: new google.maps.LatLng(52.1334436, 21.1397419),
        zoom: 8.5
      },
      {
        name: "Opolskie",
        value: "opolskie",
        center: new google.maps.LatLng(50.6045154, 17.878446),
        zoom: 9.58
      },
      {
        name: "Podkarpackie",
        value: "podkarpackie",
        center: new google.maps.LatLng(50.0044824, 22.0893166),
        zoom: 9
      },
      {
        name: "Podlaskie",
        value: "podlaskie",
        center: new google.maps.LatLng(53.4587929, 22.8055639),
        zoom: 8.58
      },
      {
        name: "Pomorskie",
        value: "pomorskie",
        center: new google.maps.LatLng(54.1349012, 17.9314465),
        zoom: 9.29
      },
      {
        name: "Śląskie",
        value: "slaskie",
        center: new google.maps.LatLng(50.2863161, 18.8505697),
        zoom: 9
      },
      {
        name: "Świętokrzyskie",
        value: "swietokrzyskie",
        center: new google.maps.LatLng(50.8187591, 20.4525356),
        zoom: 9.58
      },
      {
        name: "Warmińsko-Mazurskie",
        value: "warminskomazurskie",
        center: new google.maps.LatLng(53.8356121, 20.6087258),
        zoom: 9.29
      },
      {
        name: "Wielkopolskie",
        value: "wielkopolskie",
        center: new google.maps.LatLng(52.5111334, 17.0046353),
        zoom: 8.29
      },
      {
        name: "Zachodniopomorskie",
        value: "zachodniopomorskie",
        center: new google.maps.LatLng(53.5966533, 14.9920939),
        zoom: 9
      },
    ]
    this.selectedOption = this.mapOptions[6]
    this.getMarkers()
  }

  private getMarkers() {
    this.overlays = []
    const sub = this.cameraStreamService.getCameraStreamsByVoivodeship(this.selectedOption.value.toUpperCase())
      .subscribe(data => {
          data.forEach((camera: any) => {
            let marker = new google.maps.Marker({position: coordParsed(camera), title: camera.name})
            marker.setValues({type: "point", id: camera.id});
            this.overlays.push(marker)
          })
        }
      );
    this.subscriptions.add(sub);
  }

  onVoivodeshipSelect(map: any) {
    map.setCenter(this.selectedOption.center);
    map.setZoom(this.selectedOption.zoom)
    this.getMarkers()
  }

  handleOverlayClick(event: any) {
    const sub = this.cameraStreamService.getCameraStream(event.overlay.id)
      .subscribe(data => {
          this.selectedCamera = data
        console.log(data)
        }
      );
    this.subscriptions.add(sub);
    this.displayCameraStream = true
  }

  handleModalClose() {
    this.displayCameraStream = false;
    this.isLoading = true
  }
}
