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

  sensorNameValid: boolean = true;
  serialNumberValid: boolean = true;
  sensorTypes: string[]

  constructor() {
    this.sensorTypes = [
      "A", "B", "C"
    ]
  }

  ngOnInit(): void {
  }

  validateForm() {
    if(!this.name || this.name.length === 0) {
      this.sensorNameValid = false;
    } else {
      this.sensorNameValid = true;
    }
  }

}
