import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PenaltyModel} from "../common/models/penalty.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Old_penaltiesService {

  API_URL = '/assets/mocks/penalties'

  constructor(private http: HttpClient) {

  }

  getPenaltiesHistory(): Observable<any> {
    return this.http.get<PenaltyModel[]>
    (`${this.API_URL}/penalties.json`);
  }

}
