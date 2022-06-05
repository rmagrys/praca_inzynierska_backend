import {Body, Delete, Get, HttpCode, JsonController, NotFoundError, Param, Patch, Post,} from "routing-controllers";
import {Service} from "typedi";
import {DeleteResult} from "typeorm";
import {UserDtoConverter} from "../dto-converter/UserDtoConverter";
import {UserDto} from "../dto/UserDto";
import {User} from "../entity/User";
import {UserService} from "../service/UserService";

@Service()
@JsonController("/api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers(): Promise<UserDto[]> {
    return await this.userService
      .getAllUsers()
      .then((users) => UserDtoConverter.userListToDtos(users));
  }

  @Get("/:id")
  public async getUserById(@Param("id") id: string): Promise<UserDto> {
    return await this.userService
      .findOneUser(id)
      .then((user) => UserDtoConverter.toDto(user))
      .catch(() => {
        throw new NotFoundError(`User with id ${id} not found`);
      });
  }

  @Post()
  @HttpCode(201)
  public async addNewUser(
    @Body({ validate: true }) userDto: UserDto
  ): Promise<UserDto> {
    const user: User = UserDtoConverter.toEntity(userDto);

    return await this.userService
      .saveUser(user)
      .then((user: User) => UserDtoConverter.toDto(user));
  }

  @Patch("/:id")
  @HttpCode(200)
  public async updateUser(
    @Param("id") id: string,
    @Body({ validate: true }) userDto: UserDto
  ): Promise<UserDto> {
    const user: User = UserDtoConverter.toEntity(userDto);

    return await this.userService
      .updateUser(id, user)
      .then((user: User) => UserDtoConverter.toDto(user));
  }

  @Delete("/:id")
  @HttpCode(204)
  public async deleteUser(@Param("id") id: string): Promise<DeleteResult> {
    return await this.userService.deleteUser(id).catch(() => {
      throw new NotFoundError(`User with id ${id} not found`);
    });
  }
}
