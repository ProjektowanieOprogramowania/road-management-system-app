import {Component, OnDestroy, OnInit} from '@angular/core';
import {Toll} from "../../../common/models/toll";
import {TollsService} from "../../../services/tolls.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-not-paid-tolls',
  templateUrl: './not-paid-tolls.component.html',
  styleUrls: ['./not-paid-tolls.component.scss'],
})
export class NotPaidTollsComponent implements OnInit, OnDestroy {
  tolls: Toll[] | undefined;
  selectedToll: Toll | undefined;
  tollOrderNumber = 1;

  displayPayTollModal = false;

  subscriptions: Subscription = new Subscription();

  constructor(private tollsService: TollsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const sub = this.tollsService.getNotPaidTolls()
      .subscribe(data => {
          data.forEach(x => x.orderNumber = this.tollOrderNumber++);
          this.tolls = data;
        }
      );
    this.subscriptions.add(sub);

    const tollId = this.route.snapshot.queryParamMap.get('chargeId');

    if (tollId != null) {
      const sub = this.tollsService.getToll(Number.parseInt(tollId))
        .subscribe(data => {
            this.selectedToll = data;
            this.displayPayTollModal = true;
          }
        );
      this.subscriptions.add(sub);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onRowSelect(event: any) {
    this.showPayTollModal();
  }

  showPayTollModal() {
    this.displayPayTollModal = true;
  }

  onPayTollModalHide() {
    this.selectedToll = undefined;
    this.displayPayTollModal = false;
  }
}