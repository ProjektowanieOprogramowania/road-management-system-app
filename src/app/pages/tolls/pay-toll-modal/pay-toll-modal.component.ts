import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentMethod, PaymentMethods} from "../../../common/models/paymentMethod";
import {Toll} from "../../../common/models/toll";

@Component({
  selector: 'app-pay-toll-modal',
  templateUrl: './pay-toll-modal.component.html',
  styleUrls: ['./pay-toll-modal.component.scss']
})
export class PayTollModalComponent implements OnInit {

  @Input() toll: Toll | undefined;
  @Input() display = false;

  @Output() hide = new EventEmitter();

  paymentMethods = PaymentMethods;

  selectedPaymentMethod: PaymentMethod | undefined;

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
    }
  }

  onSelectPaymentMethodButtonClick() {
    this.displayUnselectedPaymentMethodError = false;
  }
}
