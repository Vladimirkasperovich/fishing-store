import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { AccessTokenPayload } from "./types/access-token-payload.types.js";
import { RefreshTokenPayload } from "./types/refresh-token-payload.types.js";
import { ConfigService } from "@nestjs/config";
import { REFRESH_TOKEN_EXPIRES_IN } from "./constants/token.constants.js";
import { randomUUID } from "node:crypto";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(userId: string): Promise<string> {
    const payload: AccessTokenPayload = { sub: userId, type: "access" };
    return this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(userId: string, sessionId: string): Promise<string> {
    const payload: RefreshTokenPayload = {
      sub: userId,
      sid: sessionId,
      jti: randomUUID(),
      type: "refresh",
    };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  async verifyAccessToken(accessToken: string): Promise<AccessTokenPayload> {
    let payload: AccessTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<AccessTokenPayload>(accessToken);
    } catch {
      throw new UnauthorizedException("Невалидный access token");
    }

    if (typeof payload.sub !== "string" || payload.sub.length === 0 || payload.type !== "access") {
      throw new UnauthorizedException("Невалидный access token");
    }
    return payload;
  }

  async verifyRefreshToken(refreshToken: string): Promise<RefreshTokenPayload> {
    const secret = this.configService.getOrThrow<string>("JWT_REFRESH_SECRET");
    let payload: RefreshTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(refreshToken, { secret });
    } catch {
      throw new UnauthorizedException("Невалидный или истекший refresh token");
    }

    if (
      typeof payload.sub !== "string" ||
      payload.sub.length === 0 ||
      typeof payload.sid !== "string" ||
      payload.sid.length === 0 ||
      typeof payload.jti !== "string" ||
      payload.jti.length === 0 ||
      payload.type !== "refresh"
    ) {
      throw new UnauthorizedException("Невалидный refresh token");
    }

    return payload;
  }
}
