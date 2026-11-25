import { AuthServiceResponse } from "./auth-service-response.types.js";

export type AuthResponse = Omit<AuthServiceResponse, "refreshToken">;
