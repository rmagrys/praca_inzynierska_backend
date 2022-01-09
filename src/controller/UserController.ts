import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
} from "routing-controllers";
import { Service } from "typedi";
import { UserDtoConverter } from "../dto-converter/UserDtoConverter";
import { UserDto } from "../dto/UserDto";
import { User } from "../entity/User";
import { UserService } from "../service/UserService";

@Service()
@JsonController("/api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userService
      .getAllUsers()
      .then((users) => UserDtoConverter.userListToDtos(users));
  }

  @Get("/:id")
  async getUserById(@Param("id") id: string): Promise<UserDto> {
    return await this.userService
      .findOneUser(id)
      .then((user) => UserDtoConverter.toDto(user));
  }

  @Post()
  @HttpCode(201)
  async addNewUser(
    @Body({ validate: true }) userDto: UserDto
  ): Promise<UserDto> {
    const user: User = UserDtoConverter.toEntity(userDto);

    return await this.userService
      .saveUser(user)
      .then((user: User) => UserDtoConverter.toDto(user));
  }
}
