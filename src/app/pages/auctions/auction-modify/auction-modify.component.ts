import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auction, AuctionsService} from "../../../services/generated";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {convertToAuctionModel} from "../../../common/models/auction.model";

@Component({
  selector: 'app-auction-modify',
  templateUrl: './auction-modify.component.html',
  styleUrls: ['./auction-modify.component.scss'],
  providers: [MessageService]
})
export class AuctionModifyComponent implements OnInit, OnDestroy {

  auctionForm: FormGroup

  subscription = new Subscription();

  minDateValue = new Date();

  auctionId?: number;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private auctionsService: AuctionsService) {

    this.auctionForm = this.fb.group({
      name: ['', Validators.required],
      startingPrice: [0, [Validators.required, Validators.min(0)]],
      dueDate: [new Date(), Validators.required],
      description: ['', Validators.required],
    });

    const auctionId = Number(this.route.snapshot.queryParamMap.get('id')) ?? undefined;

    this.subscription.add(
      this.auctionsService.getAuctionById(auctionId).subscribe({
        next: value => {
          //error staring price
          console.log({...convertToAuctionModel(value)})
          this.auctionForm.setValue({...convertToAuctionModel(value)});
        }
      })
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

    if (this.auctionForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Wprowadzono nieprawidłowe dane!'});
      return;
    }

    const auction: Auction = {
      name: this.auctionName.value,
      staringPrice: this.auctionStartingPrice.value,
      dueDate: this.auctionDueDate.value.getTime(),
      description: this.auctionDescription.value,
      isOpen: false
    }

    this.subscription.add(
      this.auctionsService.createAuction(auction).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Pomyślnie utworzono nowy przetarg!'});
          setTimeout(() => {
            this.router.navigate(['auctions']);
          }, 1000);
        }
      })
    );
  }
}
