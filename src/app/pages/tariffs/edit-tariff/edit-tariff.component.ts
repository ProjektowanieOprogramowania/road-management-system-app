import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {MessageService} from 'primeng/api';
import {Tariff, TariffsService} from "../../../services/generated";

@Component({
  selector: 'app-edit-tariff',
  templateUrl: './edit-tariff.component.html',
  styleUrls: ['./edit-tariff.component.scss'],
  providers: [MessageService]
})
export class EditTariffComponent implements OnInit {
  id: number | null | undefined;
  tariff: Tariff | undefined
  subscriptions: Subscription = new Subscription();
  tariffNameValid: boolean = true;

  priceMotorcycle: number | undefined
  priceCar: number | undefined
  priceTruck: number | undefined
  priceOther: number | undefined
  priceCarValid = true;
  priceMotorcycledValid = true;
  priceTruckValid = true;
  priceOtherValid = true;

  constructor(private route: ActivatedRoute, private tariffService: TariffsService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id')) {
      this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
      const sub = this.tariffService.getTariff(this.id)
        .subscribe(data => {
            this.tariff = data;
            this.priceCar = data.prices["car"]
            this.priceMotorcycle = data.prices["motorcycle"]
            this.priceTruck = data.prices["truck"]
            this.priceOther = data.prices["other"]
          }
        );
      this.subscriptions.add(sub);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getArray(map: any) {
    const newArray = Object.entries(map).map(([k,v]) => ({
      name: k,
      value: v
    }))
    return newArray
  }

  newRow() {
    if(this.tariff) {
      if (this.priceCar) {
        this.tariff.prices["car"] = this.priceCar
      }
      if (this.priceMotorcycle) {
        this.tariff.prices["motorcycle"] = this.priceMotorcycle
      }
      if (this.priceTruck) {
        this.tariff.prices["truck"] = this.priceTruck
      }
      if (this.priceOther) {
        this.tariff.prices["other"] = this.priceOther
      }
    }
  }

  deletePrice(any: string) {
    if(this.tariff) {
      delete this.tariff.prices[any]
    }
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
    if(!this.tariff || this.tariff.name.length === 0) {
      this.tariffNameValid = false;
      result = false;
    } else {
      this.tariffNameValid = true;
    }
    return result
  }

  async editSubmit() {
    this.newRow()
    this.validateForm();
    if(this.validateForm() && this.tariffNameValid) {
      if (this.tariff && this.tariff.id) {
        const sub = this.tariffService.updateTariff(this.tariff.id, this.tariff)
          .subscribe(data => {
              console.log("Added", data)
              this.router.navigate(['/tariffs']);
            }
          );
      }
    }
  }
}
