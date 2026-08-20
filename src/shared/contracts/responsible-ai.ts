import type { ContextSnapshot } from "./context";
import type { Identity } from "./security";

export type RAISystem = "city-selection" | "dispatch-assistant";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "expired";

export interface EquityCheck {
  readonly metric: string;
  readonly passed: boolean;
  readonly score: number;
  readonly threshold: number;
}

export interface RAIDecision {
  readonly correlationId: string;
  readonly system: RAISystem;
  readonly explainable: boolean;
  readonly equityCheck: EquityCheck;
  readonly humanApprovalRequired: boolean;
  readonly approvalStatus: ApprovalStatus;
  readonly scorerVersion: string;
  readonly evaluatedAt: string;
}

export interface ApprovalResult {
  readonly correlationId: string;
  readonly approvalStatus: ApprovalStatus;
  readonly approvedBy: string | null;
  readonly approvedAt: string | null;
}

export interface RAIGate {
  evaluate(
    recommendation: unknown,
    context: ContextSnapshot,
  ): Promise<RAIDecision>;
  requireApproval(
    decision: RAIDecision,
    identity: Identity,
  ): Promise<ApprovalResult>;
}
