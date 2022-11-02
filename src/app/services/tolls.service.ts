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
        map(res => res.filter(x => x.payment === null)
          .sort((a, b) => a.ride.date.getTime() - b.ride.date.getTime())),
        retry(5)
      );
  }

  getPaidTolls() {
    return this.http.getAll()
      .pipe(
        shareReplay(),
        map(res => res.filter(x => x.payment !== null)
          .sort((a, b) => b.payment!.date.getTime() - a.payment!.date.getTime())),
        retry(5)
      );
  }
}
