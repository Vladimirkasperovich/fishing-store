import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import { CartsService } from "./carts.service.js";
import { CreateCartDto } from "./dto/create-cart.dto.js";
import { CartDto } from "./dto/cart.dto.js";

@ApiTags("Carts")
@Controller("carts")
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiOperation({ summary: "Create a cart for a user" })
  @ApiCreatedResponse({
    description: "Cart created successfully",
    type: CartDto,
  })
  @ApiBadRequestResponse({ description: "Invalid request data" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiConflictResponse({ description: "User already has a cart" })
  create(@Body() createCartDto: CreateCartDto): Promise<CartDto> {
    return this.cartsService.create(createCartDto);
  }

  @Get("user/:id")
  @ApiOperation({ summary: "Get cart by user ID" })
  @ApiParam({
    name: "id",
    description: "User UUID",
    format: "uuid",
  })
  @ApiOkResponse({
    description: "User cart retrieved successfully",
    type: CartDto,
  })
  @ApiBadRequestResponse({ description: "Invalid user UUID" })
  @ApiNotFoundResponse({ description: "User not found" })
  findByUserId(@Param("id", ParseUUIDPipe) id: string): Promise<CartDto | null> {
    return this.cartsService.findByUserId(id);
  }
}
