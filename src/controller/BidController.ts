import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { BidDtoConverter } from "../dto-converter/BidsDtoConverter";
import { BidDto } from "../dto/BidDto";
import { Bid } from "../entity/Bid";
import { BidService } from "../service/BidService";
import { BidFacade } from "../facade/BidFacade";

@Service()
@JsonController("/api/bid")
export class BidController {
  constructor(
    private readonly bidService: BidService,
    private readonly bidFacade: BidFacade
  ) {}

  @Get("/user/:userId")
  async getAllUserBidsWithIncludables(
    @Param("userId") userId: string
  ): Promise<Bid[]> {
    return await this.bidService
      .getAllUserBidsWithIncludables(userId)
      .then((bids: Bid[]) =>
        BidDtoConverter.bidsListToDtosWithIncludables(bids)
      );
  }

  @Post("/user/:userId/auction/:auctionId")
  async addNewBidToAuction(
    @Param("userId") userId: string,
    @Param("auctionId") auctionId: string,
    @Body({ validate: true }) bidDto: BidDto
  ) {
    const newBid = BidDtoConverter.toEntity(bidDto);

    return this.bidFacade.saveNewBid(newBid, userId, auctionId);
  }
}
