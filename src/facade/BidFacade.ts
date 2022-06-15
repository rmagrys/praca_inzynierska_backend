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
    const highestBid = await this.bidService.findHighestBidForAuction(
      auctionId
    );

    console.log("------------------------------------------");
    console.log("------------------------------------------");
    console.log("------------------------------------------");
    console.log("highestBid", highestBid);
    console.log("------------------------------------------");
    console.log("------------------------------------------");
    console.log("------------------------------------------");

    if (highestBid && highestBid.value >= bid.value) {
      throw new Error("cant add bid, there is auction with higher value");
    }

    const auction = await this.auctionService.findOneAuction(auctionId);
    if (auction.completionDate < new Date()) {
      throw new Error("cant add bid, auction is finished");
    }

    const user = await this.userService.findOneUser(userId);

    bid.auction = auction;
    bid.buyer = user;

    return this.bidService.saveNewBid(bid);
  }
}
