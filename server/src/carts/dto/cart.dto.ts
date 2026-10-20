import { CartItemDto } from "../../cart-items/dto/cart-item.dto.js";

export class CartDto {
  id: string;
  userId: string;
  items?: CartItemDto[];
  createdAt: Date;
  updatedAt: Date;
}
