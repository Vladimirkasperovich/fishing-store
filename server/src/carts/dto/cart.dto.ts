import { CartItemDto } from "../../cart-items/dto/cart-item.dto.js";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CartDto {
  @ApiProperty({ format: "uuid" })
  id: string;
  @ApiProperty({ format: "uuid" })
  @IsUUID("4")
  userId: string;
  @ApiPropertyOptional({ type: () => CartItemDto, isArray: true })
  items?: CartItemDto[];
  @ApiProperty({ type: String, format: "date-time" })
  createdAt: Date;
  @ApiProperty({ type: String, format: "date-time" })
  updatedAt: Date;
}
