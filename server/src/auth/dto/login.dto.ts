import { RegisterDto } from "./register.dto.js";
import { OmitType } from "@nestjs/mapped-types";

export class LoginDto extends OmitType(RegisterDto, ["name"] as const) {}
