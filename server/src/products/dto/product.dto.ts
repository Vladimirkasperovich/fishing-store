import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: String, example: "129.99" })
  price: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ format: "uuid" })
  categoryId: string;

  @ApiProperty({ type: String, format: "date-time" })
  createdAt: Date;

  @ApiProperty({ type: String, format: "date-time" })
  updatedAt: Date;
}
