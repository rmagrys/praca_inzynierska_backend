import { InjectRepository } from "typeorm-typedi-extensions";
import { Bid } from "../entity/Bid";
import { BidRepository } from "../repository/BidRepository";

export class BidService {
  constructor(
    @InjectRepository() private readonly bidRepository: BidRepository
  ) {}

  async saveNewBid(bid: Bid): Promise<Bid> {
    bid.createdAt = new Date();
    return this.bidRepository.save(bid);
  }

  async findHighestBidForAuction(auctionId: string): Promise<Bid> {
    return this.bidRepository
      .createQueryBuilder()
      .select('MAX("bid.value")', "bid")
      .from(Bid, "bid")
      .where("auction.id = :auctionId", { auctionId })
      .getOneOrFail();
  }

  async getAllUserBidsWithIncludables(userId: string): Promise<Bid[]> {
    return this.bidRepository
      .createQueryBuilder()
      .select("bid")
      .from(Bid, "bid")
      .leftJoinAndSelect("bid.buyer", "user")
      .leftJoinAndSelect("bid.auction", "auction")
      .where("buyer.id = :userId", { userId })
      .getMany();
  }

  async getAllUserBidsWithIncludablesByCategory(
    userId: string,
    categoryId: string
  ): Promise<Bid[]> {
    return this.bidRepository
      .createQueryBuilder()
      .select("bid")
      .from(Bid, "bid")
      .leftJoinAndSelect("bid.buyer", "user")
      .leftJoinAndSelect("bid.auction", "auction")
      .leftJoinAndSelect("auction.product", "product")
      .where("buyer.id = :userId", { userId })
      .andWhere("auction.product_id= :categoryId", { categoryId })
      .getMany();
  }
}
