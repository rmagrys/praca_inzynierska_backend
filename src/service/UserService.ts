import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { DeleteResult } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

@Service()
export class UserService {
  constructor(
    @InjectRepository() private readonly userRepository: UserRepository
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneUser(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async updateUser(id: string, user: User): Promise<User> {
    return this.userRepository
      .findOne(id)
      .then((userToUpdate) => {
        userToUpdate.email = user.email;
        userToUpdate.firstName = user.firstName;
        userToUpdate.lastName = user.lastName;

        return this.userRepository.save(userToUpdate);
      })
      .catch(() => {
        throw new NotFoundError(`User with id ${id} not found`);
      });
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return <DeleteResult> await this.userRepository
      .findOne(id)
      .then((userToDelete) => this.userRepository.delete(userToDelete.id))
      .catch(() => {
        throw new NotFoundError(`User with id ${id} not found`);
      });
  }
}
