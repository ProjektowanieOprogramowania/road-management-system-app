import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {TollsMock} from "./tollsMock";
import {Toll} from "../../models/toll";

@Injectable({
  providedIn: 'root'
})
export class TollsHttpClientMockService {

  constructor() {
  }

  getById(id: number) {
    const res = TollsMock.find(x => x.id == id);
    return new Observable<Toll>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 100)
    })
  }

  getAll() {
    const res = TollsMock;
    return new Observable<Toll[]>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 100)
    })
  }
}
