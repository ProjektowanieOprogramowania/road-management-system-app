import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Toll} from "../../../common/models/toll";
import {TollsService} from "../../../services/tolls.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-not-paid-tolls',
  templateUrl: './not-paid-tolls.component.html',
  styleUrls: ['./not-paid-tolls.component.scss'],
  providers: [MessageService]
})
export class NotPaidTollsComponent implements OnInit, OnDestroy {
  tolls: Toll[] | undefined;

  selectedToll: Toll | undefined;

  subscriptions: Subscription = new Subscription();

  orderNumber = 1;

  constructor(private tollsService: TollsService, private messageService: MessageService) {
    this.isRowSelectable = this.isRowSelectable.bind(this);
  }

  ngOnInit() {
    const sub = this.tollsService.getNotPaidTolls()
      .subscribe(data => {
          data.forEach(x => x.orderNumber = this.orderNumber++);
          this.tolls = data;
        }
      );
    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onRowSelect(event: any) {
    this.messageService.add({severity: 'info', summary: 'Product Selected', detail: event.data.name});
  }

  onRowUnselect(event: any) {
    this.messageService.add({severity: 'info', summary: 'Product Unselected', detail: event.data.name});
  }

  isRowSelectable(event: any) {
    return !this.isOutOfStock(event.data);
  }

  isOutOfStock(data: any) {
    return data.inventoryStatus === 'OUTOFSTOCK';
  }
}
