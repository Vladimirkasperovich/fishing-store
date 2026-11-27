import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { TokenService } from "../token/token.service.js";
import { REFRESH_TOKEN_TTL_MS } from "../token/constants/token.constants.js";
import { Prisma } from "../generated/prisma/client.js";
import { randomUUID } from "node:crypto";
import { hash } from "argon2";
import type {
  PreparedSession,
  PreparedSessionData,
} from "./types/prepare-session-response.types.js";

@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async create(
    userId: string,
    sessionData: PreparedSessionData,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const { sessionId, expiresAt, refreshTokenHash } = sessionData;
    const client = tx ?? this.prismaService;
    await client.session.create({
      data: {
        id: sessionId,
        userId,
        expiresAt,
        refreshTokenHash,
      },
    });
  }

  async prepare(userId: string): Promise<PreparedSession> {
    const sessionId = randomUUID();
    const accessToken = await this.tokenService.generateAccessToken(userId);
    const refreshToken = await this.tokenService.generateRefreshToken(userId, sessionId);
    const refreshTokenHash = await hash(refreshToken);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

    return {
      sessionData: {
        sessionId,
        refreshTokenHash,
        expiresAt,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
