import { SessionResponse } from "./session-response.types.js";

export interface PreparedSessionData {
  sessionId: string;
  refreshTokenHash: string;
  expiresAt: Date;
}

export interface PreparedSession {
  tokens: SessionResponse;
  sessionData: PreparedSessionData;
}
