import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from "@nestjs/common";
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
  @ApiOkResponse({
    description: "List of all products",
    type: ProductDto,
    isArray: true,
  })
  findAll(): Promise<ProductDto[]> {
    return this.productsService.findAll();
  }

  @Get(":id")
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
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
