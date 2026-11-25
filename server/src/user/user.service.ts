import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import type { UserPublic } from "./types/user-public.types.js";
import { CreateUser } from "./types/create-user.types.js";
import { hash } from "argon2";
import { Prisma } from "../generated/prisma/client.js";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<UserPublic | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true },
    });
  }

  async create(data: CreateUser): Promise<UserPublic> {
    const { name, email, password } = data;
    const passwordHash = await hash(password);

    let user: UserPublic;

    try {
      user = await this.prismaService.user.create({
        data: { name, email, passwordHash },
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
    return user;
  }
}
