import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { DeleteResult } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Animal } from "../entity/Animal";
import { AnimalRepository } from "../repository/AnimalRepository";

@Service()
export class AnimalService {
  constructor(
    @InjectRepository() private readonly animalRepository: AnimalRepository
  ) {}

  async getAnimalById(id: string): Promise<Animal> {
    return this.animalRepository.findOneOrFail(id);
  }

  async getAllAnimals() {
    return this.animalRepository.find();
  }

  async saveAnimal(newAnimal: Animal): Promise<Animal> {
    return this.animalRepository.save(newAnimal);
  }

  async updateAnimal(newAnimalId: string, newAnimal: Animal): Promise<Animal> {
    return this.getAnimalById(newAnimalId)
      .then((animal) => {
        animal.name = newAnimal.name;
        animal.species = newAnimal.species;

        return this.animalRepository.save(animal);
      })
      .catch(() => {
        throw new NotFoundError(`Animal with id ${newAnimalId} not found`);
      });
  }

  async deleteAnimal(id: string): Promise<DeleteResult> {
    return this.getAnimalById(id)
      .then((animalToDelete) => this.animalRepository.delete(animalToDelete.id))
      .catch(() => {
        throw new NotFoundError(`Animal with id ${id} not found`);
      });
  }

  async findAllUserAnimals(userId: string): Promise<Animal[]> {
    return this.animalRepository.findAllByUser(userId);
  }
}
