import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";
import { PrismaModule } from "./prisma/prisma.module.js";
import { ConfigModule } from "@nestjs/config";
import { SessionModule } from "./session/session.module.js";
import { TokenModule } from "./token/token.module.js";
import { AuthModule } from "./auth/auth.module.js";
import { UserModule } from "./user/user.module.js";
import { CartModule } from "./cart/cart.module.js";
import { CartItemModule } from "./cart-item/cart-item.module.js";
import { ProductModule } from "./product/product.module.js";
import { CategoryModule } from "./category/category.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public"),
      serveRoot: "/",
    }),
    PrismaModule,
    SessionModule,
    TokenModule,
    AuthModule,
    UserModule,
    CartModule,
    CartItemModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
