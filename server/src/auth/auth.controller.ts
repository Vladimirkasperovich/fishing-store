import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import type { Response } from "express";
import { AuthResponse } from "./types/auth-response.types.js";
import { REFRESH_TOKEN_TTL_MS } from "../token/constants/token.constants.js";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const { accessToken, refreshToken, user } = await this.authService.register(body);
    this.setRefreshTokenCookie(refreshToken, response);
    return {
      accessToken,
      user,
    };
  }

  private setRefreshTokenCookie(refreshToken: string, response: Response): void {
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/auth",
      maxAge: REFRESH_TOKEN_TTL_MS,
    });
  }
}
