import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {PassingChargeModel} from "../../../../common/models/passingCharge.model";
import {PaymentMethod} from "../../../../services/generated";
import {PaymentMethodModel, PaymentMethodModels} from "../../../../common/models/paymentMethod";

@Component({
  selector: 'app-pay-passing-charge-modal',
  templateUrl: './pay-passing-charge-modal.component.html',
  styleUrls: ['./pay-passing-charge-modal.component.scss']
})
export class PayPassingChargeModalComponent implements OnInit {

  @Input() passingCharge?: PassingChargeModel;
  @Input() display = false;

  @Output() hide = new EventEmitter();

  paymentMethods = PaymentMethodModels;

  selectedPaymentMethod?: PaymentMethodModel;

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

    // this.router.navigate(['/payments/waiting', {
    //     whenSuccess: '/charges/history', whenFailure: '/charges/'
    //   }],
    //   {
    //     queryParams: {
    //       chargeId: this.passingCharge?.id,
    //       methodId:
    //     }
    //   },
    // )
  }

  onSelectPaymentMethodButtonClick() {
    this.displayUnselectedPaymentMethodError = false;
  }
}
