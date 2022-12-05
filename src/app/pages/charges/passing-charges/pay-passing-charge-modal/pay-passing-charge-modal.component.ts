import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PassingChargeModel} from "../../../../common/models/passingCharge.model";
import {PaymentMethod} from "../../../../services/generated";
import {PaymentMethodModel, PaymentMethodModels} from "../../../../common/models/paymentMethod.model";

@Component({
  selector: 'app-pay-passing-charge-modal',
  templateUrl: './pay-passing-charge-modal.component.html',
  styleUrls: ['./pay-passing-charge-modal.component.scss']
})
export class PayPassingChargeModalComponent implements OnInit {

  @Input() passingCharge?: PassingChargeModel;
  @Input() display = false;

  @Output() hide = new EventEmitter();
  @Output() pay = new EventEmitter<PaymentMethod>();

  paymentMethods = PaymentMethodModels;

  selectedPaymentMethod?: PaymentMethodModel;

  displayUnselectedPaymentMethodError = false;

  constructor() {
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

    this.pay.emit(this.selectedPaymentMethod.value);
  }

  onSelectPaymentMethodButtonClick() {
    this.displayUnselectedPaymentMethodError = false;
  }
}
