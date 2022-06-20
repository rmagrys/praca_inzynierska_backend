import { Length, validateOrReject } from "class-validator";

import { AuctionDto } from "./AuctionDto";
import { CategoryDto } from "./CategoryDto";

export class ProductDto {
  id: number;

  @Length(2, 50)
  name: string;

  @Length(2, 500)
  description: string;

  createdAt: Date;

  category: CategoryDto;

  auction: AuctionDto;

  async validate() {
    await validateOrReject(this);
  }
}
