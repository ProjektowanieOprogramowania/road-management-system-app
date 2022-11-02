import { Injectable } from '@angular/core';
import {TariffsHttpClientMockService} from "../common/mocks/tariffs/tariffs-http-client-mock.service";
import {retry, shareReplay} from "rxjs";
import {Tariff} from "../common/models/tariff";

@Injectable({
  providedIn: 'root'
})
export class TariffService {

  constructor(private http: TariffsHttpClientMockService) {
  }

  getTariff(id: number) {
    console.log(id)
    return this.http.getById(id)
      .pipe(
        shareReplay(),
        retry(5)
      );
  }

  getAllTariffs() {
    return this.http.getAll()
      .pipe(
        shareReplay(),
        retry(5)
      );
  }

  addTariff(tariff: Tariff) {
    return this.http.addTariff(tariff)
      .pipe(
        shareReplay(),
        retry(5)
      );
  }

  editTariff(tariff: Tariff) {
    return this.http.editTariff(tariff)
      .pipe(
        shareReplay(),
        retry(5)
      );
  }

  deleteTariff(tariff: Tariff) {
    return this.http.deleteTariff(tariff)
      .pipe(
        shareReplay(),
        retry(5)
      );
  }
}
