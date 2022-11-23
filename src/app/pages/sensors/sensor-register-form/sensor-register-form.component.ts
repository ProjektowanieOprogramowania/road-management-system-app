import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Sensor, SensorsService} from "../../../services/generated";

@Component({
  selector: 'app-sensor-register-form',
  templateUrl: './sensor-register-form.component.html',
  styleUrls: ['./sensor-register-form.component.scss']
})
export class SensorRegisterFormComponent implements OnInit {

  name: string = "";
  serialNumber: string = "";
  selectedSensorType: string = ""
  active: boolean = true;
  localizationString: string = ""

  sensorNameValid: boolean = true;
  serialNumberValid: boolean = true;
  sensorTypes: string[]

  selectedOptions: any;
  selectedPosition: any;
  selectedLocation: any[] = [];
  isAddingNodesModeOn: boolean = false;
  disabled: boolean = true;

  constructor(private sensorService: SensorsService, private http: HttpClient) {
    this.sensorTypes = ["A", "B"]
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
    this.removePolish()
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
  this.getReverseGeoCode(lat, lon)
    .subscribe(
    products => {
      this.localizationString = products.results[Object.keys(products.results).length - 2].formatted_address.split(",")[0];
    });
  }

  removePolish(){
    const letters     = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'];
    const replacement = ['a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z'];

    let result = this.localizationString;
    console.log(this.localizationString)
    for (let i = 0; i < letters.length; ++i) {
        result = result.replace(letters[i], replacement[i]).replace("-","");
    }
    
    this.localizationString = result
  }

  submit(){
    // const sensor: Sensor = {
    //   name: this.name,
    //   localization: this.selectedLocation[0].position,
    //   voivodeship: "",
    //   serialNumber: this.serialNumber,
    //   sensorType: this.selectedSensorType,
    //   enabled: this.active,
    // }
    // this.validateForm()
    // if(this.sensorNameValid&&this.serialNumberValid&&this.selectedLocation.length === 1) {

    // }
  }

}
