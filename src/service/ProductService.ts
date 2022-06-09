import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Product } from "../entity/Product";
import { ProductRepository } from "../repository/ProductRepository";

@Service()
export class ProductService {
  constructor(
    @InjectRepository() private readonly productRepository: ProductRepository
  ) {}

  async getProductById(id: string): Promise<Product> {
    return this.productRepository.findOneOrFail(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async saveProduct(product: Product) {
    product.createdAt = new Date();
    return this.productRepository.save(product);
  }
}
