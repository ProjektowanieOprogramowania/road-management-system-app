import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from "primeng/api";
import {Tariff, TariffsService} from "../../../services/generated";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tariff-create-form',
  templateUrl: './tariff-create-form.component.html',
  styleUrls: ['./tariff-create-form.component.scss'],
  providers: [MessageService]

})
export class TariffCreateFormComponent implements OnInit {
  active : boolean = true;
  name: string = "";
  prices: Record<string, number> = {};

  tariffNameValid: boolean = true;
  subscriptions: Subscription = new Subscription();

  priceMotorcycle: number | undefined
  priceCar: number | undefined
  priceTruck: number | undefined
  priceOther: number | undefined
  priceCarValid = true;
  priceMotorcycledValid = true;
  priceTruckValid = true;
  priceOtherValid = true;


  constructor(private tariffService: TariffsService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  getArray(map: any) {
    const newArray = Object.entries(map).map(([k,v]) => ({
      name: k,
      value: v
    }))
    return newArray
  }

  newRow() {
    if (this.priceCar) {
      this.prices["car"] = this.priceCar
    }
    if (this.priceMotorcycle) {
      this.prices["motorcycle"] = this.priceMotorcycle
    }
    if (this.priceTruck) {
      this.prices["truck"] = this.priceTruck
    }
    if (this.priceOther) {
      this.prices["other"] = this.priceOther
    }
  }

  deletePrice(any: string) {
    delete this.prices[any]
  }

  validateForm() {
    let result = true
    if(this.priceCar) {
      this.priceCarValid = true
    }
    else {
      this.priceCarValid = false
      result = false;
    }
    if(this.priceMotorcycle) {
      this.priceMotorcycledValid = true
    }
    else {
      this.priceMotorcycledValid = false
      result = false;
    }
    if(this.priceTruck) {
      this.priceTruckValid = true
    }
    else {
      this.priceTruckValid = false
      result = false;
    }
    if(this.priceOther) {
      this.priceOtherValid = true
    }
    else {
      this.priceOtherValid = false
      result = false;
    }
    if(!this.name || this.name.length === 0) {
      this.tariffNameValid = false;
      result = false;
    } else {
      this.tariffNameValid = true;
    }
    return result
  }

  createSubmit(){
    this.newRow()
    const tariff: Tariff = {
      id: 0,
      active: this.active,
      name: this.name,
      prices: this.prices,
    }
    this.validateForm()
    if(this.validateForm() && this.tariffNameValid) {
      const sub = this.tariffService.addTariff(tariff)
        .subscribe(data => {
            console.log("Added", data)
            this.router.navigate(['/tariffs']);
          }
        );
      this.subscriptions.add(sub);
    }
  }
}
