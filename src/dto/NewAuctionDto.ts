import { AuctionType } from "../enum/AuctionType";
import { ProductDto } from "./ProductDto";

export class NewAuctionDto {
  //default fields
  categoryId: string;
  imagesUrls: string[];
  price: number;
  completionDate: Date;
  product: ProductDto;
  auctionType: AuctionType;

  //auctions fields
  jumpToNextRise: number;

  //descending auction fields
  minimumPrice: number;
  priceDrop: number;
  reducingTime: number;
}
