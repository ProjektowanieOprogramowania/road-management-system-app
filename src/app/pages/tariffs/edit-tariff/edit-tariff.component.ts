import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Tariff} from "../../../common/models/tariff";
import {TariffService} from "../../../services/tariff.service";
import {Subscription} from "rxjs";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-edit-tariff',
  templateUrl: './edit-tariff.component.html',
  styleUrls: ['./edit-tariff.component.scss'],
  providers: [MessageService]
})
export class EditTariffComponent implements OnInit {
  id: number | null | undefined;
  tariff: Tariff | undefined
  addPriceName: string = ""
  addPriceValue: number | undefined
  nameFieldValid: boolean = true;
  priceFieldValid: boolean = true;
  subscriptions: Subscription = new Subscription();
  tariffNameValid: boolean = true;
  tariffPricesValid: boolean = true;

  constructor(private route: ActivatedRoute, private tariffService: TariffService, private router: Router, private messageService: MessageService) { }

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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

  validateForm() {
    if(!this.tariff?.prices || this.tariff.prices.size === 0) {
      this.tariffPricesValid = false;
      this.messageService.add({key: 'tl', severity:'error', summary: 'Błąd', detail: 'Taryfikator musi zawierać prznajmniej wariant cenowy'});
    } else {
      this.tariffPricesValid = true;
    }
    if(!this.tariff?.name || this.tariff.name.length === 0) {
      this.tariffNameValid = false;
    } else {
      this.tariffNameValid = true;
    }
  }

  async editSubmit() {
    this.validateForm();
    if(this.tariffPricesValid && this.tariffNameValid) {
      if (this.tariff) {
        this.tariffService.editTariff(this.tariff)
        this.router.navigate(['/tariffs']);
      }
    }
  }
}
