import { ProductDto } from "../dto/ProductDto";
import { Product } from "../entity/Product";

export class ProductDtoConverter {
  public static toDto(product: Product): ProductDto {
    const newProductDto = new ProductDto();

    newProductDto.id = product.id ? product.id : 0;
    newProductDto.name = product.name;
    newProductDto.description = product.description;
    newProductDto.createdAt = product.createdAt;
    // newProductDto.category = product.category;
    // newProductDto.auctionPRoducts = product.auctionPRoducts;

    return newProductDto;
  }

  public static toEntity(productDto: ProductDto): Product {
    const newProduct = new Product();

    newProduct.name = productDto.name;
    newProduct.description = productDto.description;
    newProduct.createdAt = productDto.createdAt;
    // newProduct.category = productDto.category;
    // newProduct.auctionPRoducts = productDto.auctionPRoducts;

    return newProduct;
  }

  public static productsListToDtos(products: Product[]): ProductDto[] {
    return products.map((product) => this.toDto(product));
  }
}
