import { Module } from "@nestjs/common";
import { SessionService } from "./session.service.js";

@Module({
  providers: [SessionService],
})
export class SessionModule {}
