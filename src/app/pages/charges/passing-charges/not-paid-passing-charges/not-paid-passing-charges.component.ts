import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PassingChargesService, PaymentMethod} from "../../../../services/generated";
import {PassingChargeModel} from "../../../../common/models/passingCharge.model";
import {UserProfileService} from "../../../../services/user-profile.service";
import {ToPassingChargeModel} from "../../../../common/utils/passingChargeConverter";

@Component({
  selector: 'app-not-paid-passing-charges',
  templateUrl: './not-paid-passing-charges.component.html',
  styleUrls: ['./not-paid-passing-charges.component.scss'],
})
export class NotPaidPassingChargesComponent implements OnInit, OnDestroy {
  passingCharges?: PassingChargeModel[];
  selectedPassingCharge?: PassingChargeModel;
  passingChargeOrderNumber = 1;

  displayPayPassingChargeModal = false;

  subscriptions: Subscription = new Subscription();

  uuid = '';

  isPaying = false;
  paymentMethod?: PaymentMethod;

  constructor(
    private passingChargesService: PassingChargesService,
    private userService: UserProfileService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.uuid = this.userService.getUserId();
    const sub = this.passingChargesService.getNotPaidPassingCharges(this.uuid)
      .subscribe(data => {
          this.passingCharges = data.map(ps => ToPassingChargeModel(ps, this.passingChargeOrderNumber++));
        }
      );
    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onRowSelect(event: any) {
    this.showPayTollModal();
  }

  showPayTollModal() {
    this.displayPayPassingChargeModal = true;
  }

  onPayTollModalHide() {
    this.selectedPassingCharge = undefined;
    this.displayPayPassingChargeModal = false;
  }

  onPay(paymentMethod: PaymentMethod) {
    this.isPaying = true;
    this.paymentMethod = paymentMethod;
  }

  onFail() {
    this.isPaying = false;
    const passingChargeId = this.route.snapshot.queryParamMap.get('passingChargeId');
    if (passingChargeId) {
      this.selectedPassingCharge = this.passingCharges?.find(ps => ps.id === Number.parseInt(passingChargeId));
      this.displayPayPassingChargeModal = true;
    }
  }
}
