import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TariffService} from "../../../services/tariff.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-tariff-create-form',
  templateUrl: './tariff-create-form.component.html',
  styleUrls: ['./tariff-create-form.component.scss'],
  providers: [MessageService]

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
  tariffPricesValid: boolean = true;

  constructor(private tariffService: TariffService, private router: Router, private messageService: MessageService) { }

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

  validateForm() {
    if(!this.prices || this.prices.size === 0) {
      this.tariffPricesValid = false;
      this.messageService.add({key: 'tl', severity:'error', summary: 'Błąd', detail: 'Taryfikator musi zawierać prznajmniej wariant cenowy'});
    } else {
      this.tariffPricesValid = true;
    }
    if(!this.name || this.name.length === 0) {
      this.tariffNameValid = false;
    } else {
      this.tariffNameValid = true;
    }
  }

  createSubmit(){
    const tariff = {
      id: 0,
      active: this.active,
      name: this.name,
      prices: this.prices,
    }
    this.validateForm()
    if(this.tariffPricesValid && this.tariffNameValid) {
      this.tariffService.addTariff(tariff)
      this.router.navigate(['/tariffs']);
    }
  }
}
