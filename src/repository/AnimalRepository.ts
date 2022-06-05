import { EntityRepository, Repository } from "typeorm";
import { Animal } from "../entity/Animal";

@EntityRepository(Animal)
export class AnimalRepository extends Repository<Animal> {

    findAllByUser(supplierId: string): Promise<Animal[]> {
        return this.find({where: {
            user: supplierId,
            }})
    }
}
