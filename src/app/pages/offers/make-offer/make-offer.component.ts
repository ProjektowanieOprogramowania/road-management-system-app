import { Component, OnInit } from '@angular/core';
import {Auction, AuctionOffer, AuctionOfferService, AuctionsService} from "../../../services/generated";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router, TitleStrategy} from "@angular/router";
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-make-offer',
  templateUrl: './make-offer.component.html',
  styleUrls: ['./make-offer.component.scss'],
  providers: [MessageService]
})
export class MakeOfferComponent implements OnInit {

  auctionId: number = 0;
  auction: Auction | undefined;
  staringPrice: number = 0;

  isPriceValid: boolean = false
  price: number = 0

  isCompanyNameValid: boolean = false
  companyName: string | undefined

  isLoading = true;
  myOffer: AuctionOffer | undefined;

  ratingLoading = false;

  currencies = ['pln', 'eur', 'usd'];
  selectedCurrency: string = 'pln'

  subscription = new Subscription();

  constructor(private auctionService: AuctionsService,
              private auctionOfferService: AuctionOfferService,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService) {

    this.auctionId = this.route.snapshot.params['id'] ?? 0;

    // this.currencies
  }

  private getAuction(){
    if(this.auctionId !== undefined){
      this.subscription.add(this.auctionService.getAuctionById(this.auctionId).subscribe({
        next: value => {
          this.auction = value;
          if (value.staringPrice) {
            this.staringPrice = value.staringPrice
            this.price = value.staringPrice
            this.isLoading = false
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

  setCurrency(event: any) {
    this.selectedCurrency = event.value
  }

  onSubmit() {
    if (this.price < this.staringPrice || this.companyName == null || this.companyName == "") {
      this.messageService.add({severity: 'error', summary: 'Wprowadzono nieprawidłowe dane!'});
      return;
    }

    const offer: AuctionOffer = { 
      userId: "2e92a123-f4b8-33a1-0ea9-a00592fac476",
      companyName: this.companyName,
      auctionId: this.auctionId,
      amount: this.price,
      currency: this.selectedCurrency,
    }

    console.log(offer)
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

    this.subscription.add(
      this.auctionOfferService.createOffer(offer).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Pomyślnie utworzono nowy przetarg!'});
            this.router.navigate(['auctions']);
        }
      })
    );
  }

  backToAuctions() {
    this.router.navigate(['auctions']);
  }
}
