import {Auction} from "../../services/generated";
import {convertToModel, CurrencyModel} from "./currency.model";

export interface AuctionModel extends Omit<Auction, 'dueDate'> {
  dueDate?: Date,
  startingPrice?: number,
  startingPriceCurrency?: CurrencyModel
}

export function convertToAuctionModel(auction: Auction): AuctionModel {
  let dueDate = auction.dueDate ? new Date() : undefined;
  dueDate?.setTime(auction.dueDate ?? 0);

  return {
    ...auction,
    dueDate: dueDate,
    startingPrice: auction.staringPrice,
    startingPriceCurrency: auction.staringPriceCurrency ? convertToModel(auction.staringPriceCurrency) : undefined
  };
}

export function convertToAuctionModels(auctions: Auction[]): AuctionModel[] {
  return auctions.map(auction => {
    let dueDate = auction.dueDate ? new Date() : undefined;
    dueDate?.setTime(auction.dueDate ?? 0);
    return {
      ...auction,
      dueDate: dueDate,
      startingPrice: auction.staringPrice,
      startingPriceCurrency: auction.staringPriceCurrency ? convertToModel(auction.staringPriceCurrency) : undefined
    }
  })
}
