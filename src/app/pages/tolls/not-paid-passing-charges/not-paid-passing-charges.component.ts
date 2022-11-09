import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PassingChargesService} from "../../../services/generated";
import {PassingChargeModel} from "../../../common/models/passingCharge.model";

@Component({
  selector: 'app-not-paid-passing-charges',
  templateUrl: './not-paid-passing-charges.component.html',
  styleUrls: ['./not-paid-passing-charges.component.scss'],
})
export class NotPaidPassingChargesComponent implements OnInit, OnDestroy {
  passingCharges: PassingChargeModel[] | undefined;
  selectedPassingCharge: PassingChargeModel | undefined;
  passingChargeOrderNumber = 1;

  displayPayPassingChargeModal = false;

  subscriptions: Subscription = new Subscription();

  constructor(private passingChargesService: PassingChargesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const sub = this.passingChargesService.getNotPaidPassingCharges('1')
      .subscribe(data => {
          data.map(ps => (
            {
              ...ps,
              orderNumber: this.passingChargeOrderNumber++
            }
          ));
          this.passingCharges = data;
        }
      );
    this.subscriptions.add(sub);

    const tollId = this.route.snapshot.queryParamMap.get('chargeId');

    if (tollId) {
      this.selectedPassingCharge = this.passingCharges?.find(ps => ps.id === Number.parseInt(tollId));
      this.displayPayPassingChargeModal = true;
    }
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
}
