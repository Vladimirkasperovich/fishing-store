import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service.js';
import { CartItemsController } from './cart-items.controller.js';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
