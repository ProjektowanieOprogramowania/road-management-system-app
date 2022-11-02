import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubscriptionOrderModel} from "../../../common/models/subscription.model";
import {PaymentMethod, PaymentMethods} from "../../../common/models/paymentMethod";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.scss']
})
export class SubscriptionModalComponent implements OnInit {

  @Input() subscriptionOrderData: SubscriptionOrderModel | undefined;
  @Input() display = false;

  @Output() hide = new EventEmitter();

  paymentMethods = PaymentMethods;

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

    this.router.navigate(['/payments/waiting',{
      whenSuccess:'/subscriptions/subscribe-success/0', whenFailure:'/subscriptions/subscribe' }], {
      queryParams: {
        chargeId: 123,
        methodId: this.selectedPaymentMethod.id
      }
    })
  }

  onSelectPaymentMethodButtonClick() {
    this.displayUnselectedPaymentMethodError = false;
  }


}
