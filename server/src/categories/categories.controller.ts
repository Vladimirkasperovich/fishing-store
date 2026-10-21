import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from "@nestjs/common";
import { CategoriesService } from "./categories.service.js";
import { CreateCategoryDto } from "./dto/create-category.dto.js";
import { UpdateCategoryDto } from "./dto/update-category.dto.js";
import { CategoryDto } from "./dto/category.dto.js";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({ description: "Category has been successfully created", type: CategoryDto })
  @ApiConflictResponse({
    description: "Category slug already exists",
  })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({ type: CategoryDto, isArray: true })
  findAll(): Promise<CategoryDto[]> {
    return this.categoriesService.findAll();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    type: String,
    format: "uuid",
    description: "UUID category",
  })
  @ApiBadRequestResponse({
    description: "Invalid category UUID",
  })
  @ApiNotFoundResponse({
    description: "Category not found",
  })
  @ApiOkResponse({ type: CategoryDto })
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<CategoryDto> {
    return this.categoriesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }
}
