import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Tariff} from "../../../common/models/tariff";
import {TariffService} from "../../../services/tariff.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-tariff',
  templateUrl: './edit-tariff.component.html',
  styleUrls: ['./edit-tariff.component.scss']
})
export class EditTariffComponent implements OnInit {
  id: number | null | undefined;
  tariff: Tariff | undefined
  addPriceName: string = ""
  addPriceValue: number | undefined
  nameFieldValid: boolean = true;
  priceFieldValid: boolean = true;
  subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private tariffService: TariffService) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id')) {
      this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
      const sub = this.tariffService.getTariff(this.id)
        .subscribe(data => {
            this.tariff = data;
          }
        );
      this.subscriptions.add(sub);
    }
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
    if(this.nameFieldValid && this.priceFieldValid && this.addPriceValue && this.tariff) {
      this.tariff.prices.set(this.addPriceName, this.addPriceValue);
    }
  }

  deletePrice(any: string) {
    if(this.tariff) {
      this.tariff.prices.delete(any)
    }
  }

  log(e: any) {
    console.log(e)
  }
}
