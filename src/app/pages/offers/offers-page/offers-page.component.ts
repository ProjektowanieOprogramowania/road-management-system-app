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

  auctionOfferList: AuctionOffer[] = [];

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
          this.getOffers(value.id!);
        },
        error: err => {
          this.isLoading = false; //TODO: usunac
          this.auctionOfferList = this.mockOffers; //TODO: usunac
          this.messageService.add({severity: 'error', summary: 'Server Error!', detail: 'Error while getting Auction'});
        }}))
    }

  }

  //branie ofert dla danego przetargu
  private getOffers(auctionId: number){
    //this.isLoading = true;
    //this.subscription.add(this.auctionOfferService.) bra
    //this.auctionOfferService.getAllOffers()
    this.subscription.add(this.auctionOfferService.getAuctionOffers(auctionId)
      .subscribe({
        next:value => {
          this.auctionOfferList = value;
          this.isLoading = false;
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'Server Error!', detail: 'Error while getting Offers'});
        }}));
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

    const newOffer = Object.assign({}, this.selectedOffer);
    newOffer.score = this.rating;

    this.subscription.add(this.auctionOfferService.updateOfferScore(newOffer)
      .subscribe({
        next: value => {
          const index = this.auctionOfferList.findIndex(o => o.id == value.id);
          if(!index){
            this.messageService.add({severity: 'error', summary: 'Server Error!', detail: 'Error while submitting score [id]'});
            return;
          }
          this.auctionOfferList[index] = value;
          this.ratingLoading = false;
          this.detailsModalVisiblle = false;
          this.messageService.add({severity: 'success', summary: 'Sukces!', detail: 'Poprawnie wystawiono ocenę!'});
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'Server Error!', detail: 'Error while submitting score'});
          this.ratingLoading = false;
          this.detailsModalVisiblle = false;
        }}));
  }

  backToAuctions() {
    this.router.navigate(['auctions']);
  }

   mockOffers = [
    {
      id: 1,
      userId: 'abc123',
      amount: 100,
      currency: 'USD',
      score: 0
    },
    {
      id: 2,
      userId: 'def456',
      amount: 120,
      currency: 'EUR',
      score: 6
    },
    {
      id: 3,
      userId: 'ghi789',
      amount: 80,
      currency: 'GBP',
      score: 8
    }
  ];

  onModalShow() {
    if(this.selectedOffer !== undefined && this.selectedOffer.score !== undefined){
      this.rating = this.selectedOffer.score;
    }
  }
}
