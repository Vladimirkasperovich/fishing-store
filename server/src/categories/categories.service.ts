import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto.js";
import { UpdateCategoryDto } from "./dto/update-category.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { CategoryDto } from "./dto/category.dto.js";

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return this.prismaService.category.create({ data: createCategoryDto });
  }

  findAll(): Promise<CategoryDto[]> {
    return this.prismaService.category.findMany();
  }

  async findOne(id: string): Promise<CategoryDto> {
    const category = await this.prismaService.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException("Category not found");
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
