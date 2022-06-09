import { EntityRepository, Repository } from "typeorm";
import { Auction } from "../entity/Auction";

@EntityRepository(Auction)
export class AuctionRepository extends Repository<Auction> {}
