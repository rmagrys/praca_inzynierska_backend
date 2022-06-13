import { sign } from "jsonwebtoken";
import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { DeleteResult } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { JsonWebToken } from "../config/JsonWebToken";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
import { PasswordHashing } from "../security/PasswordHashing";
import * as config from "config";

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
    const userExists: boolean =
      (await this.userRepository.findUserByEmail(user.email)) !== undefined;

    if (userExists) {
      throw new Error("user with this email already exist");
    } else {
      console.log(user);
      user.password = await PasswordHashing.hashPassword(user.password);
      user.createdAt = new Date();
      return this.userRepository.save(user);
    }
  }

  async authenticateUser(email: string, password: string): Promise<string> {
    return await this.userRepository
      .findUserByEmail(email)
      .then(async (user: User) => {
        const isPasswordEqualToHash: boolean =
          await PasswordHashing.isPasswordEqualToHash(password, user.password);

        if (isPasswordEqualToHash) {
          const applicationSecret: string = config.get("security.secret");
          const tokenBody: JsonWebToken = new JsonWebToken();

          tokenBody.setupAuthenticationToken(String(user.id));

          return sign(Object.assign({}, tokenBody), applicationSecret);
        } else {
          throw new Error("Login failed");
        }
      })
      .catch(() => {
        throw new Error("Login failed");
      });
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
    return <DeleteResult>await this.userRepository
      .findOne(id)
      .then((userToDelete) => this.userRepository.delete(userToDelete.id))
      .catch(() => {
        throw new NotFoundError(`User with id ${id} not found`);
      });
  }
}
