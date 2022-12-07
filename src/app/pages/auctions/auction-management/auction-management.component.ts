import {Component, OnInit} from '@angular/core';
import {Auction, AuctionOffer, AuctionOfferService, AuctionsService} from "../../../services/generated";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auction-management',
  templateUrl: './auction-management.component.html',
  styleUrls: ['./auction-management.component.scss'],
  providers: [MessageService]
})
export class AuctionManagementComponent implements OnInit {

  selectedAuction!: Auction;

  editModeFlag = false;
  isLoading = true; //flag for auctions loading

  showLoadingDialog = false; //dialog for closing auction
  showResultsDialog = false //dialog for results
  loadingResults = false; //flag for loading results
  showDetailsDialog = false; //dialog for details

  role = localStorage.getItem("ROLE")


  auctionList: Auction[] = [];

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
          this.auctionList = value;
          // this.auctionList = this.auctionMocks
          console.log(value)
          this.isLoading = false;
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Server Error', detail: 'Auctions loading error'});
          this.auctionList = this.auctionMocks; //TODO: usunac
          this.isLoading = false;
        }
      })
    )
  }

  ngOnInit(): void {
  }

  updateEditMode(event: any) {
    this.editModeFlag = event;
  }

  addAuction() {
    this.router.navigate(['auctions/modify']);
  }

  editAuction(auction: Auction) {
    this.router.navigate(['auctions/modify'], {queryParams: {id: auction.id}});
  }

  closeAuction(auction: Auction) {
// TODO: Implement rate auction logic
    if (!auction.isOpen) {
      return;
    }

    //const closedAuction = Object.assign({}, this.auctionList.find(a => a.id === auction.id));

    if (auction.id === undefined) {
      this.messageService.add({severity: 'error', summary: 'Site Error', detail: 'Auction without id'});
      return;
    }

    this.showLoadingDialog = true;

    //closedAuction.isOpen = false;
    this.subscription.add(this.auctionService.closeAuction(auction).subscribe({
      next: value => {
        this.showLoadingDialog = false;
        this.messageService.add({severity: 'success', summary: 'Sukces!', detail: 'Pomyślnie zamknięto przetarg'});
        const i = this.auctionList.findIndex(a => a.id === value.id);
        this.auctionList[i] = value;
      },
      error: err => {
        this.showLoadingDialog = false;
        this.messageService.add(
          {severity: 'error', summary: 'Błąd Serwera', detail: 'Błąd podczas zamykania przetargu'});
      }
    }))
  }

  viewDetails(auction: Auction) {
    this.showDetailsDialog = true;
    this.selectedAuction = auction;
  }


  viewOffers(auction: Auction) {
    this.router.navigate([`auctions/${auction.id ?? 0}/offers`]);
  }

  viewResults(auction: Auction) {
    this.selectedAuction = auction;
    this.showResultsDialog = true;
    this.loadingResults = true;
    if(auction.id) {
      this.subscription.add(this.auctionOfferService.getWinningOffer(auction.id).subscribe({
        next: value => {
          this.winningOffer = value;
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

  auctionMocks = [
    {
      id: 1,
      isOpen: true,
      staringPrice: 100,
      localization: {
        id: 1,
        latitude: 45.5,
        longitude: -122.5,
      },
      name: 'Auction 1',
      description: 'A description of Auction 1',
      number: 1,
      dueDate: Date.now() + 86400, // one day from now
    },
    {
      id: 2,
      isOpen: false,
      staringPrice: 50,
      localization: {
        id: 2,
        latitude: 37.7,
        longitude: -122.3,
      },
      name: 'Auction 2',
      description: 'A description of Auction 2',
      number: 2,
      dueDate: Date.now() + 172800, // two days from now
    },
    {
      id: 3,
      isOpen: true,
      staringPrice: 25,
      localization: {
        id: 3,
        latitude: 40.7,
        longitude: -74.0,
      },
      name: 'Auction 3',
      description: 'A description of Auction 3',
      number: 3,
      dueDate: Date.now() + 259200, // three days from now
    },
  ]; //mocki walniete
}
