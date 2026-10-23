import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class GetProductsQueryDto {
  @ApiPropertyOptional({
    description: "Filter products by category ID",
    format: "uuid",
  })
  @IsOptional()
  @IsUUID("4")
  categoryId?: string;
  @ApiPropertyOptional({
    description: "Search products by name",
  })
  @IsOptional()
  @IsString()
  search?: string;
  @ApiPropertyOptional({
    description: "Page number",
    default: 1,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;
  @ApiPropertyOptional({
    description: "Products per page",
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
