import { Type } from "class-transformer";
import { Length, validateOrReject } from "class-validator";
import { User } from "../entity/User";

export class AnimalDto {
  id: number;

  @Length(2, 50)
  name: string;

  @Length(2, 50)
  spicies: string;

  @Type(() => User)
  user: User;

  async validate() {
    await validateOrReject(this);
  }
}
