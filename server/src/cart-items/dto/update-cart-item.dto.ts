import { PartialType } from '@nestjs/mapped-types';
import { CreateCartItemDto } from './create-cart-item.dto.js';

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {}
