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
  addPriceName: string = ""
  addPriceValue: number | undefined
  nameFieldValid: boolean = true;
  priceFieldValid: boolean = true;

  tariffNameValid: boolean = true;
  tariffPricesValid: boolean = true;
  subscriptions: Subscription = new Subscription();

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
      this.prices[this.addPriceName] = this.addPriceValue
    }
  }

  deletePrice(any: string) {
    delete this.prices[any]
  }

  validateForm() {
    if(!this.prices || this.getArray(this.prices).length === 0) {
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
    const tariff: Tariff = {
      id: 0,
      active: this.active,
      name: this.name,
      prices: this.prices,
    }
    this.validateForm()
    if(this.tariffPricesValid && this.tariffNameValid) {
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
