import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auction} from "../../../services/generated";

@Component({
  selector: 'app-auction-modify',
  templateUrl: './auction-modify.component.html',
  styleUrls: ['./auction-modify.component.scss']
})
export class AuctionModifyComponent implements OnInit {

  auctionForm: FormGroup
  minDateValue = new Date();

  constructor(private fb: FormBuilder) {

    this.auctionForm = this.fb.group({
      name: ['', Validators.required],
      startingPrice: [null, [Validators.required, Validators.min(0)]],
      dueDate: [new Date(), Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get auctionName() {
    return this.auctionForm.get('name')!;
  }

  get auctionStartingPrice() {
    return this.auctionForm.get('startingPrice')!;
  }

  get auctionDueDate() {
    return this.auctionForm.get('dueDate')!;
  }

  get auctionDescription() {
    return this.auctionForm.get('description')!;
  }

  onSubmit() {
    this.auctionForm.markAllAsTouched();

    const auction: Auction = {
      name: this.auctionName.value,
      staringPrice: this.auctionStartingPrice.value,
      dueDate: this.auctionDueDate.value,
      description: this.auctionDescription.value,
      isOpen: true
    }
  }
}
