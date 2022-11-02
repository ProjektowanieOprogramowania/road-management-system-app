import { Component, OnInit, OnDestroy } from '@angular/core';
import {Tariff} from "../../../common/models/tariff";
import {Subscription} from "rxjs";
import {TariffService} from "../../../services/tariff.service";

@Component({
  selector: 'app-tariff.ts',
  templateUrl: './tariffs-list.component.html',
  styleUrls: ['./tariffs-list.component.scss']
})
export class TariffsListComponent implements OnInit, OnDestroy {
  tariffs: Tariff[] | undefined;
  selectedTariff: Tariff | undefined;
  subscriptions: Subscription = new Subscription();
  displayTariffDetails: boolean = false;
  constructor(private tariffService: TariffService) { }

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

  onRowSelect(event: any) {
    this.displayTariffDetails = true;
  }

  onRowUnselect(event: any) {
  }

  onDetailsHide() {
    this.selectedTariff = undefined;
  }
}
