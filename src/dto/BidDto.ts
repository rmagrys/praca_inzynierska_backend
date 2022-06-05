import { Length, validateOrReject } from "class-validator";

import { AuctionDto } from "./AuctionDto";
import { UserDto } from "./UserDto";

export class BidDto {
  id: number;

  @Length(2, 50)
  value: number;

  @Length(2, 50)
  description: string;

  createdAt: Date;

  buyer: UserDto;

  auction?: AuctionDto;

  async validate() {
    await validateOrReject(this);
  }
}
