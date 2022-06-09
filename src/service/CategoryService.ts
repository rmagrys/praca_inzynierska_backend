import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Category } from "../entity/Category";
import { CategoryRepository } from "../repository/CategoryRepository";

@Service()
export class CategoryService {
  constructor(
    @InjectRepository() private readonly categoryRepository: CategoryRepository
  ) {}

  async getCategoryById(id: string): Promise<Category> {
    return this.categoryRepository.findOneOrFail(id);
  }

  async getAllCategories() {
    return this.categoryRepository.find();
  }

  async saveCategory(category: Category) {
    category.createdAt = new Date();
    return this.categoryRepository.save(category);
  }
}
