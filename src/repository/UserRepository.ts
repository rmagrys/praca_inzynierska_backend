import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUserByEmailAndPassword(email: string, password: string): Promise<User> {
    return this.findOneOrFail({
      email: email,
      password: password,
    });
  }
  findUserByEmail(email: string): Promise<User> {
    return this.findOne({
      email: email,
    });
  }
}
