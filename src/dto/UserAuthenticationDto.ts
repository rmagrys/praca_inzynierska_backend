import { IsEmail, validateOrReject } from "class-validator";

export class UserAuthenticationDto {
  @IsEmail()
  email: string;
  password: string;

  async validate() {
    await validateOrReject(this);
  }
}
