import { CartDto } from "../../carts/dto/cart.dto.js";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ format: "uuid" })
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: String, example: "test@test.com" })
  email: string;
  @ApiPropertyOptional({ type: () => CartDto, nullable: true })
  cart?: CartDto | null;
  @ApiProperty({ type: String, format: "date-time" })
  createdAt: Date;
  @ApiProperty({ type: String, format: "date-time" })
  updatedAt: Date;
}
