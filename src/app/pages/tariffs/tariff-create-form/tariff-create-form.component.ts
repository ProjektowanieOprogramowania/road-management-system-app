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
  addPriceValue: number = 0

  constructor() { }

  ngOnInit(): void {
  }

  getArray(map: Map<string, number>) {
    return Array.from(map, ([name, value]) => ({ name, value }));
  }

  addPrice() {
    this.prices.set(this.addPriceName, this.addPriceValue);
  }

  deletePrice(any: string) {
    this.prices.delete(any)
  }
}