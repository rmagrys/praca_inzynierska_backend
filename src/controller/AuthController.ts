import { JsonController } from "routing-controllers";
import { UserService } from "../service/UserService";

@JsonController("/api/")
export class AuthController {
  constructor(private readonly userService: UserService) {}
}
