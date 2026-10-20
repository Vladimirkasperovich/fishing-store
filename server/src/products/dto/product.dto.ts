import { CartItemDto } from "../../cart-items/dto/cart-item.dto.js";

export class ProductDto {
  id: string;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: string;
  slug: string;
  cartItems?: CartItemDto[];
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
