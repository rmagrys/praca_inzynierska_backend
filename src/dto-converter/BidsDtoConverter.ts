import { BidDto } from "../dto/BidDto";
import { Bid } from "../entity/Bid";

export class BidDtoConverter {
  public static toDto(bid: Bid): BidDto {
    const bidDto = new BidDto();

    bidDto.id = bid.id ? bid.id : 0;
    bidDto.value = bid.value;
    bidDto.description = bid.description;
    bidDto.createdAt = bid.createdAt;
    // bidDto.buyer = bid.buyer;
    // bidDto.auction = bid.auction;

    return bidDto;
  }

  public static toEntity(bidDto: BidDto): Bid {
    const newBid = new Bid();

    newBid.value = bidDto.value;
    newBid.description = bidDto.description;
    newBid.createdAt = bidDto.createdAt;
    // newBid.buyer = bidDto.buyer;
    // newBid.auction = bidDto.auction;

    return newBid;
  }

  public static bidsListToDtos(bids: Bid[]): BidDto[] {
    return bids.map((bid) => this.toDto(bid));
  }
}
