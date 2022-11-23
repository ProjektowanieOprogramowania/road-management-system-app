import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Sensor, SensorsService, SensorType, Voivodeship} from "../../../services/generated";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sensor-register-form',
  templateUrl: './sensor-register-form.component.html',
  styleUrls: ['./sensor-register-form.component.scss']
})
export class SensorRegisterFormComponent implements OnInit {

  name: string = "";
  serialNumber: string = "";
  selectedSensorType: SensorType | undefined
  active: boolean = true;
  localizationString: string = ""

  sensorNameValid: boolean = true;
  serialNumberValid: boolean = true;
  sensorTypes: SensorType[]

  selectedOptions: any;
  selectedPosition: any;
  selectedLocation: any[] = [];
  isAddingNodesModeOn: boolean = false;
  disabled: boolean = true;
  subscriptions: Subscription = new Subscription();

  constructor(private sensorService: SensorsService, private http: HttpClient, private router: Router) {
    this.sensorTypes = [SensorType.Traffic]
  }

  ngOnInit(): void {
    this.selectedOptions = {
      center: new google.maps.LatLng(52.1645673, 19.9203192),
      zoom: 7.3
    }
  }

  setAddingNodesMode() {
    this.isAddingNodesModeOn = true
  }

  handleMapClick(event: any) {
    if (!this.isAddingNodesModeOn) {
      return;
    }
    this.selectedPosition = event.latLng;
    this.addMarker()
  }

  addMarker() {
    this.selectedLocation = [(new google.maps.Marker({
      position: {
        lat: this.selectedPosition.lat(),
        lng: this.selectedPosition.lng()
      },
    }))];
    this.isAddingNodesModeOn = false;
    this.getVoivodeship(this.selectedLocation[0].position.lat(), this.selectedLocation[0].position.lng())
  }

  validateForm() {
    if(!this.name || this.name.length === 0) {
      this.sensorNameValid = false;
    } else {
      this.sensorNameValid = true;
    }
  }

  getReverseGeoCode(lat: number, lon: number): Observable<any> {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&sensor=false&key=AIzaSyDU3n7u3bjvvzAZBvZgGuGv9L_872q4fHo&language=pl-PL")
    }

  getVoivodeship(lat: number, lon: number) {
    const sub = this.getReverseGeoCode(lat, lon)
      .subscribe(data => {
          const letters     = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'];
          const replacement = ['a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z'];
          let result = data.results[Object.keys(data.results).length - 2].formatted_address.split(",")[0].toLowerCase();
          for (let i = 0; i < letters.length; ++i) {
            result = result.replace(letters[i], replacement[i]).replace("-","");
          }
          this.localizationString = result
        }
      );
      this.subscriptions.add(sub);
  }

  findVoivodeship(string: String) {
    if (this.localizationString === "dolnoslaskie"){
      return Voivodeship.Dolnoslaskie
    } else if (this.localizationString === "kujawskopomorskie"){
      return Voivodeship.Kujawskopomorskie
    } else if (this.localizationString === "lodzkie"){
      return Voivodeship.Lodzkie
    } else if (this.localizationString === "lubuskie"){
      return Voivodeship.Lubuskie
    } else if (this.localizationString === "malopolskie"){
      return Voivodeship.Malopolskie
    } else if (this.localizationString === "mazowieckie"){
      return Voivodeship.Mazowieckie
    } else if (this.localizationString === "opolskie"){
      return Voivodeship.Opolskie
    } else if (this.localizationString === "podkarpackie"){
      return Voivodeship.Podkarpackie
    } else if (this.localizationString === "podlaskie"){
      return Voivodeship.Podlaskie
    } else if (this.localizationString === "slaskie"){
      return Voivodeship.Slaskie
    } else if (this.localizationString === "swietokrzyskie"){
      return Voivodeship.Swietokrzyskie
    } else if (this.localizationString === "warminskomazurskie"){
      return Voivodeship.Warminskomazurskie
    } else if (this.localizationString === "wielkopolskie"){
      return Voivodeship.Wielkopolskie
    } else if (this.localizationString === "zachodniopomorskie"){
      return Voivodeship.Zachodniopomorskie
    } else if (this.localizationString === "lubelskie"){
      return Voivodeship.Lubelskie
    } else {
      return Voivodeship.Pomorskie
    }
  }

  findSensorType(){

  }

  submit(){
    this.validateForm()
    if(this.sensorNameValid&&this.serialNumberValid&&this.selectedLocation.length === 1 && this.selectedSensorType) {
    const sensor: Sensor = {
      name: this.name,
      localization: {'latitude': this.selectedLocation[0].position.lat(), 'longitude': this.selectedLocation[0].position.lng()},
      voivodeship: this.findVoivodeship(this.localizationString),
      serialNumber: this.serialNumber,
      sensorType: this.selectedSensorType,
      enabled: this.active,
    }
    const sub = this.sensorService.addSensor(sensor)
      .subscribe(data => {
        console.log("Added", data)
        this.router.navigate(['/']);
      }
    );
    this.subscriptions.add(sub);
   }
  }

}
