import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tariff-create-form',
  templateUrl: './tariff-create-form.component.html',
  styleUrls: ['./tariff-create-form.component.scss']
})
export class TariffCreateFormComponent implements OnInit {

  active : boolean = true;
  name: string = "";
  prices: Map<string, number> = new Map;

  addPriceName: string = ""
  addPriceValue: number | undefined

  nameFieldValid: boolean = true;
  priceFieldValid: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  getArray(map: Map<string, number>) {
    return Array.from(map, ([name, value]) => ({ name, value }));
  }

  validateInput() {
    if(this.addPriceName === null || this.addPriceName.length === 0) {
      this.nameFieldValid = false
    } else {
      this.nameFieldValid = true
    }
    console.log(this.addPriceValue)
    if(!this.addPriceValue) {
      this.priceFieldValid = false
    } else {
      this.priceFieldValid = true;
    }
  }

  newRow() {
    this.validateInput()
    if(this.nameFieldValid && this.priceFieldValid && this.addPriceValue) {
      this.prices.set(this.addPriceName, this.addPriceValue);
    }
  }
}
