import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Toll} from "../../../common/models/toll";

@Component({
  selector: 'app-toll-details-modal',
  templateUrl: './toll-details-modal.component.html',
  styleUrls: ['./toll-details-modal.component.scss']
})
export class TollDetailsModalComponent implements OnInit {

  @Input() toll: Toll | undefined;
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
