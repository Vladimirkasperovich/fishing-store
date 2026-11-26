import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { UserService } from "../user/user.service.js";
import { AuthServiceResponse } from "./types/auth-service-response.types.js";
import { SessionService } from "../session/session.service.js";
import { hash } from "argon2";
import { randomUUID } from "node:crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthServiceResponse> {
    const { name, email, password } = dto;
    const userId = randomUUID();
    const passwordHash = await hash(password);
    const preparedSession = await this.sessionService.prepare(userId);

    return this.prismaService.$transaction(async (tx) => {
      const user = await this.userService.create({ name, email, passwordHash }, tx, userId);
      await this.sessionService.create(userId, tx, preparedSession.sessionData);
      return { ...preparedSession.tokens, user };
    });
  }
}
