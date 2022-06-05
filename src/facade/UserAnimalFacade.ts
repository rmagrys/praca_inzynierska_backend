import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Animal } from "../entity/Animal";
import { AnimalRepository } from "../repository/AnimalRepository";
import { AnimalService } from "../service/AnimalService";
import { UserService } from "../service/UserService";

@Service()
export class UserAnimalFacade {
  constructor(
    private readonly animalService: AnimalService,
    private readonly userService: UserService,
    @InjectRepository() private readonly animalRepository: AnimalRepository
  ) {}

  public async addAnimalToUser(
    userId: string,
    animalId: string
  ): Promise<Animal> {
    const user = await this.userService.findOneUser(userId).catch(() => {
      throw new NotFoundError(`User with id:${userId} not found`);
    });

    const animal = await this.animalService
      .getAnimalById(animalId)
      .catch(() => {
        throw new NotFoundError(`Animal with id:${animalId} not found`);
      });

    return this.animalRepository.save(animal);
  }
}
