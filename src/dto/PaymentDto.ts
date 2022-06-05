import { Length, validateOrReject } from "class-validator";

import { UserDto } from "./UserDto";

export class PaymentDto {
  id: number;

  @Length(2, 50)
  value: number;

  @Length(2, 50)
  description: string;

  buyer?: UserDto;

  createdAt: Date;

  async validate() {
    await validateOrReject(this);
  }
}
