import { PickType } from "@nestjs/swagger";
import { CartItemDto } from "./cart-item.dto.js";

export class CreateCartItemDto extends PickType(CartItemDto, [
  "cartId",
  "productId",
  "quantity",
] as const) {}
