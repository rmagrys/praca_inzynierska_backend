import { Length, validateOrReject } from "class-validator";
import { AuctionDto } from "./AuctionDto";

import { UserDto } from "./UserDto";

export class PaymentDto {
  id: number;

  value: number;

  @Length(2, 50)
  description: string;

  buyer?: UserDto;

  auction?: AuctionDto;

  createdAt: Date;

  async validate() {
    await validateOrReject(this);
  }
}
