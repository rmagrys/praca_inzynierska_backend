import { User } from "../entity/User";
import { UserDto } from "../dto/UserDto";

export class UserDtoConverter {
  public static toDto(user: User): UserDto {
    const newUserDto = new UserDto();

    newUserDto.id = user.id ? user.id.toHexString() : "";
    newUserDto.email = user.email;
    newUserDto.firstName = user.firstName;
    newUserDto.lastName = user.lastName;
    return newUserDto;
  }

  public static toEntity(userDto: UserDto): User {
    const newUser = new User();

    newUser.email = userDto.email;
    newUser.firstName = userDto.firstName;
    newUser.lastName = userDto.lastName;

    return newUser;
  }

  public static userListToDtos(users: User[]): UserDto[] {
    return users.map((user) => this.toDto(user));
  }
}
