import { SessionResponse } from "../../session/types/session-response.types.js";
import { UserPublic } from "../../user/types/user-public.types.js";

export interface AuthServiceResponse extends SessionResponse {
  user: UserPublic;
}
