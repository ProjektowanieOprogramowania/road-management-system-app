import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubscriptionOrderModel} from "../../../common/models/subscription.model";
import {Router} from "@angular/router";
import {PaymentMethod, SubscriptionModel} from "../../../services/generated";

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.scss']
})
export class SubscriptionModalComponent implements OnInit {

  @Input() subscriptionOrderData: SubscriptionModel | undefined;
  @Input() display = false;

  @Output() hide = new EventEmitter();

  paymentMethods = PaymentMethod;

  selectedPaymentMethod: PaymentMethod | undefined;

  displayUnselectedPaymentMethodError = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onHide() {
    this.hide.emit();
  }

  onPay() {
    if (this.selectedPaymentMethod === undefined) {
      this.displayUnselectedPaymentMethodError = true;
      return;
    }

    // this.router.navigate(['/payments/waiting',{
    //   whenSuccess:'/subscriptions/subscribe-success/0', whenFailure:'/subscriptions/subscribe' }], {
    //   queryParams: {
    //     chargeId: 123,
    //     methodId: this.selectedPaymentMethod.
    //   }
    // })
  }

  onSelectPaymentMethodButtonClick() {
    this.displayUnselectedPaymentMethodError = false;
  }


}
