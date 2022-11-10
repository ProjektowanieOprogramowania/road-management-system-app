import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
//import {SubscriptionsService} from "../../../services/subscriptions.service";
import {
  Road,
  RoadsService,
  SubscriptionModel,
  SubscriptionsService
} from "../../../services/generated";
import {SubscriptionSuccessModel} from "../../../common/models/subscription.model";
import {Observable, Subscription} from "rxjs";
import {UserProfileService} from "../../../services/user-profile.service";
import {dateFromArray} from "../../../common/utils/dateFromArray";

@Component({
  selector: 'app-subscription-success-details',
  templateUrl: './subscription-success-details.component.html',
  styleUrls: ['./subscription-success-details.component.scss']
})
export class SubscriptionSuccessDetailsComponent implements OnInit {


  subData: SubscriptionModel[] = [];

  subscription = new Subscription();

  roads: Road[] = [];
  roadMap: Map<number, string> = new Map();

  constructor(private router: Router,
              private subService: SubscriptionsService,
              private userService: UserProfileService,
              private roadService: RoadsService) {

  }

  ngOnInit(): void {
    const uuid = this.userService.getUserId();

    this.subscription.add(
      this.roadService.getAllRoads()
        .subscribe(
          next => {
            this.roadMap = this.convertRoadArrToMap(next);
          }
        )
    )

    this.subscription.add(
      this.subService.getSubscriptions(uuid)
        .subscribe(
          next => {
            this.subData = this.convertData(next);
          }
        )
    );
  }

  convertRoadArrToMap(arr: Road[]){
    const map:Map<number, string> = new Map();
    arr.forEach(road => {
      map.set(road.id!, road.name);
    });

    return map;
  }

  convertData(subs: SubscriptionModel[]): SubscriptionModel[]{
    let newSubs: SubscriptionModel[] = [];

    subs.forEach(value => {
      value.charge!.payment!.dateTime = dateFromArray(value.charge!.payment!.dateTime).toLocaleString();
      value.subscriptionFrom = new Date(value.subscriptionFrom!).toDateString();
      value.subscriptionTo = new Date(value.subscriptionTo!).toDateString();
      newSubs.push(value);
    });

    return newSubs;
  }

  onBack(){
    this.router.navigate(['/subscriptions/subscribe']);
  }

}

