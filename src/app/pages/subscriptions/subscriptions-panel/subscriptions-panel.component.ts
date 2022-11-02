import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SubscriptionsService} from "../../../services/subscriptions.service";
import {AvailableSubscriptionModel} from "../../../common/models/subscription.model";

@Component({
  selector: 'app-subscriptions-panel',
  templateUrl: './subscriptions-panel.component.html',
  styleUrls: ['./subscriptions-panel.component.scss']
})
export class SubscriptionsPanelComponent implements OnInit {

  //rxjs subscription
  subscription = new Subscription();

  availableSubs: AvailableSubscriptionModel[] = [];

  //forms
  selectedAvailableSubs: AvailableSubscriptionModel[] = []
  fromDate!: Date;
  toDate!: Date;

  //calculates
  priceToPay = 0;

  //validate
  minDate = new Date();

  constructor(private subService: SubscriptionsService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.subService.getAvailableSubscriptions().subscribe(
        e => {
          this.availableSubs = e;
        }));
  }

  onInput(): void{
    console.log('change');
    //console.log(this.selectedAvailableSubs.length > 0 && this.fromDate !== undefined && this.toDate !== undefined);
    // console.log(this.rangeDates);
    if(this.selectedAvailableSubs.length > 0 && this.fromDate !== undefined && this.toDate !== undefined){
      this.calculatePrice();
    } else{
      this.priceToPay = 0;
    }
  }

  private calculatePrice(): void{
    let finalPrice = 0;
    const daysRange = (this.toDate.getTime() - this.fromDate.getTime()) / (1000*3600*24);
    this.selectedAvailableSubs.forEach(sub => {
      finalPrice += sub.price * daysRange;
    });

    this.priceToPay = finalPrice;
  }



}
