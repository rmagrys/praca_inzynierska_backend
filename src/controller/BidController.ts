import {
  Authorized,
  Body,
  Get,
  JsonController,
  Param,
  Post,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { BidDtoConverter } from "../dto-converter/BidsDtoConverter";
import { BidDto } from "../dto/BidDto";
import { Bid } from "../entity/Bid";
import { BidService } from "../service/BidService";
import { BidFacade } from "../facade/BidFacade";
import { AuctionType } from "../enum/AuctionType";

@Service()
@JsonController("/api/bid")
export class BidController {
  constructor(
    private readonly bidService: BidService,
    private readonly bidFacade: BidFacade
  ) {}

  @Authorized()
  @Get("/user/:userId")
  async getAllUserBidsWithIncludables(
    @Param("userId") userId: string
  ): Promise<Bid[]> {
    console.log("userId", userId);
    return await this.bidService
      .getAllUserBidsWithIncludables(userId)
      .then((bids: Bid[]) =>
        BidDtoConverter.bidsListToDtosWithIncludables(bids)
      );
  }

  @Authorized()
  @Get("/user/:userId/category/:categoryId")
  async getAllUserBidsWithIncludablesByCategoryAndAuctionType(
    @Param("userId") userId: string,
    @Param("categoryId") categoryId: string,
    @QueryParam("auction-type") auctionType: AuctionType
  ): Promise<Bid[]> {
    return await this.bidService
      .getAllUserBidsWithIncludablesByCategoryAndAuctionType(
        userId,
        categoryId,
        auctionType
      )
      .then((bids: Bid[]) =>
        BidDtoConverter.bidsListToDtosWithIncludables(bids)
      );
  }

  @Authorized()
  @Post("/user/:userId/auction/:auctionId")
  async addNewBidToAuction(
    @Param("userId") userId: string,
    @Param("auctionId") auctionId: string,
    @Body({ validate: true }) bidDto: BidDto
  ) {
    const newBid = BidDtoConverter.toEntity(bidDto);
    console.log(newBid);

    return this.bidFacade.saveNewBid(newBid, userId, auctionId);
  }
}
