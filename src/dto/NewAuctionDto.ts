import { AuctionType } from "../enum/AuctionType";
import { ProductDto } from "./ProductDto";

export class NewAuctionDto {
  id: number;
  price: number;
  priceDrop: number;
  imagesUrls: string[];
  minimumPrice: number;
  auctionType: AuctionType;
  completionDate: Date;
  product: ProductDto;
  intervalTime: Date;
  createdAt: Date;
  categoryId: string;
}
