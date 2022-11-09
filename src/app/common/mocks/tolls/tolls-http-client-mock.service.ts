import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PassingChargesMock} from "./passingChargesMock";
import {PassingCharge} from "../../../services/generated";

@Injectable({
  providedIn: 'root'
})
export class TollsHttpClientMockService {

  constructor() {
  }

  getById(id: number) {
    const res = PassingChargesMock.find(x => x.id == id);
    return new Observable<PassingCharge>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 100)
    })
  }

  getAll() {
    const res = PassingChargesMock;
    return new Observable<PassingCharge[]>(sub => {
      setTimeout(() => {
        sub.next(res);
        sub.complete();
      }, 100)
    })
  }
}
