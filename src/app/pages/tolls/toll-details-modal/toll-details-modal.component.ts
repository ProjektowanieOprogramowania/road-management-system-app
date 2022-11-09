import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PassingChargeModel} from "../../../common/models/passingChargeModel";

@Component({
  selector: 'app-toll-details-modal',
  templateUrl: './toll-details-modal.component.html',
  styleUrls: ['./toll-details-modal.component.scss']
})
export class TollDetailsModalComponent implements OnInit {

  @Input() toll: PassingChargeModel | undefined;
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
