import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {PaymentMethod} from "../../../services/generated";
import {PaymentMethodModel, PaymentMethodModels} from "../../../common/models/paymentMethod";
import {SubscriptionModel} from "../../../common/models/subscription.model";

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.scss'],
})
export class SubscriptionModalComponent implements OnInit {

  @Input() subscriptionOrderData: SubscriptionModel | undefined;
  @Input() display = false;

  @Output() hide = new EventEmitter();
  @Output() onPaymentFired = new EventEmitter<PaymentMethod>();

  paymentMethods = PaymentMethodModels;

  selectedPaymentMethodLegacy: PaymentMethod | undefined;

  selectedPaymentMethod: PaymentMethodModel | undefined;

  displayUnselectedPaymentMethodError = false;

  isPaymentWaiting = true;

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

    this.selectedPaymentMethodLegacy = this.selectedPaymentMethod.value;
    this.onPaymentFired.emit(this.selectedPaymentMethodLegacy);
  }

  onSelectPaymentMethodButtonClick() {
    this.displayUnselectedPaymentMethodError = false;
  }
}
