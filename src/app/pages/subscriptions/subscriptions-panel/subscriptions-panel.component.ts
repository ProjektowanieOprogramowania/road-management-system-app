import {Component, OnInit} from '@angular/core';
import {Subscription, zip} from "rxjs";
import {Charge, Road, RoadsService, SubscriptionModel} from "../../../services/generated";
import {SubscriptionsService} from "../../../services/subscriptions.service";
import {AvailableSubscriptionModel, SubscriptionOrderModel} from "../../../common/models/subscription.model";
import {MessageService} from "primeng/api";
import {UserProfileService} from "../../../services/user-profile.service";

@Component({
  selector: 'app-subscriptions-panel',
  templateUrl: './subscriptions-panel.component.html',
  styleUrls: ['./subscriptions-panel.component.scss'],
  providers: [MessageService]
})
export class SubscriptionsPanelComponent implements OnInit {

  //rxjs subscription
  subscription = new Subscription();

  roads: Road[] = [];
  userId: string = '';

  //forms
  selectedRoads: Road[] = [];
  fromDate!: Date;
  toDate!: Date;

  subscriptionOrderData: SubscriptionModel ={
    roadsIds: [],
    subscriberId: ''
  }

  //calculates
  priceToPay = 0;
  displaySubDetailsModal = false;


  //validate
  minDate = new Date();

  constructor(private roadService: RoadsService,
              private messageService: MessageService,
              private userService: UserProfileService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.roadService.getAllRoads().subscribe(
        {
          next: value => this.roads = value,
          error: err => {
            this.messageService.add({severity:'error', summary:'Error roads', detail:err });
            console.error(err);
          }
        }
      )
    );

    this.userId = this.userService.getUserId();
  }

  onInput(): void{
    if(this.selectedRoads.length > 0 && this.fromDate !== undefined && this.toDate !== undefined){
      this.calculatePrice();
    } else{
      this.priceToPay = 0;
    }
  }

  private calculatePrice(): void{
    let finalPrice = 0;
    const daysRange = Math.round((this.toDate.getTime() - this.fromDate.getTime()) / (1000*3600*24));
    this.selectedRoads.forEach(sub => {
      finalPrice += sub.subscriptionPriceForOneDay * daysRange;
    });

    this.priceToPay = finalPrice;
  }

  onSubDetailsModalHide(){
    this.displaySubDetailsModal = false;
  }

  showSubDetailsModal(){

    if(this.priceToPay === 0){
      return;
    }

    let formRoadIds: number[] = [];

    if(this.selectedRoads){
      this.selectedRoads.forEach(value => {
        if(value.id !== undefined){
          formRoadIds.push(value.id);
        }});
    }

    const newCharge: Charge = {
      amount: this.priceToPay,
      userId: this.userId,
      paid: false
    };

    this.subscriptionOrderData = {
      roadsIds: formRoadIds,
      subscriptionFrom: this.fromDate.toISOString(),
      subscriptionTo: this.toDate.toISOString(),
      subscriberId: this.userId,
      charge: newCharge
    }

    this.displaySubDetailsModal = true;
  }


}
