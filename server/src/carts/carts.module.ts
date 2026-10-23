import { Module } from "@nestjs/common";
import { CartsService } from "./carts.service.js";
import { CartsController } from "./carts.controller.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { UsersModule } from "../users/users.module.js";

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
