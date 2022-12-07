import {Auction} from "../../services/generated";

export interface AuctionModel extends Omit<Auction, 'dueDate'> {
  dueDate?: Date
}

export function convertToAuctionModel(auction: Auction): AuctionModel {
  let dueDate = auction.dueDate ? new Date() : undefined;
  dueDate?.setTime(auction.dueDate ?? 0);

  return {
    ...auction,
    dueDate: dueDate
  };
}

export function convertToAuctionModels(auctions: Auction[]): AuctionModel[] {
  return auctions.map(auction => {
    let dueDate = auction.dueDate ? new Date() : undefined;
    dueDate?.setTime(auction.dueDate ?? 0);
    return {
      ...auction,
      dueDate: dueDate
    }
  })
}