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

  getArray(map: Map<string, number>) {
    return Array.from(map, ([name, value]) => ({ name, value }));
  }

  onRowSelect(event: any, tariffs: any) {
    console.log(tariffs)
    this.displayTariffDetails = true;

  }

  onDetailsHide() {
    this.selectedTariff = undefined;
  }

  onDeleteDialogHide() {
    this.selectedTariff = undefined;
  }

  handleShowDelete(event: any) {
    this.selectedTariff = event
    this.displayTariffDelete = true
  }

  handleDelete(tariff: Tariff) {
    this.tariffs = undefined
    if(tariff.id) {
      const sub = this.tariffService.deleteTariff(tariff.id)
        .subscribe(data => {
            this.tariffs = data;
          }
        );
      this.subscriptions.add(sub);
      this.selectedTariff = undefined
      this.displayTariffDelete = false
    }
  }
}
