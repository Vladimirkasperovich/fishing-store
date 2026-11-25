import { Controller } from '@nestjs/common';
import { CartItemService } from './cart-item.service.js';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}
}
