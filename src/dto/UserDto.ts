import { IsEmail, Length, validateOrReject } from "class-validator";

export class UserDto {
  id: string;

  @IsEmail()
  email: string;

  password: string;

  @Length(2, 50)
  firstName: string;

  @Length(2, 70)
  lastName: string;

  async validate() {
    await validateOrReject(this);
  }
}
