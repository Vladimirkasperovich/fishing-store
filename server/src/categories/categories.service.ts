import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto.js";
import { UpdateCategoryDto } from "./dto/update-category.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { CategoryDto } from "./dto/category.dto.js";

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    if (createCategoryDto.parentId != null) {
      await this.findOne(createCategoryDto.parentId);
    }
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

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    await this.findOne(id);

    if (updateCategoryDto.parentId !== undefined && updateCategoryDto.parentId !== null) {
      let currentParentId: string | null = updateCategoryDto.parentId;

      while (currentParentId !== null) {
        if (currentParentId === id) {
          throw new BadRequestException("Category cannot be moved into itself or its descendants");
        }

        const parent: CategoryDto = await this.findOne(currentParentId);

        currentParentId = parent.parentId;
      }
    }

    return this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string): Promise<CategoryDto> {
    await this.findOne(id);
    const count = await this.prismaService.category.count({ where: { parentId: id } });
    if (count > 0) {
      throw new ConflictException("Category has child categories");
    }
    return this.prismaService.category.delete({ where: { id } });
  }
}
