import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import type { UserPublic } from "./types/user-public.types.js";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<UserPublic | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
