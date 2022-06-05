import { AnimalDto } from "../dto/AnimalDto";
import { Animal } from "../entity/Animal";

export class AnimalDtoConverter {
  public static toDto(animal: Animal): AnimalDto {
    const newAnimalDto = new AnimalDto();

    newAnimalDto.id = animal.id ? animal.id : 0;
    newAnimalDto.spicies = animal.species;
    newAnimalDto.name = animal.name;

    return newAnimalDto;
  }

  public static toEntity(animalDto: AnimalDto): Animal {
    const newAnimal = new Animal();

    newAnimal.name = animalDto.name;
    newAnimal.species = animalDto.spicies;

    return newAnimal;
  }

  public static animalsListToDtos(animals: Animal[]): AnimalDto[] {
    return animals.map((animal) => this.toDto(animal));
  }
}
