import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service.js";
import { ProductsController } from "./products.controller.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { CategoriesModule } from "../categories/categories.module.js";

@Module({
  imports: [PrismaModule, CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
