import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from "@nestjs/common";
import { ProductsService } from "./products.service.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";
import { ProductDto } from "./dto/product.dto.js";
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
import { GetProductsQueryDto } from "./dto/get-products-query.dto.js";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Create product" })
  @ApiCreatedResponse({
    description: "Product created successfully",
    type: ProductDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid product data",
  })
  @ApiNotFoundResponse({
    description: "Category not found",
  })
  @ApiConflictResponse({
    description: "Product slug already exists",
  })
  create(@Body() createProductDto: CreateProductDto): Promise<ProductDto> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: "Get products" })
  @ApiOkResponse({
    description: "List of products",
    type: ProductDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: "Invalid query parameters",
  })
  findAll(@Query() query: GetProductsQueryDto): Promise<ProductDto[]> {
    const { categoryId, search, page, limit } = query;
    return this.productsService.findAll(categoryId, search, page, limit);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get product by id" })
  @ApiParam({
    name: "id",
    type: String,
    format: "uuid",
  })
  @ApiOkResponse({
    description: "Product found successfully",
    type: ProductDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid product UUID",
  })
  @ApiNotFoundResponse({
    description: "Product not found",
  })
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<ProductDto> {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update product" })
  @ApiParam({
    name: "id",
    type: String,
    format: "uuid",
  })
  @ApiOkResponse({
    description: "Product updated successfully",
    type: ProductDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid product data or UUID",
  })
  @ApiNotFoundResponse({
    description: "Product or category not found",
  })
  @ApiConflictResponse({
    description: "Product slug already exists",
  })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete product" })
  @ApiParam({
    name: "id",
    type: String,
    format: "uuid",
  })
  @ApiOkResponse({
    description: "Product deleted successfully",
    type: ProductDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid product UUID",
  })
  @ApiNotFoundResponse({
    description: "Product not found",
  })
  @ApiConflictResponse({
    description: "Product cannot be deleted because it is in use",
  })
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<ProductDto> {
    return this.productsService.remove(id);
  }
}
