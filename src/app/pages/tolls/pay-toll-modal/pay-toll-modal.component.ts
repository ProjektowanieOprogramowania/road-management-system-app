import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentMethod, PaymentMethods} from "../../../common/models/paymentMethod";
import {Router} from "@angular/router";
import {PassingChargeModel} from "../../../common/models/passingChargeModel";

@Component({
  selector: 'app-pay-toll-modal',
  templateUrl: './pay-toll-modal.component.html',
  styleUrls: ['./pay-toll-modal.component.scss']
})
export class PayTollModalComponent implements OnInit {

  @Input() toll: PassingChargeModel | undefined;
  @Input() display = false;

  @Output() hide = new EventEmitter();

  paymentMethods = PaymentMethods;

  selectedPaymentMethod: PaymentMethod | undefined;

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

    this.router.navigate(['/payments/waiting', {
    whenSuccess:'/passingCharges/history', whenFailure:'/passingCharges/' }],
      {
        queryParams: {
          chargeId: this.toll?.id,
          methodId: this.selectedPaymentMethod.id
        }
      },

    )
  }

  onSelectPaymentMethodButtonClick() {
    this.displayUnselectedPaymentMethodError = false;
  }
}
