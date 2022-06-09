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
    newAuctionDto.intervalTime = auction.intervalTime;
    newAuctionDto.createdAt = auction.createdAt;
    // newAuctionDto.seller = auction.seller;
    // newAuctionDto.auctionsProducts = auction.auctionsProducts;
    // newAuctionDto.bids = auction.bids;
    // newAuctionDto.payment = auction.payment;

    return newAuctionDto;
  }

  public static toEntity(auctionDto: AuctionDto): Auction {
    const newAuction = new Auction();

    newAuction.price = auctionDto.price;
    newAuction.priceDrop = auctionDto.priceDrop;
    newAuction.minimumPrice = auctionDto.minimumPrice;
    newAuction.auctionType = auctionDto.auctionType;
    newAuction.completionDate = auctionDto.completionDate;
    newAuction.intervalTime = auctionDto.intervalTime;
    newAuction.createdAt = auctionDto.createdAt;
    // newAuction.seller = auctionDto.seller;
    // newAuction.auctionsProducts = auctionDto.auctionsProducts;
    // newAuction.bids = auctionDto.bids;
    // newAuction.payment = auctionDto.payment;

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
    newAuction.intervalTime = auctionDto.intervalTime
      ? auctionDto.intervalTime
      : null;
    newAuction.createdAt = auctionDto.createdAt;
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
    newAuctionDto.intervalTime = auction.intervalTime;
    newAuctionDto.createdAt = auction.createdAt;
    newAuctionDto.seller = auction.seller
      ? UserDtoConverter.toDto(auction.seller)
      : null;
    newAuctionDto.product = auction.product
      ? ProductDtoConverter.toDto(auction.product)
      : null;
    newAuctionDto.bids = auction.bids
      ? BidDtoConverter.bidsListToDtos(auction.bids)
      : [];
    newAuctionDto.payment = auction.payment
      ? PaymentDtoConverter.toDto(auction.payment)
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
