import { IsDefined, IsEmail, Length, validateOrReject } from "class-validator";

import { AuctionDto } from "./AuctionDto";
import { BidDto } from "./BidDto";
import { PaymentDto } from "./PaymentDto";
export class UserDto {
  id: number;

  @IsEmail()
  email: string;

  password: string;

  @IsDefined()
  @Length(2, 50)
  firstName: string;

  @IsDefined()
  @Length(2, 70)
  lastName: string;

  createdAt: Date;

  @Length(5, 20)
  phone: number;

  payments: PaymentDto[];

  auctions: AuctionDto[];

  bids: BidDto[];

  async validate() {
    await validateOrReject(this);
  }
}
