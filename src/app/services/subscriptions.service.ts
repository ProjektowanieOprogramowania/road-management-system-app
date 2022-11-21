// import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {Observable} from "rxjs";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class SubscriptionsService {
//
//   API_URL = '/assets/mocks/subscriptions'
//
//   constructor(private http: HttpClient) {
//
//   }
//
//   getAvailableSubscriptions(): Observable<any>{
//     return this.http.get<AvailableSubscriptionModel[]>
//     (`${this.API_URL}/sub-available.json`);
//   }
//
//   getSuccessSubscription(): Observable<any> {
//     return this.http.get<SubscriptionSuccessModel>(
//       `${this.API_URL}/sub-success.json`);
//   }
// }
