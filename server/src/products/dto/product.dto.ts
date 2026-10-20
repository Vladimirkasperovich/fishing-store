import { CategoryDto } from "../../categories/dto/category.dto.js";
import { Prisma } from "../../generated/prisma/client.js";
import { CartItemDto } from "../../cart-items/dto/cart-item.dto.js";

export class ProductDto {
  id: string;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: Prisma.Decimal;
  slug: string;
  cartItems: CartItemDto[];
  categoryId: string;
  category: CategoryDto;
  createdAt: Date;
  updatedAt: Date;
}
