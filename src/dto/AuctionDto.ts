import { AuctionType } from "../enum/AuctionType";
import { UserDto } from "./UserDto";
import { ProductDto } from "./ProductDto";
import { BidDto } from "./BidDto";
import { PaymentDto } from "./PaymentDto";
import { PictureDto } from "./PictureDto";
import { validateOrReject } from "class-validator";

export class AuctionDto {
  id: number;
  price: number;
  priceDrop: number;
  minimumPrice: number;
  auctionType: AuctionType;
  completionDate: Date;
  intervalTime: Date;
  createdAt: Date;
  seller?: UserDto;
  product: ProductDto;
  bids?: BidDto[];
  payment?: PaymentDto;
  pictures?: PictureDto[];

  async validate() {
    await validateOrReject(this);
  }
}
