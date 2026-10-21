import { PickType, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, Length, Matches, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { CategoryDto } from "./category.dto.js";

export class CreateCategoryDto extends PickType(CategoryDto, ["name", "slug", "image"] as const) {
  @IsString()
  @Length(3, 100)
  declare name: string;

  @IsString()
  @Length(3, 100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  declare slug: string;

  @IsString()
  @IsNotEmpty()
  declare image: string;

  @ApiPropertyOptional({ type: String, format: "uuid", nullable: true })
  @IsOptional()
  @IsUUID("4")
  parentId?: string | null;
}
