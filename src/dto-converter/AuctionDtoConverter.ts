import { AuctionDto } from "../dto/AuctionDto";
import { Auction } from "../entity/Auction";
import { BidDtoConverter } from "./BidsDtoConverter";
import { PaymentDtoConverter } from "./PaymentDtoConverter";
import { PictureDtoConverter } from "./PictureDtoConverter";
import { ProductDtoConverter } from "./ProductDtoConverter";
import { UserDtoConverter } from "./UserDtoConverter";

export class AuctionDtoConverter {
  public static toDto(auction: Auction): AuctionDto {
    const newAuctionDto = new AuctionDto();

    newAuctionDto.id = auction.id ? auction.id : 0;
    newAuctionDto.price = auction.price;
    newAuctionDto.priceDrop = auction.priceDrop;
    newAuctionDto.minimumPrice = auction.minimumPrice;
    newAuctionDto.auctionType = auction.auctionType;
    newAuctionDto.completionDate = auction.completionDate;
    newAuctionDto.reducingTime = auction.reducingTime;
    newAuctionDto.createdAt = auction.createdAt;
    newAuctionDto.jumpToTheNextRaise = auction.jumpToTheNextRaise;

    return newAuctionDto;
  }

  public static toEntity(auctionDto: AuctionDto): Auction {
    const newAuction = new Auction();

    newAuction.price = auctionDto.price;
    newAuction.priceDrop = auctionDto.priceDrop;
    newAuction.minimumPrice = auctionDto.minimumPrice;
    newAuction.auctionType = auctionDto.auctionType;
    newAuction.completionDate = auctionDto.completionDate;
    newAuction.reducingTime = auctionDto.reducingTime;
    newAuction.createdAt = auctionDto.createdAt;
    newAuction.jumpToTheNextRaise = auctionDto.jumpToTheNextRaise;

    return newAuction;
  }

  public static partialToEntity(auctionDto: Partial<AuctionDto>): Auction {
    const newAuction = new Auction();

    newAuction.price = auctionDto.price ? auctionDto.price : 0;
    newAuction.priceDrop = auctionDto.priceDrop ? auctionDto.priceDrop : 0;
    newAuction.minimumPrice = auctionDto.minimumPrice
      ? auctionDto.minimumPrice
      : 0;
    newAuction.auctionType = auctionDto.auctionType;
    newAuction.completionDate = auctionDto.completionDate;
    newAuction.reducingTime = auctionDto.reducingTime
      ? auctionDto.reducingTime
      : null;
    newAuction.createdAt = auctionDto.createdAt;
    newAuction.jumpToTheNextRaise = auctionDto.jumpToTheNextRaise;
    return newAuction;
  }

  public static toDtoWithIncludables(auction: Auction): AuctionDto {
    const newAuctionDto = new AuctionDto();

    newAuctionDto.id = auction.id ? auction.id : 0;
    newAuctionDto.price = auction.price;
    newAuctionDto.priceDrop = auction.priceDrop;
    newAuctionDto.minimumPrice = auction.minimumPrice;
    newAuctionDto.auctionType = auction.auctionType;
    newAuctionDto.completionDate = auction.completionDate;
    newAuctionDto.reducingTime = auction.reducingTime;
    newAuctionDto.createdAt = auction.createdAt;
    newAuctionDto.jumpToTheNextRaise = auction.jumpToTheNextRaise;

    newAuctionDto.seller = auction.seller
      ? UserDtoConverter.toDto(auction.seller)
      : null;
    newAuctionDto.product = auction.product
      ? ProductDtoConverter.toDto(auction.product)
      : null;
    newAuctionDto.bids = auction.bids
      ? BidDtoConverter.bidsListToDtosWithBuyers(auction.bids)
      : [];
    newAuctionDto.payment = auction.payment
      ? PaymentDtoConverter.toDtoWithIncludables(auction.payment)
      : null;
    newAuctionDto.pictures = auction.pictures
      ? PictureDtoConverter.picturesListToDtos(auction.pictures)
      : [];

    return newAuctionDto;
  }

  public static auctionsListToDtos(auctions: Auction[]): AuctionDto[] {
    return auctions.map((auction) => this.toDto(auction));
  }

  public static auctionsListToDtosWithIncludables(
    auctions: Auction[]
  ): AuctionDto[] {
    return auctions.map((auction) => this.toDtoWithIncludables(auction));
  }
}
