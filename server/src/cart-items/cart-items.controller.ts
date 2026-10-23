import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from "@nestjs/common";

import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";

import { CartItemsService } from "./cart-items.service.js";
import { CreateCartItemDto } from "./dto/create-cart-item.dto.js";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto.js";
import { CartItemDto } from "./dto/cart-item.dto.js";

@ApiTags("Cart Items")
@Controller("cart-items")
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @ApiOperation({ summary: "Add product to cart" })
  @ApiCreatedResponse({
    description: "Cart item created or quantity increased",
    type: CartItemDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid request data",
  })
  @ApiNotFoundResponse({
    description: "Product or cart not found",
  })
  create(@Body() createCartItemDto: CreateCartItemDto): Promise<CartItemDto> {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get cart item by ID" })
  @ApiParam({
    name: "id",
    description: "Cart item UUID",
    format: "uuid",
  })
  @ApiOkResponse({
    description: "Cart item retrieved successfully",
    type: CartItemDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid UUID",
  })
  @ApiNotFoundResponse({
    description: "Cart item not found",
  })
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<CartItemDto> {
    return this.cartItemsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update cart item quantity" })
  @ApiParam({
    name: "id",
    description: "Cart item UUID",
    format: "uuid",
  })
  @ApiOkResponse({
    description: "Cart item quantity updated successfully",
    type: CartItemDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid UUID or quantity",
  })
  @ApiNotFoundResponse({
    description: "Cart item not found",
  })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItemDto> {
    return this.cartItemsService.updateQuantity(id, updateCartItemDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove product from cart" })
  @ApiParam({
    name: "id",
    description: "Cart item UUID",
    format: "uuid",
  })
  @ApiOkResponse({
    description: "Cart item removed successfully",
    type: CartItemDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid UUID",
  })
  @ApiNotFoundResponse({
    description: "Cart item not found",
  })
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<CartItemDto> {
    return this.cartItemsService.remove(id);
  }
}
