import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { TokenService } from "../token/token.service.js";
import { hash } from "argon2";

@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async create(userId: string): Promise<any> {
    const session = await this.prismaService.session.create({
      data: { userId, expiresAt: new Date(Date.now()), refreshTokenHash: await hash("") },
    });
    const accessToken = await this.tokenService.generateAccessToken(userId);
    const refreshToken = await this.tokenService.generateRefreshToken(userId, session.id);

    return {
      accessToken,
      refreshToken,
    };
  }
}
