import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { UserDto } from "./dto/user.dto.js";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({
    name: "id",
    description: "User UUID",
    format: "uuid",
  })
  @ApiOkResponse({
    description: "User retrieved successfully",
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid UUID",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }
}
