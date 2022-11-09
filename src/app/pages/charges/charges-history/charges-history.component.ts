import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ChargesService} from "../../../services/generated";
import {ChargeModel} from "../../../common/models/charge.model";
import {UserProfileService} from "../../../services/user-profile.service";
import {ToChargeModel} from "../../../common/utils/chargeConverter";

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

  uuid = '';

  constructor(
    private chargesService: ChargesService,
    private userService: UserProfileService) {
  }

  ngOnInit() {
    this.uuid = this.userService.getUserId();
    const sub = this.chargesService.getUsersCharges(this.uuid)
      .subscribe(data => {
          this.charges = data.filter(c => c.payment)
            .map(c => ToChargeModel(c, this.chargeOrderNumber++));
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
