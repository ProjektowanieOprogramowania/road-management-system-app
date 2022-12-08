import {Component, OnInit} from '@angular/core';
import {Auction, AuctionOffer, AuctionOfferService, AuctionsService} from "../../../services/generated";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {
  AuctionModel,
  convertToAuction,
  convertToAuctionModel,
  convertToAuctionModels
} from "../../../common/models/auction.model";
import {auctionMocks} from "../../../common/mocks/auctions/auctionsMock";

@Component({
  selector: 'app-auction-management',
  templateUrl: './auction-management.component.html',
  styleUrls: ['./auction-management.component.scss'],
  providers: [MessageService]
})
export class AuctionManagementComponent implements OnInit {

  selectedAuction!: Auction;
  auctionDetailsModel!: AuctionModel;

  editModeFlag = false;
  isLoading = true; //flag for auctions loading

  showClosingAuctionDialog = false; //dialog for closing auction
  showResultsDialog = false //dialog for results
  loadingResults = false; //flag for loading results
  showDetailsDialog = false; //dialog for details
  loadingClosingAuction = false //flag for closing auction

  role = localStorage.getItem("ROLE")

  auctionList: AuctionModel[] = [];

  winningOffer: AuctionOffer | undefined

  subscription = new Subscription();

  constructor(private auctionService: AuctionsService,
              private messageService: MessageService,
              private auctionOfferService: AuctionOfferService,
              private router: Router
  ) {
    this.getAuctions();
  }

  private getAuctions() {
    this.subscription.add(
      this.auctionService.getAllAuctions().subscribe({
        next: value => {
          this.auctionList = convertToAuctionModels(value);
          this.isLoading = false;
        },
        error: () => {
          this.auctionList = convertToAuctionModels(auctionMocks);
          this.messageService.add({severity: 'error', summary: 'Server Error', detail: 'Auctions loading error'});
          this.isLoading = false;
        }
      })
    )
  }

  ngOnInit(): void {
  }

  addAuction() {
    this.router.navigate(['auctions/modify']);
  }

  editAuction(auction: Auction) {
    this.router.navigate(['auctions/modify'], {queryParams: {id: auction.id}});
  }

  closeAuction(auctionModel: AuctionModel) {
    const auction: Auction = convertToAuction(auctionModel);

    if (!auction.isOpen) {
      return;
    }

    //const closedAuction = Object.assign({}, this.auctionList.find(a => a.id === auction.id));

    if (auction.id === undefined) {
      this.messageService.add({severity: 'error', summary: 'Site Error', detail: 'Auction without id'});
      return;
    }

    this.selectedAuction = auction;
    this.showClosingAuctionDialog = true;
  }

  viewDetails(auction: Auction) {
    this.showDetailsDialog = true;
    this.selectedAuction = auction;
    this.auctionDetailsModel = convertToAuctionModel(auction);
  }

  goToMakeOffer(auction: Auction) {
    this.router.navigate([`auctions/${auction.id ?? 0}/makeoffer`]);
  }

  viewOffers(auction: Auction) {
    this.router.navigate([`auctions/${auction.id ?? 0}/offers`]);
  }

  viewResults(auction: Auction) {
    this.selectedAuction = auction;
    this.showResultsDialog = true;
    this.loadingResults = true;
    if (auction.id) {
      this.subscription.add(this.auctionOfferService.getWinningOffer(auction.id).subscribe({
        next: value => {
          this.winningOffer = value;
          if (!value) {
            this.messageService.add(
              {severity: 'error', summary: 'Brak ofert', detail: 'Nie można wybrać zwycięzcy'});
          }
          this.loadingResults = false;
        },
        error: err => {
          this.loadingResults = false;
          this.messageService.add(
            {severity: 'error', summary: 'Błąd Serwera', detail: 'Błąd podczas pobierania oferty wygranej'});
        }
      }))
    }
  }

  onResultsHide() {
    this.loadingResults = false;
  }

  onAuctionCloseSubmit() {
    //closedAuction.isOpen = false;
    this.loadingClosingAuction = true;
    this.subscription.add(this.auctionService.closeAuction(this.selectedAuction).subscribe({
      next: value => {
        this.showClosingAuctionDialog = false;
        this.loadingClosingAuction = false;
        this.messageService.add({severity: 'success', summary: 'Sukces!', detail: 'Pomyślnie zamknięto przetarg.'});
        const i = this.auctionList.findIndex(a => a.id === value.id);
        this.auctionList[i] = convertToAuctionModel(value);
      },
      error: err => {
        this.showClosingAuctionDialog = false;
        this.loadingClosingAuction = false;
        this.messageService.add(
          {severity: 'error', summary: 'Błąd Serwera', detail: 'Błąd podczas zamykania przetargu.'});
      }
    }));
  }
}
