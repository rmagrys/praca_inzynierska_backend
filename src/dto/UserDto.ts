import { IsDefined, IsEmail, Length, validateOrReject } from "class-validator";

import { AuctionDto } from "./AuctionDto";
import { BidDto } from "./BidDto";
import { PaymentDto } from "./PaymentDto";
export class UserDto {
  id: number;

  @IsEmail()
  @Length(2, 50)
  email: string;

  @IsDefined()
  password: string;

  @Length(2, 50)
  firstName: string;

  @Length(2, 50)
  nickname: string;

  @IsDefined()
  @Length(2, 70)
  lastName: string;

  createdAt: Date;

  @Length(5, 20)
  phone: string;

  payments?: PaymentDto[];

  auctions?: AuctionDto[];

  bids?: BidDto[];

  async validate() {
    await validateOrReject(this);
  }
}
