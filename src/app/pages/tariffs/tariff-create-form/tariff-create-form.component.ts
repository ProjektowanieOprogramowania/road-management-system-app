import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TariffService} from "../../../services/tariff.service";

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

  tariffNameValid: boolean = true;

  constructor(private tariffService: TariffService, private router: Router) { }

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

  deletePrice(any: string) {
    this.prices.delete(any)
  }
  createSubmit(){
    const tariff = {
      id: 0,
      active: this.active,
      name: this.name,
      prices: this.prices,
    }

    this.tariffService.addTariff(tariff)
    this.router.navigate(['/tariffs']);
  }
}
