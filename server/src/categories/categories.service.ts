import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto.js";
import { UpdateCategoryDto } from "./dto/update-category.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { CategoryDto } from "./dto/category.dto.js";
import { Prisma } from "../generated/prisma/client.js";

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    try {
      if (createCategoryDto.parentId != null) {
        await this.findOne(createCategoryDto.parentId);
      }
      return await this.prismaService.category.create({ data: createCategoryDto });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        throw new ConflictException("Category slug already exists");
      }
      throw e;
    }
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
