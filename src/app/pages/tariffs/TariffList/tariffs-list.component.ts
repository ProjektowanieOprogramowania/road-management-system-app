import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {Tariff, TariffSimplified, TariffsService} from "../../../services/generated";

@Component({
  selector: 'app-tariff.ts',
  templateUrl: './tariffs-list.component.html',
  styleUrls: ['./tariffs-list.component.scss']
})
export class TariffsListComponent implements OnInit, OnDestroy {
  tariffs: TariffSimplified[] | undefined;
  selectedTariff: TariffSimplified | undefined;
  tariffDetails: Tariff | undefined;
  subscriptions: Subscription = new Subscription();
  displayTariffDetails: boolean = false;
  displayTariffDelete: boolean = false;
  constructor(private tariffService: TariffsService) { }

  ngOnInit() {
    const sub = this.tariffService.getAllTariffs()
      .subscribe(data => {
          this.tariffs = data;
        }
      );
    this.subscriptions.add(sub);
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

  onRowSelect(event: any) {
    if(this.selectedTariff && this.selectedTariff.id) {
      const sub = this.tariffService.getTariff(this.selectedTariff.id)
        .subscribe(data => {
            this.tariffDetails = data;
          }
        );
      this.subscriptions.add(sub);
    }
    this.displayTariffDetails = true;
  }

  onDetailsHide() {
    this.selectedTariff = undefined;
  }

  onDeleteDialogHide() {
    this.selectedTariff = undefined;
  }

  handleShowDelete(tariff: TariffSimplified) {
    if(tariff && tariff.id) {
      const sub = this.tariffService.getTariff(tariff.id)
        .subscribe(data => {
            this.tariffDetails = data;
          }
        );
      this.subscriptions.add(sub);
    }
    this.displayTariffDelete = true
  }

  handleDelete(tariff: Tariff) {
    this.tariffs = undefined
    let sub2 = undefined
    if (tariff.id) {
      const sub = this.tariffService.deleteTariff(tariff.id)
        .subscribe(data => {
            console.log("Deleted", data)
                sub2 = this.tariffService.getAllTariffs().subscribe(data => {
                this.tariffs = data;
              }
            );
          }
        );
      this.subscriptions.add(sub);
      this.subscriptions.add(sub2);
      this.selectedTariff = undefined
      this.tariffDetails = undefined
      this.displayTariffDelete = false
    }
  }
}
