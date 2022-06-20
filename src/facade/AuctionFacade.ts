import { BadRequestError, NotFoundError } from "routing-controllers";
import { Service } from "typedi";

import { InjectRepository } from "typeorm-typedi-extensions";
import { CategoryService } from "../service/CategoryService";
import { UserService } from "../service/UserService";
import { ProductService } from "../service/ProductService";
import { AuctionRepository } from "../repository/AuctionRepository";
import { AuctionDtoConverter } from "../dto-converter/AuctionDtoConverter";
import { NewAuctionDto } from "../dto/NewAuctionDto";
import { ProductDtoConverter } from "../dto-converter/ProductDtoConverter";
import { Picture } from "../entity/Picture";
import { PictureRepository } from "../repository/PictureRepository";
import { Payment } from "../entity/Payment";
import { Auction } from "../entity/Auction";

@Service()
export class AuctionFacade {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    @InjectRepository() private readonly pictureRepository: PictureRepository,
    @InjectRepository() private readonly auctionRepository: AuctionRepository
  ) {}

  async addNewAuction(newAuctionDto: NewAuctionDto, userId: string) {
    const { categoryId, product, imagesUrls, ...auction } = newAuctionDto;

    try {
      const category = await this.categoryService.getCategoryById(categoryId);
      const user = await this.userService.findOneUser(userId);

      const productEntity = ProductDtoConverter.toEntity(product);
      const auctionEntity = AuctionDtoConverter.partialToEntity(auction);
      const picturesEntities: Picture[] = imagesUrls.map((url) => {
        const picture = new Picture();
        picture.url = url;
        picture.createdAt = new Date();
        return picture;
      });

      productEntity.category = category;
      const newProduct = await this.productService.saveProduct(productEntity);
      const newPictures = await this.pictureRepository.save(picturesEntities);

      auctionEntity.createdAt = new Date();
      auctionEntity.product = newProduct;
      auctionEntity.seller = user;
      auctionEntity.pictures = newPictures;

      return this.auctionRepository.save(auctionEntity);
    } catch (error) {
      throw new BadRequestError(error);
    }
  }

  async handlePayment(
    payment: Payment,
    auctionId: string,
    userId: string
  ): Promise<Auction> {
    const user = await this.userService.findOneUser(userId);
    const auction = await this.auctionRepository.findOne(auctionId);

    if (!user) {
      throw new NotFoundError("Nie ma takiego użytkownika");
    }

    if (!auction) {
      throw new NotFoundError("Nie ma takiej aukcji");
    }

    payment.createdAt = new Date();
    payment.auction = auction;
    payment.buyer = user;

    auction.payment = payment;
    auction.completionDate = new Date();

    return this.auctionRepository.save(auction);
  }
}
