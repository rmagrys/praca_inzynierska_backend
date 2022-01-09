import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

@Service()
export class UserService {
  constructor(
    @InjectRepository() private readonly userRepository: UserRepository
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneUser(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
