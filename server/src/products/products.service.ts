import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { ProductDto } from "./dto/product.dto.js";
import { CategoriesService } from "../categories/categories.service.js";

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoriesService: CategoriesService,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    await this.categoriesService.findOne(createProductDto.categoryId);

    const product = await this.prismaService.product.create({
      data: createProductDto,
    });

    return { ...product, price: product.price.toString() };
  }

  async findAll(categoryId?: string, search?: string, page = 1, limit = 10): Promise<ProductDto[]> {
    const products = await this.prismaService.product.findMany({
      where: { categoryId, name: { contains: search, mode: "insensitive" } },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    return products.map((product) => ({ ...product, price: product.price.toString() }));
  }

  async findOne(id: string): Promise<ProductDto> {
    const product = await this.prismaService.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return { ...product, price: product.price.toString() };
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductDto> {
    await this.findOne(id);

    if (updateProductDto.categoryId) {
      await this.categoriesService.findOne(updateProductDto.categoryId);
    }

    const product = await this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });

    return { ...product, price: product.price.toString() };
  }

  async remove(id: string): Promise<ProductDto> {
    await this.findOne(id);
    const product = await this.prismaService.product.delete({ where: { id } });

    return { ...product, price: product.price.toString() };
  }
}
