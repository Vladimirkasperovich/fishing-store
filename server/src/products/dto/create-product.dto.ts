import { OmitType } from "@nestjs/swagger";
import { IsInt, IsString, IsUUID, Length, Matches, Min } from "class-validator";
import { ProductDto } from "./product.dto.js";

export class CreateProductDto extends OmitType(ProductDto, [
  "id",
  "createdAt",
  "updatedAt",
] as const) {
  @IsString()
  @Length(3, 100)
  declare name: string;

  @IsString()
  @Length(10, 2000)
  declare description: string;

  @IsString()
  @Length(1, 500)
  declare image: string;

  @IsInt()
  @Min(0)
  declare quantity: number;

  @IsString()
  @Matches(/^\d{1,8}\.\d{2}$/, {
    message: "Price must have format 129.99",
  })
  declare price: string;

  @IsString()
  @Length(3, 100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  declare slug: string;

  @IsUUID("4")
  declare categoryId: string;
}
