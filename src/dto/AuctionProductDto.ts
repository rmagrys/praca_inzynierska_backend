import { validateOrReject } from "class-validator";

import { AuctionDto } from "./AuctionDto";
import { ProductDto } from "./ProductDto";

export class AuctionProductDto {
  id: number;
  auction: AuctionDto;
  product: ProductDto;

  async validate() {
    await validateOrReject(this);
  }
}
