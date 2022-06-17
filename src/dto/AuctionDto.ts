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
  jumpToTheNextRaise: number;
  auctionType: AuctionType;
  completionDate: Date;
  reducingTime: number;
  createdAt: Date;
  seller?: UserDto;
  product?: ProductDto;
  bids?: BidDto[];
  pictures?: PictureDto[];
  payment?: PaymentDto;

  async validate() {
    await validateOrReject(this);
  }
}
