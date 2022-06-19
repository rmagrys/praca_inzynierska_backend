import {
  Get,
  JsonController,
  Param,
  Post,
  HttpCode,
  Body,
  QueryParam,
  Authorized,
} from "routing-controllers";
import { Service } from "typedi";
import { AuctionDtoConverter } from "../dto-converter/AuctionDtoConverter";
import { AuctionDto } from "../dto/AuctionDto";
import { NewAuctionDto } from "../dto/NewAuctionDto";
import { Auction } from "../entity/Auction";
import { AuctionService } from "../service/AuctionService";
import { AuctionFacade } from "../facade/AuctionFacade";
import { AuctionType } from "../enum/AuctionType";
import { PaymentDto } from "../dto/PaymentDto";
import { PaymentDtoConverter } from "../dto-converter/PaymentDtoConverter";
import { Payment } from "../entity/Payment";

@Service()
@JsonController("/api/auction")
export class AuctionController {
  constructor(
    private readonly auctionFacade: AuctionFacade,
    private readonly auctionService: AuctionService
  ) {}

  @Get()
  @Authorized()
  public async getAllAuctionsWithIncludables(): Promise<AuctionDto[]> {
    return this.auctionService
      .getAllAuctionsWithIncludables()
      .then((auction: Auction[]) =>
        AuctionDtoConverter.auctionsListToDtosWithIncludables(auction)
      );
  }

  @Get("/category-id/:id")
  @Authorized()
  public async getAllFilteredAuctionsWithIncludables(
    @Param("id") categoryId: string,
    @QueryParam("auction-type") auctionType?: AuctionType
  ): Promise<AuctionDto[]> {
    return this.auctionService
      .getAllFilteredAuctionsWithIncludables(categoryId, auctionType)
      .then((auction: Auction[]) =>
        AuctionDtoConverter.auctionsListToDtosWithIncludables(auction)
      );
  }

  @Get("/:id")
  @Authorized()
  public async getAuctionById(@Param("id") id: string): Promise<AuctionDto> {
    return this.auctionService
      .getAuctionByIdWithIncludables(id)
      .then((auction: Auction) =>
        AuctionDtoConverter.toDtoWithIncludables(auction)
      );
  }

  @Post("/user/:id")
  @HttpCode(201)
  @Authorized()
  public async addNewAuction(
    @Body({ validate: true }) newAuctionDto: NewAuctionDto,
    @Param("id") id: string
  ): Promise<AuctionDto> {
    return await this.auctionFacade
      .addNewAuction(newAuctionDto, id)
      .then((auction: Auction) => AuctionDtoConverter.toDto(auction));
  }

  @Get("/user/:id")
  @Authorized()
  public async getAllUserAuctionsWithIncludables(
    @Param("id") userId: string
  ): Promise<AuctionDto[]> {
    return await this.auctionService
      .getAllUserAuctionsWithIncludables(userId)
      .then((auctions: Auction[]) =>
        AuctionDtoConverter.auctionsListToDtosWithIncludables(auctions)
      );
  }

  @Get("/user/:id")
  @Authorized()
  public async getAllUserAuctionsWithIncludablesByAuctionType(
    @Param("id") userId: string,
    @QueryParam("auction-type") auctionType?: AuctionType
  ): Promise<AuctionDto[]> {
    console.log("here");

    return await this.auctionService
      .getAllUserAuctionsWithIncludablesAndAcutionType(userId, auctionType)
      .then((auctions: Auction[]) =>
        AuctionDtoConverter.auctionsListToDtosWithIncludables(auctions)
      );
  }

  @Get("/category/:categoryId/user/:userId")
  @Authorized()
  public async getAllUserAuctionsWithIncludablesByCategory(
    @Param("categoryId") categoryId: string,
    @Param("userId") userId: string,
    @QueryParam("auction-type") auctionType?: AuctionType
  ): Promise<AuctionDto[]> {
    return await this.auctionService
      .getAllUserAuctionsWithIncludablesByCategory(
        userId,
        categoryId,
        auctionType
      )
      .then((auctions: Auction[]) =>
        AuctionDtoConverter.auctionsListToDtosWithIncludables(auctions)
      );
  }

  @Post("/:auctionId/user/:userId/payment")
  @Authorized()
  public async confirmPaymentForAuction(
    @Param("auctionId") auctionId: string,
    @Param("userId") userId: string,
    @Body({ validate: true }) paymentDto: PaymentDto
  ): Promise<AuctionDto> {
    const newPayment = PaymentDtoConverter.toEntity(paymentDto);
    return this.auctionFacade
      .handlePayment(newPayment, auctionId, userId)
      .then((auction: Auction) =>
        AuctionDtoConverter.toDtoWithIncludables(auction)
      );
  }
}
