import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { TokenService } from "../token/token.service.js";
import { hash } from "argon2";
import type { SessionResponse } from "./types/session-response.types.js";
import { randomUUID } from "node:crypto";
import { REFRESH_TOKEN_TTL_MS } from "../token/constants/token.constants.js";

@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async create(userId: string): Promise<SessionResponse> {
    const sessionId = randomUUID();
    const accessToken = await this.tokenService.generateAccessToken(userId);
    const refreshToken = await this.tokenService.generateRefreshToken(userId, sessionId);
    const refreshTokenHash = await hash(refreshToken);

    await this.prismaService.session.create({
      data: {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        refreshTokenHash,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
