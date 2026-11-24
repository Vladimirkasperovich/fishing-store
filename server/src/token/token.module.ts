import { Module } from '@nestjs/common';
import { TokenService } from './token.service.js';
import { TokenController } from './token.controller.js';

@Module({
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
