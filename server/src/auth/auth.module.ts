import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { UserModule } from "../user/user.module.js";
import { SessionModule } from "../session/session.module.js";

@Module({
  imports: [PrismaModule, UserModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
