import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {TollsService} from "../../../services/tolls.service";
import {PassingChargeModel} from "../../../common/models/passingChargeModel";

@Component({
  selector: 'app-passingCharges-history',
  templateUrl: './tolls-history.component.html',
  styleUrls: ['./tolls-history.component.scss']
})
export class TollsHistoryComponent implements OnInit {

  tolls: PassingChargeModel[] | undefined;
  selectedToll: PassingChargeModel | undefined;
  tollOrderNumber = 1;

  displayTollDetailsModal = false;

  subscriptions: Subscription = new Subscription();

  constructor(private tollsService: TollsService) {
  }

  ngOnInit() {
    const sub = this.tollsService.getPaidTolls()
      .subscribe(data => {
          // data.forEach(x => x.orderNumber = this.tollOrderNumber++);
          // this.tolls = data;
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
    this.displayTollDetailsModal = true;
  }

  onTollDetailsModalHide() {
    this.selectedToll = undefined;
    this.displayTollDetailsModal = false;
  }
}
