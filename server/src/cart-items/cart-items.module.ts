import { Module } from "@nestjs/common";
import { CartItemsService } from "./cart-items.service.js";
import { CartItemsController } from "./cart-items.controller.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { ProductsModule } from "../products/products.module.js";
import { CartsModule } from "../carts/carts.module.js";

@Module({
  imports: [PrismaModule, ProductsModule, CartsModule],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
