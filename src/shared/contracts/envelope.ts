export type Capability = "dispatch" | "alert" | "city-approval" | "override";

export type CommandStatus =
  | "accepted"
  | "denied"
  | "executing"
  | "succeeded"
  | "failed"
  | "uncertain";

export interface CommandEnvelope<TPayload = unknown> {
  readonly correlationId: string;
  readonly idempotencyKey: string;
  readonly actorSessionId: string;
  readonly capability: Capability;
  readonly targetId: string | null;
  readonly reason: string;
  readonly contextSnapshotId: string;
  readonly policyVersion: string;
  readonly requestedAt: string;
  readonly payload: TPayload;
}

export interface CommandResult<TResult = unknown> {
  readonly correlationId: string;
  readonly status: CommandStatus;
  readonly denialCode: string | null;
  readonly result: TResult | null;
  readonly completedAt: string;
}
