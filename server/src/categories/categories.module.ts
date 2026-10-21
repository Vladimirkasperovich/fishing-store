import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service.js";
import { CategoriesController } from "./categories.controller.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { PrismaModule } from "../prisma/prisma.module.js";

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [PrismaModule],
})
export class CategoriesModule {}
