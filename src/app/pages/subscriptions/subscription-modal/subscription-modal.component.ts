import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {SubscriptionModel} from "../../../services/generated";
import {PaymentMethodModel, PaymentMethodModels} from "../../../common/models/paymentMethod";

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.scss'],
})
export class SubscriptionModalComponent implements OnInit {

  @Input() subscriptionOrderData: SubscriptionModel | undefined;
  @Input() display = false;

  @Output() hide = new EventEmitter();

  paymentMethods = PaymentMethodModels;

  selectedPaymentMethod: PaymentMethodModel | undefined;

  displayUnselectedPaymentMethodError = false;

  constructor(private router: Router) {
  }

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
