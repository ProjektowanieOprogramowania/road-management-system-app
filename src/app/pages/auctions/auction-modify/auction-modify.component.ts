import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auction, AuctionsService, Currency} from "../../../services/generated";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {convertToAuctionModel} from "../../../common/models/auction.model";
import {CurrencyModels} from "../../../common/models/currency.model";

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
  // selectedCurrency = CurrencyModels.find(c => c.code === 'PLN')!;
  currencies = CurrencyModels;
  auctionId: number;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private auctionsService: AuctionsService) {

    this.auctionForm = this.fb.group({
      name: ['', Validators.required],
      startingPrice: [0, [Validators.required, Validators.min(0)]],
      startingPriceCurrency: [CurrencyModels.find(c => c.code === 'PLN'), [Validators.required]],
      dueDate: [new Date(), Validators.required],
      description: ['', Validators.required],
    });

    this.auctionId = Number(this.route.snapshot.queryParamMap.get('id')) ?? undefined;

    if (this.auctionId) {
      this.subscription.add(
        this.auctionsService.getAuctionById(this.auctionId).subscribe({
          next: value => {
            const auctionToEdit = convertToAuctionModel(value);
            this.auctionForm.setValue({
              name: auctionToEdit.name,
              startingPrice: auctionToEdit.startingPrice,
              startingPriceCurrency: auctionToEdit.startingPriceCurrency,
              dueDate: auctionToEdit.dueDate,
              description: auctionToEdit.description
            });
          },
          error: () => {
            this.messageService.add({severity: 'error', summary: 'Server Error', detail: 'Auction edit loading error'});
          }
        }));
    }
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

  get auctionStartingPriceCurrency() {
    return this.auctionForm.get('startingPriceCurrency')!;
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

    const baseAuction = {
      name: this.auctionName.value,
      staringPrice: this.auctionStartingPrice.value,
      staringPriceCurrency: this.auctionStartingPriceCurrency.value.value,
      dueDate: this.auctionDueDate.value.getTime(),
      description: this.auctionDescription.value,
      isOpen: true,
    };

    if (!this.auctionId) {
      const auction: Auction = {
        ...baseAuction,
        localization: {
          latitude: 1,
          longitude: 1
        }
      }
      this.onAddAuction(auction);
    } else {
      const auction : Auction = {
        ...baseAuction,
        id: this.auctionId,
      }
      this.onEditAuction(auction);
    }
  }

  onAddAuction(auction: Auction) {
    this.subscription.add(
      this.auctionsService.createAuction(auction).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Pomyślnie utworzono nowy przetarg!'});
          setTimeout(() => {
            this.router.navigate(['auctions']);
          }, 1000);
        }
      }));
  }

  onEditAuction(auction: Auction) {
    this.subscription.add(
      this.auctionsService.updateAuction(auction).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Przetarg zaktualizowano pomyślnie!'});
          setTimeout(() => {
            this.router.navigate(['auctions']);
          }, 1000);
        }
      })
    );
  }

  onCancel() {
    this.router.navigate(['auctions']);
  }
}
