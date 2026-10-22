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
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: "Create category" })
  @ApiCreatedResponse({ description: "Category has been successfully created", type: CategoryDto })
  @ApiConflictResponse({
    description: "Category slug already exists",
  })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Get categories" })
  @ApiOkResponse({ type: CategoryDto, isArray: true })
  findAll(): Promise<CategoryDto[]> {
    return this.categoriesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get category by id" })
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
  @ApiOperation({ summary: "Update category" })
  @ApiParam({
    name: "id",
    type: String,
    format: "uuid",
    description: "UUID category",
  })
  @ApiOkResponse({
    description: "Category updated successfully",
    type: CategoryDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid UUID or request body",
  })
  @ApiNotFoundResponse({
    description: "Category or parent category not found",
  })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete category" })
  @ApiParam({
    name: "id",
    type: String,
    format: "uuid",
    description: "UUID category",
  })
  @ApiOkResponse({
    description: "Category deleted successfully",
    type: CategoryDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid category UUID",
  })
  @ApiNotFoundResponse({
    description: "Category not found",
  })
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<CategoryDto> {
    return this.categoriesService.remove(id);
  }
}
