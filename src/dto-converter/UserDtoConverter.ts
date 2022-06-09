import { User } from "../entity/User";
import { UserDto } from "../dto/UserDto";

export class UserDtoConverter {
  public static toDto(user: User): UserDto {
    const newUserDto = new UserDto();

    newUserDto.id = user.id ? user.id : 0;
    newUserDto.email = user.email;
    newUserDto.firstName = user.firstName;
    newUserDto.lastName = user.firstName;
    newUserDto.createdAt = user.createdAt;
    newUserDto.phone = user.phone;
    // newUserDto.payments = user.payments;
    // newUserDto.auctions = user.auctions;
    // newUserDto.bids = user.bids;

    return newUserDto;
  }

  public static toEntity(userDto: UserDto): User {
    const newUser = new User();

    newUser.email = userDto.email;
    newUser.firstName = userDto.firstName;
    newUser.lastName = userDto.firstName;
    newUser.createdAt = userDto.createdAt;
    newUser.phone = userDto.phone;
    // newUser.payments = userDto.payments;
    // newUser.auctions = userDto.auctions;
    // newUser.bids = userDto.bids;

    return newUser;
  }

  public static userListToDtos(users: User[]): UserDto[] {
    return users.map((user) => this.toDto(user));
  }
}
