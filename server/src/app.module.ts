import { Module } from "@nestjs/common";

import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";
import { PrismaModule } from "./prisma/prisma.module.js";
import { ConfigModule } from "@nestjs/config";
import { CategoriesModule } from "./categories/categories.module.js";
import { ProductsModule } from "./products/products.module.js";
import { CartItemsModule } from "./cart-items/cart-items.module.js";
import { UsersModule } from './users/users.module.js';
import { CartsModule } from './carts/carts.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public"),
      serveRoot: "/",
    }),
    PrismaModule,
    CategoriesModule,
    ProductsModule,
    CartItemsModule,
    UsersModule,
    CartsModule,
  ],
})
export class AppModule {}
