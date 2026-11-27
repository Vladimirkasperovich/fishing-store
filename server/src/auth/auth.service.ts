import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { UserService } from "../user/user.service.js";
import type { AuthServiceResponse } from "./types/auth-service-response.types.js";
import { SessionService } from "../session/session.service.js";
import { hash, verify } from "argon2";
import { randomUUID } from "node:crypto";
import { LoginDto } from "./dto/login.dto.js";
import { UserPublic } from "../user/types/user-public.types.js";

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
      await this.sessionService.create(userId, preparedSession.sessionData, tx);
      return { ...preparedSession.tokens, user };
    });
  }

  async login(dto: LoginDto): Promise<AuthServiceResponse> {
    const { id, name, email } = await this.validateCredentials(dto.email, dto.password);
    const { tokens, sessionData } = await this.sessionService.prepare(id);
    await this.sessionService.create(id, sessionData);

    return {
      ...tokens,
      user: { id, name, email },
    };
  }

  async refresh() {}

  private async validateCredentials(email: string, password: string): Promise<UserPublic> {
    const existedUser = await this.userService.findByEmail(email);

    if (!existedUser || !(await verify(existedUser.passwordHash, password))) {
      throw new UnauthorizedException("Неверный email или пароль");
    }

    return {
      id: existedUser.id,
      name: existedUser.name,
      email: existedUser.email,
    };
  }
}
