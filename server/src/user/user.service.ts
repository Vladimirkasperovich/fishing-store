import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import type { UserPublic } from "./types/user-public.types.js";
import { CreateUser } from "./types/create-user.types.js";
import { Prisma, User } from "../generated/prisma/client.js";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async create(
    data: CreateUser,
    tx: Prisma.TransactionClient,
    userId?: string,
  ): Promise<UserPublic> {
    const { name, email, passwordHash } = data;

    try {
      return await tx.user.create({
        data: { id: userId, name, email, passwordHash },
        select: { id: true, name: true, email: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new ConflictException(`Пользователь с таким email - ${email}  уже существует`);
        }
      }
      throw e;
    }
  }
}
