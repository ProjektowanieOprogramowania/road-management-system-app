import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ObjectUnsubscribedError, retry, shareReplay} from "rxjs";
import {Tariff} from "../common/models/tariff";
import {TariffSimplified} from "./generated";

@Injectable({
  providedIn: 'root'
})
export class TariffService {

  constructor(private http: HttpClient) {
  }

  getTariff(id: number) {
    return this.http.get("http://localhost:8080/tariff/" + id)
      .pipe(
        shareReplay(),
        retry(5)
      );
  }

  getAllTariffs() {
    return this.http.get("http://localhost:8080/tariff")
      .pipe(
        shareReplay(),
        retry(5)
      );
  }

  addTariff(tariff: Tariff) {
    return this.http.post<Tariff>('/http://localhost:8080/roads', JSON.stringify(tariff))
      .pipe(
        shareReplay(),
        retry(5)
      );
  }

  editTariff(tariff: Tariff) {
    return this.http.put<Tariff>("/http://localhost:8080/roads" + tariff.id, JSON.stringify(tariff))
      .pipe(
        shareReplay(),
        retry(5)
      );
  }

  deleteTariff(tariff: Tariff) {
    return this.http.delete("http://localhost:8080/tariff/" + tariff.id)
      .pipe(
        shareReplay(),
        retry(5)
      );
  }
}
