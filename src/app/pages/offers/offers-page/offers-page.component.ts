import { Component, OnInit } from '@angular/core';
import {Auction, AuctionOffer, AuctionOfferService, AuctionsService} from "../../../services/generated";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.scss'],
  providers: [MessageService]
})
export class OffersPageComponent implements OnInit {

  auctionId: number = 0;
  auction: Auction | undefined;

  isLoading = true;
  detailsModalVisiblle = false;
  selectedOffer: AuctionOffer | undefined;

  ratingLoading = false;

  rating = 0;

  auctionOfferList: AuctionOffer[] = [
    {
      id: 2,
      userId: 'lalala',
      amount: 123,
      currency: 'PLN'
    },
    {
      id:3,
      userId: 'lalal',
      amount: 300,
      currency: 'EUR'
    }
  ];

  subscription = new Subscription();

  constructor(private auctionOfferService: AuctionOfferService,
              private auctionService: AuctionsService,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService) {

    this.auctionId = this.route.snapshot.params['id'] ?? 0;
  }

  private getAuction(){
    if(this.auctionId !== undefined){
      this.subscription.add(this.auctionService.getAuctionById(this.auctionId).subscribe({
        next: value => {
          this.auction = value;
          this.getOffers();
        },
        error: err => {
          this.isLoading = false;
          this.messageService.add({severity: 'error', summary: 'Server Error!', detail: 'Error while getting Auction'});
        }}))
    }

  }

  //branie ofert dla danego przetargu
  private getOffers(){
    //this.isLoading = true;
    //this.subscription.add(this.auctionOfferService.) bra
    //this.auctionOfferService.getAllOffers()
  }

  ngOnInit(): void {
    this.getAuction();

  }

  viewDetails(offer: AuctionOffer){
    this.detailsModalVisiblle = true;
    this.selectedOffer = offer;
  }


  onModalHide() {
    this.rating = 0;
  }

  onOfferSubmit() {
    this.ratingLoading = true;

    //przesylanie opinii
  }

  backToAuctions() {
    this.router.navigate(['auctions']);
  }
}
