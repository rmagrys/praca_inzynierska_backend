import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Patch,
  Post,
} from "routing-controllers";
import { Service } from "typedi";
import { DeleteResult } from "typeorm";
import { AnimalDtoConverter } from "../dto-converter/AnimalDtoConverter";
import { AnimalDto } from "../dto/AnimalDto";
import { AnimalService } from "../service/AnimalService";

@Service()
@JsonController("/api/animals")
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  public async getAllAnimals() {
    return this.animalService
      .getAllAnimals()
      .then((animal) => AnimalDtoConverter.animalsListToDtos(animal));
  }

  @Get("/:id")
  public async getAnimalById(@Param("id") id: string): Promise<AnimalDto> {
    return this.animalService
      .getAnimalById(id)
      .then((animal) => AnimalDtoConverter.toDto(animal));
  }

  @Post()
  @HttpCode(201)
  public async addNewAnimal(
    @Body({ validate: true }) animalDto: AnimalDto
  ): Promise<AnimalDto> {
    const newAnimal = AnimalDtoConverter.toEntity(animalDto);

    return this.animalService
      .saveAnimal(newAnimal)
      .then((animal) => AnimalDtoConverter.toDto(animal));
  }

  @Patch("/:id")
  public async updateAnimal(
    @Param("id") id: string,
    @Body({ validate: true }) animalDto: AnimalDto
  ): Promise<AnimalDto> {
    const newAnimal = AnimalDtoConverter.toEntity(animalDto);

    return this.animalService
      .updateAnimal(id, newAnimal)
      .then((animal) => AnimalDtoConverter.toDto(animal));
  }

  @Delete("/:id")
  @HttpCode(200)
  public async deleteAnimal(@Param("id") id: string): Promise<DeleteResult> {
    return this.animalService.deleteAnimal(id).catch(() => {
      throw new NotFoundError(`Animal with id ${id} not found`);
    });
  }
}
