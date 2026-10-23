import { PickType } from "@nestjs/swagger";
import { CartDto } from "./cart.dto.js";

export class CreateCartDto extends PickType(CartDto, ["userId"] as const) {}
