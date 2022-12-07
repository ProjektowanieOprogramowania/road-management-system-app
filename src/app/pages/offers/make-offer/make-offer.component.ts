import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auction, AuctionOffer, AuctionOfferService, AuctionsService} from "../../../services/generated";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-make-offer',
  templateUrl: './make-offer.component.html',
  styleUrls: ['./make-offer.component.scss'],
  providers: [MessageService]
})
export class MakeOfferComponent implements OnInit {

  offerForm: FormGroup

  auctionId: number = 0;
  auction: Auction | undefined;
  staringPrice: number = 0;

  isLoading = true;
  myOffer: AuctionOffer | undefined;

  ratingLoading = false;

  currencies = ['PLN', 'EUR', 'USD'];
  selectedCurrency: string = 'PLN'

  subscription = new Subscription();

  constructor(private auctionService: AuctionsService,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private fb: FormBuilder,) {

    this.auctionId = this.route.snapshot.params['id'] ?? 0;

    this.offerForm = this.fb.group({
      price: [0, [Validators.required, Validators.min(this.staringPrice)]],
    });

    // this.currencies
  }

  private getAuction(){
    if(this.auctionId !== undefined){
      this.subscription.add(this.auctionService.getAuctionById(this.auctionId).subscribe({
        next: value => {
          this.auction = value;
          if (this.auction.staringPrice) {
            this.staringPrice = this.auction.staringPrice
          }
        },
        error: err => {
          this.isLoading = false; //TODO: usunac
          this.messageService.add({severity: 'error', summary: 'Server Error!', detail: 'Error while getting Auction'});
        }}))
    }
  }

  ngOnInit(): void {
    this.getAuction();
  }

  get offerPrice() {
    return this.offerForm.get('price')!;
  }

  setCurrency(event: any) {
    this.selectedCurrency = event.value
  }

  onSubmit() {
    this.offerForm.markAllAsTouched();

    console.log(this.selectedCurrency);
    
    if (this.offerForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Wprowadzono nieprawidłowe dane!'});
      return;
    }

    // const auction: Auction = {
    //   name: this.auctionName.value,
    //   staringPrice: this.auctionStartingPrice.value,
    //   dueDate: this.auctionDueDate.value.getTime(),
    //   description: this.auctionDescription.value,
    //   isOpen: true
    // }

    // this.subscription.add(
    //   this.auctionsService.createAuction(auction).subscribe({
    //     next: () => {
    //       this.messageService.add({severity: 'success', summary: 'Pomyślnie utworzono nowy przetarg!'});
    //       setTimeout(() => {
    //         this.router.navigate(['auctions']);
    //       }, 1000);
    //     }
    //   })
    // );
  }

  backToAuctions() {
    this.router.navigate(['auctions']);
  }
}
