import { Component, OnInit, OnDestroy } from '@angular/core';
import {Tariff} from "../../common/models/tariff";
import {Subscription} from "rxjs";
import {TariffService} from "../../services/tariff.service";
import * as Console from "console";

@Component({
  selector: 'app-tariff.ts',
  templateUrl: './tariffs-list.component.html',
  styleUrls: ['./tariffs-list.component.scss']
})
export class TariffsListComponent implements OnInit, OnDestroy {
  tariffs: Tariff[] | undefined;

  selectedTariff: Tariff | undefined;

  subscriptions: Subscription = new Subscription();

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

  log(val: string) { console.log(val); }

  getArray(map: any[]) {
    console.log(Array.from(map, ([name, value]) => ({ name, value })))
    return Array.from(map, ([name, value]) => ({ name, value }));
  }

}
