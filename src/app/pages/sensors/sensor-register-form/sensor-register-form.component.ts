import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor-register-form',
  templateUrl: './sensor-register-form.component.html',
  styleUrls: ['./sensor-register-form.component.scss']
})
export class SensorRegisterFormComponent implements OnInit {

//   export interface Sensor {
//     id?: number;
//     name: string;                    done
//     localization: Localization;
//     voivodeship: Voivodeship;
//     serialNumber: string;            done
//     sensorType: SensorType;          ok
//     enabled: boolean;                done
//     webhookUrl?: string;
// }

  name: string = "";
  serialNumber: string = "";
  selectedSensorType: string = ""
  active: boolean = true;
  webhookUrl: string = "";
  selectedOption: any;

  sensorNameValid: boolean = true;
  serialNumberValid: boolean = true;
  sensorTypes: string[]

  selectedOption: any;

  constructor() {
    this.sensorTypes = [
      "A", "B", "C"
    ]
  }

  ngOnInit(): void {
    this.selectedOption = {
      center: new google.maps.LatLng(52.1645673, 19.9203192),
      zoom: 7.3
    }
  }

  validateForm() {
    if(!this.name || this.name.length === 0) {
      this.sensorNameValid = false;
    } else {
      this.sensorNameValid = true;
    }
  }

}
