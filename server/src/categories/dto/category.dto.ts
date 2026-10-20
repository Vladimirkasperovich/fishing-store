import { ProductDto } from "../../products/dto/product.dto.js";

export class CategoryDto {
  id: string;
  name: string;
  slug: string;
  image: string;
  products: ProductDto[];
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
