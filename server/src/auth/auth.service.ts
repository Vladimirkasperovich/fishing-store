import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { UserService } from "../user/user.service.js";
import { AuthServiceResponse } from "./types/auth-service-response.types.js";
import { SessionService } from "../session/session.service.js";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthServiceResponse> {
    const user = await this.userService.create(dto);
    const { accessToken, refreshToken } = await this.sessionService.create(user.id);
    return { accessToken, refreshToken, user };
  }
}
