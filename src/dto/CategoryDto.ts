import { Length, validateOrReject } from "class-validator";

import { ProductDto } from "./ProductDto";

export class CategoryDto {
  id: number;

  @Length(2, 50)
  name: string;

  @Length(2, 50)
  description: string;

  createdAt: Date;

  products: ProductDto[];

  async validate() {
    await validateOrReject(this);
  }
}
