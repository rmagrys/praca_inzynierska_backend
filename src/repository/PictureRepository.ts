import { EntityRepository, Repository } from "typeorm";
import { Picture } from "../entity/Picture";

@EntityRepository(Picture)
export class PictureRepository extends Repository<Picture> {}
