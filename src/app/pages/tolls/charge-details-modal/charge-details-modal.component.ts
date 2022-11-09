import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChargeModel} from "../../../common/models/charge.model";

@Component({
  selector: 'app-charge-details-modal',
  templateUrl: './charge-details-modal.component.html',
  styleUrls: ['./charge-details-modal.component.scss']
})
export class ChargeDetailsModalComponent implements OnInit {

  @Input() charge?: ChargeModel;
  @Input() display = false;

  @Output() hide = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onHide() {
    this.hide.emit();
  }

  onOk() {
    this.hide.emit();
  }
}
