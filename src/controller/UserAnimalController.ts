import {Get, JsonController, NotFoundError, Param, Post} from "routing-controllers";
import {Service} from "typedi";
import {AnimalDtoConverter} from "../dto-converter/AnimalDtoConverter";
import {Animal} from "../entity/Animal";
import {UserAnimalFacade} from "../facade/UserAnimalFacade";
import {AnimalService} from "../service/AnimalService";
import {UserService} from "../service/UserService";
import {AnimalDto} from "../dto/AnimalDto";

@Service()
@JsonController("/api/users")
export class UserAnimalController {
  constructor(
    private readonly userService: UserService,
    private readonly animalService: AnimalService,
    private readonly userAnimalFacade: UserAnimalFacade
  ) {}

  @Get("/:userId/animals")
  public async getAllUserAnimals(
    @Param("userId") userId: string
  ): Promise<AnimalDto[]> {
    await this.userService.findOneUser(userId).catch(() => {
      throw new NotFoundError(`User with id:${userId} not found`);
    })

    return this.animalService
        .findAllUserAnimals(userId)
        .then(animals => AnimalDtoConverter.animalsListToDtos(animals)
    )
  }

  @Post("/:userId/animals/:animalId")
  public async addAnimalToUser(
    @Param("userId") userId: string,
    @Param("animalId") animalId: string
  ): Promise<AnimalDto | void> {
    return this.userAnimalFacade
      .addAnimalToUser(userId, animalId)
        .then(animal => AnimalDtoConverter.toDto(animal))
      .catch((error) => {
        throw new Error(`Something went wrong ${error}`);
      });
  }
}
