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

  async getAuctionByIdWithIncludables(id: string): Promise<Auction> {
    return this.auctionRepository
      .createQueryBuilder()
      .select("auction")
      .from(Auction, "auction")
      .leftJoinAndSelect("auction.seller", "user")
      .leftJoinAndSelect("auction.product", "product")
      .leftJoinAndSelect("auction.pictures", "picture")
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
      .where("product.category_id = :categoryId", { categoryId })
      .andWhere("auction.auctionType = :auctionType", { auctionType })
      .getMany();
  }

  async saveAuction(auciton: Auction) {
    auciton.createdAt = new Date();
    return this.auctionRepository.save(auciton);
  }
}
