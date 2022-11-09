import {Injectable} from '@angular/core';
import {TollsHttpClientMockService} from "../common/mocks/tolls/tolls-http-client-mock.service";
import {map, retry, shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TollsService {

  constructor(private http: TollsHttpClientMockService) {
  }

  getToll(id: number) {
    return this.http.getById(id)
      .pipe(
        shareReplay(),
        retry(5)
      );
  }

  getNotPaidTolls() {
    return this.http.getAll()
      .pipe(
        shareReplay(),
        map(res => res.filter(x => !x.charge.paid)
          .sort((a, b) => a.passing.dateTime.getTime() - b.passing.dateTime.getTime())),
        retry(5)
      );
  }

  getPaidTolls() {
    return this.http.getAll()
      .pipe(
        shareReplay(),
        map(res => res.filter(x => x.charge.paid)),
          // .sort((a, b) => b.charge.!.date.getTime() - a.payment!.date.getTime())),
        retry(5)
      );
  }
}
