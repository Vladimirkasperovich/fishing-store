import { CartDto } from "../../carts/dto/cart.dto.js";

export class UserDto {
  id: string;
  name: string;
  email: string;
  cart?: CartDto | null;
  createdAt: Date;
  updatedAt: Date;
}
