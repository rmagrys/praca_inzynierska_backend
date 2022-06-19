import {
  Get,
  JsonController,
  Param,
  Post,
  HttpCode,
  Body,
} from "routing-controllers";
import { Service } from "typedi";
import { CategoryDtoConverter } from "../dto-converter/CategoryDtoConverter";
import { CategoryDto } from "../dto/CategoryDto";
import { Category } from "../entity/Category";
import { CategoryService } from "../service/CategoryService";

@Service()
@JsonController("/api/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async getAllCategories() {
    return this.categoryService
      .getAllCategories()
      .then((category) => CategoryDtoConverter.categoriesListToDtos(category));
  }

  @Get("/:id")
  public async getCategoryById(@Param("id") id: string): Promise<CategoryDto> {
    return this.categoryService
      .getCategoryById(id)
      .then((category) => CategoryDtoConverter.toDto(category));
  }

  @Post()
  @HttpCode(201)
  public async addNewCategory(
    @Body({ validate: true }) categoryDto: CategoryDto
  ): Promise<CategoryDto> {
    const category: Category = CategoryDtoConverter.toEntity(categoryDto);

    return await this.categoryService
      .saveCategory(category)
      .then((category: Category) => CategoryDtoConverter.toDto(category));
  }
}
