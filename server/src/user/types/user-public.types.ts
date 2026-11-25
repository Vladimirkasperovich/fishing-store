import { User } from "../../generated/prisma/client.js";

export type UserPublic = Pick<User, "id" | "name" | "email">;
