import type { CommandEnvelope } from "./envelope";

export type IdempotencyStrategy = "client-key" | "server-dedup" | "natural-key";

export type TransactionBoundary = "command" | "saga" | "none";

export interface BudgetRule {
  readonly maxPerWindow: number;
  readonly windowSeconds: number;
}

export interface ToolCapability {
  readonly id: string;
  readonly name: string;
  readonly owner: string;
  readonly budgetRules: readonly BudgetRule[];
  readonly idempotencyStrategy: IdempotencyStrategy;
  readonly transactionBoundary: TransactionBoundary;
}

export interface ToolRequest<TPayload = unknown>
  extends CommandEnvelope<TPayload> {
  readonly toolId: string;
  readonly preconditions: readonly string[];
}

export interface ToolResult {
  readonly correlationId: string;
  readonly toolId: string;
  readonly status: "success" | "failure" | "timeout" | "rejected";
  readonly acknowledgement: string | null;
  readonly executedAt: string;
}
