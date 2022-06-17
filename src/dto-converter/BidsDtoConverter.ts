import { BidDto } from "../dto/BidDto";
import { Bid } from "../entity/Bid";
import { AuctionDtoConverter } from "./AuctionDtoConverter";
import { UserDtoConverter } from "./UserDtoConverter";

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

  public static toDtoWithIncludables(bid: Bid): BidDto {
    const bidDto = new BidDto();

    bidDto.id = bid.id ? bid.id : 0;
    bidDto.value = bid.value;
    bidDto.description = bid.description;
    bidDto.createdAt = bid.createdAt;
    bidDto.buyer = bid.buyer ? UserDtoConverter.toDto(bid.buyer) : null;
    bidDto.auction = bid.auction
      ? AuctionDtoConverter.toDtoWithIncludables(bid.auction)
      : null;

    return bidDto;
  }

  public static toDtoWithBuyers(bid: Bid): BidDto {
    const bidDto = new BidDto();

    bidDto.id = bid.id ? bid.id : 0;
    bidDto.value = bid.value;
    bidDto.description = bid.description;
    bidDto.createdAt = bid.createdAt;
    bidDto.buyer = bid.buyer ? UserDtoConverter.toDto(bid.buyer) : null;

    return bidDto;
  }

  public static bidsListToDtos(bids: Bid[]): BidDto[] {
    return bids.map((bid) => this.toDto(bid));
  }

  public static bidsListToDtosWithIncludables(bids: Bid[]): BidDto[] {
    return bids.map((bid) => this.toDtoWithIncludables(bid));
  }

  public static bidsListToDtosWithBuyers(bids: Bid[]): BidDto[] {
    return bids.map((bid) => this.toDtoWithBuyers(bid));
  }
}
