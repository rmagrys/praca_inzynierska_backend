import { Type } from "class-transformer";
import { IsEmail, Length, validateOrReject } from "class-validator";
import { Animal } from "../entity/Animal";

export class UserDto {
  id: number;

  @IsEmail()
  email: string;

  password: string;

  @Length(2, 50)
  firstName: string;

  @Length(2, 70)
  lastName: string;

  @Type(() => Animal)
  animals: Animal[];

  async validate() {
    await validateOrReject(this);
  }
}
