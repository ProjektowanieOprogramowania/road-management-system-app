import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ChargesService} from "../../../services/generated";
import {ChargeModel} from "../../../common/models/charge.model";

@Component({
  selector: 'app-charges-history',
  templateUrl: './charges-history.component.html',
  styleUrls: ['./charges-history.component.scss']
})
export class ChargesHistoryComponent implements OnInit {

  charges?: ChargeModel[];
  selectedCharge?: ChargeModel;
  chargeOrderNumber = 1;

  displayChargeDetailsModal = false;

  subscriptions: Subscription = new Subscription();

  constructor(private chargesService: ChargesService) {
  }

  ngOnInit() {
    const sub = this.chargesService.getUsersCharges('1')
      .subscribe(data => {
          data.map(c => (
            {
              ...c,
              orderNumber: this.chargeOrderNumber++
            }
          ));
          this.charges = data;
        }
      );
    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onRowSelect() {
    this.showTollDetailsModal();
  }

  showTollDetailsModal() {
    this.displayChargeDetailsModal = true;
  }

  onTollDetailsModalHide() {
    this.selectedCharge = undefined;
    this.displayChargeDetailsModal = false;
  }
}
