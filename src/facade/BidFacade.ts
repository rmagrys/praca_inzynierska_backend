import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { Bid } from "../entity/Bid";
import { AuctionService } from "../service/AuctionService";
import { BidService } from "../service/BidService";
import { UserService } from "../service/UserService";

@Service()
export class BidFacade {
  constructor(
    private readonly bidService: BidService,
    private readonly userService: UserService,
    private readonly auctionService: AuctionService
  ) {}
  async saveNewBid(bid: Bid, userId: string, auctionId: string): Promise<Bid> {
    const auction = await this.auctionService.findOneAuction(auctionId);
    if (auction.completionDate < new Date()) {
      throw new BadRequestError("Nie można dodać, aukcja został zakończona");
    }

    const highestBid = await this.bidService.findHighestBidForAuction(
      auctionId
    );

    if (auction.price >= bid.value) {
      throw new BadRequestError(
        "Nie można dodać, musisz podać cenę większą niż cena startowa"
      );
    }

    if (
      highestBid &&
      highestBid.value + auction.jumpToTheNextRaise >= bid.value
    ) {
      throw new BadRequestError(
        "Nie można dodać, musisz podać cenę większą niż największa oferta"
      );
    }

    const existingUserBid = await this.bidService.findBidByUserAndAuction(
      userId,
      auctionId
    );

    const user = await this.userService.findOneUser(userId);
    console.log(existingUserBid);

    if (existingUserBid) {
      existingUserBid.value = bid.value;
      existingUserBid.description = bid.description;
      return this.bidService.saveNewBid(existingUserBid);
    } else {
      bid.auction = auction;
      bid.buyer = user;
      return this.bidService.saveNewBid(bid);
    }
  }
}
