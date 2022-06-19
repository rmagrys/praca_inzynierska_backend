import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Auction } from "../entity/Auction";
import { AuctionType } from "../enum/AuctionType";
import { AuctionRepository } from "../repository/AuctionRepository";

@Service()
export class AuctionService {
  constructor(
    @InjectRepository() private readonly auctionRepository: AuctionRepository
  ) {}

  async findOneAuction(auctionId: string): Promise<Auction> {
    return this.auctionRepository.findOneOrFail(auctionId);
  }

  async getAuctionByIdWithIncludables(id: string): Promise<Auction> {
    return this.auctionRepository
      .createQueryBuilder()
      .select("auction")
      .from(Auction, "auction")
      .leftJoinAndSelect("auction.seller", "user")
      .leftJoinAndSelect("auction.product", "product")
      .leftJoinAndSelect("auction.pictures", "picture")
      .leftJoinAndSelect("auction.bids", "bid")
      .leftJoinAndSelect("auction.payment", "payment")
      .leftJoinAndSelect("payment.buyer", "auctionBuyer")
      .leftJoinAndSelect("bid.buyer", "buyer")
      .where("auction.id = :id", { id })
      .getOneOrFail();
  }

  async getAllAuctionsWithIncludables(): Promise<Auction[]> {
    return this.auctionRepository
      .createQueryBuilder()
      .select("auction")
      .from(Auction, "auction")
      .leftJoinAndSelect("auction.seller", "user")
      .leftJoinAndSelect("auction.product", "product")
      .leftJoinAndSelect("auction.pictures", "picture")
      .leftJoinAndSelect("auction.payment", "payment")
      .leftJoinAndSelect("auction.bids", "bid")
      .where("auction.payment is null")
      .andWhere("auction.completionDate > :now", { now: new Date() })
      .getMany();
  }

  async getAllFilteredAuctionsWithIncludables(
    categoryId: string,
    auctionType: AuctionType
  ): Promise<Auction[]> {
    return this.auctionRepository
      .createQueryBuilder()
      .select("auction")
      .from(Auction, "auction")
      .leftJoinAndSelect("auction.seller", "user")
      .leftJoinAndSelect("auction.product", "product")
      .leftJoinAndSelect("auction.pictures", "picture")
      .leftJoinAndSelect("auction.bids", "bid")
      .leftJoinAndSelect("auction.payment", "payment")
      .where("product.category_id = :categoryId", { categoryId })
      .andWhere("auction.auctionType = :auctionType", { auctionType })
      .andWhere("auction.completionDate < :now", { now: new Date() })
      .getMany();
  }

  async saveAuction(auciton: Auction) {
    auciton.createdAt = new Date();
    return this.auctionRepository.save(auciton);
  }

  async getAllUserAuctionsWithIncludablesAndAcutionType(
    userId: string,
    auctionType: string
  ) {
    return this.auctionRepository
      .createQueryBuilder()
      .select("auction")
      .from(Auction, "auction")
      .leftJoinAndSelect("auction.seller", "user")
      .leftJoinAndSelect("auction.product", "product")
      .leftJoinAndSelect("auction.pictures", "picture")
      .leftJoinAndSelect("auction.payment", "payment")
      .leftJoinAndSelect("auction.bids", "bid")
      .where("auction.user_id = :userId", { userId })
      .andWhere("auction.auctionType = :auctionType", { auctionType })
      .getMany();
  }

  async getAllUserAuctionsWithIncludables(userId: string) {
    return this.auctionRepository
      .createQueryBuilder()
      .select("auction")
      .from(Auction, "auction")
      .leftJoinAndSelect("auction.seller", "user")
      .leftJoinAndSelect("auction.product", "product")
      .leftJoinAndSelect("auction.pictures", "picture")
      .leftJoinAndSelect("auction.payment", "payment")
      .leftJoinAndSelect("auction.bids", "bid")
      .where("auction.user_id = :userId", { userId })
      .getMany();
  }

  async getAllUserAuctionsWithIncludablesByCategory(
    userId: string,
    categoryId: string,
    auctionType: string
  ) {
    return this.auctionRepository
      .createQueryBuilder()
      .select("auction")
      .from(Auction, "auction")
      .leftJoinAndSelect("auction.seller", "user")
      .leftJoinAndSelect("auction.product", "product")
      .leftJoinAndSelect("auction.pictures", "picture")
      .leftJoinAndSelect("auction.payment", "payment")
      .leftJoinAndSelect("auction.bids", "bid")
      .where("auction.user_id = :userId", { userId })
      .andWhere("product.category_id = :categoryId", { categoryId })
      .andWhere("auction.auctionType = :auctionType", { auctionType })
      .getMany();
  }
}
