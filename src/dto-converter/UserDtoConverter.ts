import { User } from "../entity/User";
import { UserDto } from "../dto/UserDto";

export class UserDtoConverter {
  public static toDto(user: User): UserDto {
    const newUserDto = new UserDto();

    newUserDto.id = user.id ? user.id : 0;
    newUserDto.email = user.email;
    newUserDto.firstName = user.firstName;
    return newUserDto;
  }

  public static toEntity(userDto: UserDto): User {
    const newUser = new User();

    newUser.email = userDto.email;
    newUser.firstName = userDto.firstName;
    newUser.lastName = userDto.lastName;
    newUser.password = userDto.password;

    return newUser;
  }

  public static userListToDtos(users: User[]): UserDto[] {
    return users.map((user) => this.toDto(user));
  }
}
