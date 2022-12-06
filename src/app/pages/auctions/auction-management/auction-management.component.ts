import { Component, OnInit } from '@angular/core';
import {Auction, AuctionsService} from "../../../services/generated";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auction-management',
  templateUrl: './auction-management.component.html',
  styleUrls: ['./auction-management.component.scss'],
  providers:[MessageService]
})
export class AuctionManagementComponent implements OnInit {

  editModeFlag = false;
  showLoadingDialog = false;

  isLoading = true;

  auctionList: Auction[] = [
    {name: 'Auction 1', staringPrice: 100, isOpen: true},
    {name: 'Auction 2', staringPrice: 150, isOpen: false},
    {name: 'Auction 3', staringPrice: 200, isOpen: true},
  ];

  subscription = new Subscription();

  constructor(private auctionService: AuctionsService,
              private messageService: MessageService,
              private router: Router
              ) {
    this.getAuctions();
  }

  private getAuctions(){
    this.subscription.add(
      this.auctionService.getAllAuctions().subscribe({
        next: value => {
          this.auctionList = value;
          this.isLoading = false;
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'Server Error', detail: 'Auctions loading error'});
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

  editAuction(auction: Auction) {
// TODO: Implement edit auction logic
  }

  closeAuction(auction: Auction) {
// TODO: Implement rate auction logic
    if(!auction.isOpen){
      return;
    }

    this.showLoadingDialog = true;

    const closedAuction = Object.assign({},this.auctionList.find(a => a.id === auction.id));

    if(closedAuction === undefined){
      this.messageService.add({severity: 'error', summary: 'Site Error', detail: 'Auction without id'});
      return;
    }

    closedAuction.isOpen = false;
    this.subscription.add(this.auctionService.updateAuction(closedAuction).subscribe({
      next: value => {
        this.showLoadingDialog = false;
        this.messageService.add({severity: 'success', summary: 'Sukces!', detail: 'Pomyślnie zamknięto przetarg'});
        const i = this.auctionList.findIndex(a => a.id === value.id);
        this.auctionList[i] = value;
      },
      error: err => {
        this.showLoadingDialog = false;
        this.messageService.add({severity: 'error', summary: 'Błąd Serwera', detail: 'Błąd podczas zamykania przetargu'});
      }
    }))
  }

  viewDetails(auction: Auction) {
// TODO: Implement view details logic
  }


  viewOffers(auction: Auction) {
    this.router.navigate([`auctions/${auction.id ?? 0}/offers`]);
  }
}
