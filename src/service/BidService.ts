import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Bid } from "../entity/Bid";
import { AuctionType } from "../enum/AuctionType";
import { BidRepository } from "../repository/BidRepository";

@Service()
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
      .select("bid")
      .from(Bid, "bid")
      .where("bid.auction_id = :auctionId", { auctionId })
      .orderBy("bid.value", "DESC")
      .getOne();
  }

  async getAllUserBidsWithIncludablesByCategoryAndAuctionType(
    userId: string,
    categoryId: string,
    auctionType: AuctionType
  ): Promise<Bid[]> {
    return this.bidRepository
      .createQueryBuilder()
      .select("bid")
      .from(Bid, "bid")
      .innerJoinAndSelect("bid.auction", "auction")
      .innerJoinAndSelect("auction.product", "product")
      .where("product.category_id = :categoryId", { categoryId })
      .andWhere("bid.buyer_id = :userId", { userId })
      .andWhere("auction.auctionType = :auctionType", { auctionType })
      .getMany();
  }

  async getAllUserBidsWithIncludables(userId: string): Promise<Bid[]> {
    return this.bidRepository
      .createQueryBuilder()
      .select("bid")
      .from(Bid, "bid")
      .leftJoinAndSelect("bid.auction", "auction")
      .where("bid.buyer_id = :userId", { userId })
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
