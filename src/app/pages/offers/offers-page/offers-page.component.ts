import {Component, OnInit} from '@angular/core';
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
  detailsModalVisible = false;
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

  private getAuction() {
    if (this.auctionId !== undefined) {
      this.subscription.add(this.auctionService.getAuctionById(this.auctionId).subscribe({
        next: value => {
          this.auction = value;
          this.getOffers(value.id!);
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'Server Error!', detail: 'Error while getting Auction'});
        }
      }))
    }
  }

  //branie ofert dla danego przetargu
  private getOffers(auctionId: number) {
    //this.isLoading = true;
    this.subscription.add(this.auctionOfferService.getAuctionOffers(auctionId)
      .subscribe({
        next: value => {
          this.auctionOfferList = value;
          this.isLoading = false;
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'Server Error!', detail: 'Error while getting Offers'});
        }
      }));
  }

  ngOnInit(): void {
    this.getAuction();
  }

  viewDetails(offer: AuctionOffer) {
    this.detailsModalVisible = true;
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
          this.messageService.add({severity: 'success', summary: 'Sukces!', detail: 'Poprawnie wystawiono ocenę!'});

          const index = this.auctionOfferList.findIndex(o => o.id == value.id);
          if (index === -1) {
            this.messageService.add({severity: 'warning', summary: 'Warning', detail: 'Please refresh list.'});
          } else {
            this.auctionOfferList[index] = value;
          }

          this.ratingLoading = false;
          this.detailsModalVisible = false;
        },
        error: () => {
          this.messageService.add(
            {severity: 'error', summary: 'Server Error!', detail: 'Error while submitting score.'});
          this.ratingLoading = false;
          this.detailsModalVisible = false;
        }
      }));
  }

  backToAuctions() {
    this.router.navigate(['auctions']);
  }

  onModalShow() {
    if (this.selectedOffer !== undefined && this.selectedOffer.score !== undefined) {
      this.rating = this.selectedOffer.score;
    }
  }
}
