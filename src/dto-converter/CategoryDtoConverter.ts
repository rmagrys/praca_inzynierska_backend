import { CategoryDto } from "../dto/CategoryDto";
import { Category } from "../entity/Category";

export class CategoryDtoConverter {
  public static toDto(category: Category): CategoryDto {
    const newCategoryDto = new CategoryDto();

    newCategoryDto.id = category.id ? category.id : 0;
    newCategoryDto.name = category.name;
    newCategoryDto.description = category.description;
    newCategoryDto.createdAt = category.createdAt;
    // newCategoryDto.products = category.products;

    return newCategoryDto;
  }

  public static toEntity(categoryDto: CategoryDto): Category {
    const newCategory = new Category();

    newCategory.name = categoryDto.name;
    newCategory.description = categoryDto.description;
    newCategory.createdAt = categoryDto.createdAt;
    // newCategory.products = categoryDto.products;

    return newCategory;
  }

  public static categoriesListToDtos(categories: Category[]): CategoryDto[] {
    return categories.map((category) => this.toDto(category));
  }
}
