import { Length, validateOrReject } from "class-validator";

import { AuctionProductDto } from "./AuctionProductDto";
import { CategoryDto } from "./CategoryDto";

export class ProductDto {
  id: number;

  @Length(2, 50)
  name: string;

  @Length(2, 50)
  description: string;

  createdAt: Date;

  category: CategoryDto;

  auctionsProducts: AuctionProductDto[];

  async validate() {
    await validateOrReject(this);
  }
}
