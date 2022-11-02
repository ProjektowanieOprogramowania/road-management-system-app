import { Component, OnInit } from '@angular/core';
import {Toll} from "../../../common/models/toll";
import {Subscription} from "rxjs";
import {TollsService} from "../../../services/tolls.service";

@Component({
  selector: 'app-tolls-history',
  templateUrl: './tolls-history.component.html',
  styleUrls: ['./tolls-history.component.scss']
})
export class TollsHistoryComponent implements OnInit {

  tolls: Toll[] | undefined;
  selectedToll: Toll | undefined;
  tollOrderNumber = 1;

  displayTollDetailsModal = false;

  subscriptions: Subscription = new Subscription();

  constructor(private tollsService: TollsService) {
  }

  ngOnInit() {
    const sub = this.tollsService.getPaidTolls()
      .subscribe(data => {
          data.forEach(x => x.orderNumber = this.tollOrderNumber++);
          this.tolls = data;
        }
      );
    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onRowSelect(event: any) {
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
