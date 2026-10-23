import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDto } from "./dto/user.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, cart: true, createdAt: true, updatedAt: true },
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }
}
