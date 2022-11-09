import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {TollsMock} from "./tollsMock";
import {PassingCharge} from "../../../services/generated";

@Injectable({
  providedIn: 'root'
})
export class TollsHttpClientMockService {

  constructor() {
  }

  getById(id: number) {
    const res = TollsMock.find(x => x.id == id);
    return new Observable<PassingCharge>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 100)
    })
  }

  getAll() {
    const res = TollsMock;
    return new Observable<PassingCharge[]>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 100)
    })
  }
}
