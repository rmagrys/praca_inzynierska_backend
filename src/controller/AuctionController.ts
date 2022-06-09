import {
  Get,
  JsonController,
  Param,
  Post,
  HttpCode,
  Body,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { AuctionDtoConverter } from "../dto-converter/AuctionDtoConverter";
import { AuctionDto } from "../dto/AuctionDto";
import { NewAuctionDto } from "../dto/NewAuctionDto";
import { Auction } from "../entity/Auction";
import { AuctionService } from "../service/AuctionService";
import { AuctionFacade } from "../facade/AuctionFacade";
import { AuctionType } from "../enum/AuctionType";

@Service()
@JsonController("/api/auction")
export class AuctionController {
  constructor(
    private readonly auctionFacade: AuctionFacade,
    private readonly auctionService: AuctionService
  ) {}

  @Get()
  public async getAllAuctionsWithIncludables(): Promise<AuctionDto[]> {
    return this.auctionService
      .getAllAuctionsWithIncludables()
      .then((auction: Auction[]) =>
        AuctionDtoConverter.auctionsListToDtosWithIncludables(auction)
      );
  }

  @Get("/category-id/:id")
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
  public async getCategoryById(@Param("id") id: string): Promise<AuctionDto> {
    return this.auctionService
      .getAuctionByIdWithIncludables(id)
      .then((auction: Auction) =>
        AuctionDtoConverter.toDtoWithIncludables(auction)
      );
  }

  @Post("/user/:id")
  @HttpCode(201)
  public async addNewAuction(
    @Body({ validate: true }) newAuctionDto: NewAuctionDto,
    @Param("id") id: string
  ): Promise<AuctionDto> {
    console.log(newAuctionDto);

    return await this.auctionFacade
      .addNewAuction(newAuctionDto, id)
      .then((auction: Auction) => AuctionDtoConverter.toDto(auction));
  }
}
