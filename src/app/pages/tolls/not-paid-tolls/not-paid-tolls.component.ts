import {Component, OnDestroy, OnInit} from '@angular/core';
import {Toll} from "../../../common/models/toll";
import {TollsService} from "../../../services/tolls.service";
import {Subscription} from "rxjs";
import {PaymentMethod, PaymentMethods} from "../../../common/models/paymentMethod";

@Component({
  selector: 'app-not-paid-tolls',
  templateUrl: './not-paid-tolls.component.html',
  styleUrls: ['./not-paid-tolls.component.scss'],
})
export class NotPaidTollsComponent implements OnInit, OnDestroy {
  tolls: Toll[] | undefined;
  selectedToll: Toll | undefined;
  orderNumber = 1;

  displayTollDetails: boolean = false;

  paymentMethods = PaymentMethods;
  selectedPaymentMethod: PaymentMethod | undefined;

  displayUnselectedPaymentMethodError = false;

  subscriptions: Subscription = new Subscription();

  constructor(private tollsService: TollsService) {
  }

  ngOnInit() {
    const sub = this.tollsService.getNotPaidTolls()
      .subscribe(data => {
          data.forEach(x => x.orderNumber = this.orderNumber++);
          this.tolls = data;
        }
      );
    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onRowSelect(event: any) {
    this.showDetails();
  }

  onRowUnselect(event: any) {
  }

  showDetails() {
    this.displayTollDetails = true;
  }

  onDetailsHide() {
    this.selectedToll = undefined;
    this.selectedPaymentMethod = undefined;
    this.displayUnselectedPaymentMethodError = false;
  }

  onPay(event: any) {
    if (this.selectedPaymentMethod === undefined) {
      this.displayUnselectedPaymentMethodError = true;
    }
  }
}
