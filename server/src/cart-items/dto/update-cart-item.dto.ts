import { CreateCartItemDto } from "./create-cart-item.dto.js";
import { PickType } from "@nestjs/swagger";

export class UpdateCartItemDto extends PickType(CreateCartItemDto, ["quantity"] as const) {}
