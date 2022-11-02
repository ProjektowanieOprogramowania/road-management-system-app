import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {TariffsMock} from "./tariffsMock";
import {Tariff} from "../../models/tariff";

@Injectable({
  providedIn: 'root'
})
export class TariffsHttpClientMockService {

  constructor() {
  }

  getById(id: number) {
    const res = TariffsMock.find(x => x.id == id);
    return new Observable<Tariff>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 500)
    })
  }

  getAll() {
    const res = TariffsMock;
    return new Observable<Tariff[]>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 1000)
    })
  }

  addTariff(tariff: Tariff) {
    const res = TariffsMock;
    res.push(tariff)
    console.log(res)
    return new Observable<Tariff[]>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 1000)
    })
  }

  editTariff(tariff: Tariff) {
    const res = TariffsMock;
    res.filter(x => x.id !== tariff.id)
    res.push(tariff)
    return new Observable<Tariff[]>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 1000)
    })
  }

  deleteTariff(tariff: Tariff) {
    let res = TariffsMock;
    res = res.filter(x => x.id !== tariff.id)
    return new Observable<Tariff[]>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 1000)
    })
  }
}
