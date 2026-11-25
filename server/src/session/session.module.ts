import { Module } from "@nestjs/common";
import { SessionService } from "./session.service.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { TokenModule } from "../token/token.module.js";

@Module({
  imports: [PrismaModule, TokenModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
