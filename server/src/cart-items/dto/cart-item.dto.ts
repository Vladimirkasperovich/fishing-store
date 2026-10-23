import { ApiProperty } from "@nestjs/swagger";

export class CartItemDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty({ format: "uuid" })
  cartId: string;

  @ApiProperty({ type: Number, example: 2 })
  quantity: number;

  @ApiProperty({ format: "uuid" })
  productId: string;

  @ApiProperty({ type: String, format: "date-time" })
  createdAt: Date;

  @ApiProperty({ type: String, format: "date-time" })
  updatedAt: Date;
}
