import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto.js";
import { CartDto } from "./dto/cart.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { UsersService } from "../users/users.service.js";

@Injectable()
export class CartsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}
  async create(createCartDto: CreateCartDto): Promise<CartDto> {
    await this.userService.findOne(createCartDto.userId);
    return this.prismaService.cart.create({ data: createCartDto });
  }

  async findByUserId(id: string): Promise<CartDto | null> {
    await this.userService.findOne(id);
    return this.prismaService.cart.findUnique({
      where: { userId: id },
      include: { items: true },
    });
  }

  async findOne(id: string): Promise<CartDto> {
    const cart = await this.prismaService.cart.findUnique({ where: { id } });
    if (!cart) throw new NotFoundException("Cart not found");
    return cart;
  }
}
