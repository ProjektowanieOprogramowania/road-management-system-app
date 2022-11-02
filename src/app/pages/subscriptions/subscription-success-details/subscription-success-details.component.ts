import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SubscriptionsService} from "../../../services/subscriptions.service";
import {SubscriptionSuccessModel} from "../../../common/models/subscription.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-subscription-success-details',
  templateUrl: './subscription-success-details.component.html',
  styleUrls: ['./subscription-success-details.component.scss']
})
export class SubscriptionSuccessDetailsComponent implements OnInit {


  subData: SubscriptionSuccessModel | undefined;

  subscription = new Subscription();

  constructor(private router: Router,
              private subService: SubscriptionsService) {

    this.subscription.add(
      this.subService.getSuccessSubscription()
        .subscribe(
          next => {
            this.subData = next;
          }
        )
    );
  }

  ngOnInit(): void {
  }

  onBack(){
    this.router.navigate(['/subscriptions/subscribe']);
  }

}
