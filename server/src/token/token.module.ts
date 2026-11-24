import { Module } from "@nestjs/common";
import { TokenService } from "./token.service.js";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ACCESS_TOKEN_EXPIRES_IN } from "./constants/token.constants.js";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>("JWT_ACCESS_SECRET"),
        signOptions: {
          expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        },
      }),
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
