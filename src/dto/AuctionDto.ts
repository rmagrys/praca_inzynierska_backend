import { Length, validateOrReject } from "class-validator";
import { AuctionType } from "../enum/AuctionType";

import { UserDto } from "./UserDto";
import { AuctionProductDto } from "./AuctionProductDto";
import { BidDto } from "./BidDto";
import { PaymentDto } from "./PaymentDto";

export class AuctionDto {
  id: number;

  @Length(2, 50)
  price: number;

  @Length(2, 50)
  description: string;

  priceDrop: number;

  minimumPrice: number;

  auctionType: AuctionType;

  completionDate: Date;

  intervalTime: Date;

  createdAt: Date;

  seller: UserDto;

  auctionsProducts: AuctionProductDto[];

  bids?: BidDto[];

  payment: PaymentDto;

  async validate() {
    await validateOrReject(this);
  }
}
