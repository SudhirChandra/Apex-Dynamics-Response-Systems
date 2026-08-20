import type { Capability } from "./envelope";

export interface Identity {
  readonly actorId: string;
  readonly sessionId: string;
  readonly roles: readonly string[];
  readonly authenticatedAt: string;
  readonly expiresAt: string;
}

export interface AuthorizationResult {
  readonly identity: Identity;
  readonly authorized: boolean;
  readonly requiredRole: string;
  readonly actualRoles: readonly string[];
}

export interface SecurityBoundary {
  authenticate(token: string): Promise<Identity>;
  authorize(identity: Identity, capability: Capability): Promise<AuthorizationResult>;
}
