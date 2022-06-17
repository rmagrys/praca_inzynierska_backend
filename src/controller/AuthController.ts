import {
  Body,
  HttpCode,
  JsonController,
  NotFoundError,
  Post,
} from "routing-controllers";
import { Service } from "typedi";
import { UserDtoConverter } from "../dto-converter/UserDtoConverter";
import { UserAuthenticationDto } from "../dto/UserAuthenticationDto";
import { UserService } from "../service/UserService";

@Service()
@JsonController("/api")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  @HttpCode(201)
  public async registerNewUser(
    @Body({ validate: true }) userCredentials: UserAuthenticationDto
  ) {
    console.log(userCredentials);
    return this.userService
      .authenticateUser(userCredentials.email, userCredentials.password)
      .catch(
        () => new NotFoundError("Użytkownik z danym e-mailem nie istnieje")
      );
  }
}
