import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CategoryService } from "../service/CategoryService";
import { UserService } from "../service/UserService";
import { ProductService } from "../service/ProductService";
import { AuctionRepository } from "../repository/AuctionRepository";
import { CategoryDtoConverter } from "../dto-converter/CategoryDtoConverter";
import { AuctionDtoConverter } from "../dto-converter/AuctionDtoConverter";

import { AuctionDto } from "../dto/AuctionDto";
import { Product } from "../entity/Product";
import { NewAuctionDto } from "../dto/NewAuctionDto";
import { ProductDtoConverter } from "../dto-converter/ProductDtoConverter";
import { Picture } from "../entity/Picture";
import { PictureRepository } from "../repository/PictureRepository";

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
      console.log(error);
    }
  }
}
