import { EntityRepository, Repository } from "typeorm";
import { Bid } from "../entity/Bid";

@EntityRepository(Bid)
export class BidRepository extends Repository<Bid> {}
