import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
  @ApiProperty({ format: "uuid" })
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  image: string;
  @ApiProperty({ type: String, nullable: true, format: "uuid" })
  parentId: string | null;
  @ApiProperty({ type: String, format: "date-time" })
  createdAt: Date;
  @ApiProperty({ type: String, format: "date-time" })
  updatedAt: Date;
}
