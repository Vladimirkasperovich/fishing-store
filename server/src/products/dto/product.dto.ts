import { CategoryDto } from "../../categories/dto/category.dto.js";
import { Prisma } from "../../generated/prisma/client.js";

export class ProductDto {
  id: string;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: Prisma.Decimal;
  slug: string;
  cartItems: any[];
  categoryId: string;
  category: CategoryDto;
  createdAt: Date;
  updatedAt: Date;
}
