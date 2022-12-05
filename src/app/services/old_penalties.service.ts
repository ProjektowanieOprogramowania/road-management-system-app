import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PenaltyCharge} from "./generated";

@Injectable({
  providedIn: 'root'
})
export class Old_penaltiesService {

  API_URL = '/assets/mocks/penalties'

  constructor(private http: HttpClient) {

  }

  getPenaltiesHistory(): Observable<any> {
    return this.http.get<PenaltyCharge[]>
    (`${this.API_URL}/penalties.json`);
  }
}
