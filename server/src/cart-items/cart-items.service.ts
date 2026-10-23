import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartItemDto } from "./dto/create-cart-item.dto.js";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { CartsService } from "../carts/carts.service.js";
import { ProductsService } from "../products/products.service.js";
import { CartItemDto } from "./dto/cart-item.dto.js";

@Injectable()
export class CartItemsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cartService: CartsService,
    private readonly productService: ProductsService,
  ) {}
  async create(createCartItemDto: CreateCartItemDto): Promise<CartItemDto> {
    await this.productService.findOne(createCartItemDto.productId);
    await this.cartService.findOne(createCartItemDto.cartId);
    return this.prismaService.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: createCartItemDto.cartId,
          productId: createCartItemDto.productId,
        },
      },
      update: {
        quantity: {
          increment: createCartItemDto.quantity,
        },
      },
      create: createCartItemDto,
    });
  }

  async findOne(id: string): Promise<CartItemDto> {
    const cartItem = await this.prismaService.cartItem.findUnique({ where: { id } });
    if (!cartItem) throw new NotFoundException("Cart item not found");
    return cartItem;
  }

  async updateQuantity(id: string, updateCartItemDto: UpdateCartItemDto): Promise<CartItemDto> {
    await this.findOne(id);
    return this.prismaService.cartItem.update({ where: { id }, data: updateCartItemDto });
  }

  async remove(id: string): Promise<CartItemDto> {
    await this.findOne(id);
    return this.prismaService.cartItem.delete({ where: { id } });
  }
}
