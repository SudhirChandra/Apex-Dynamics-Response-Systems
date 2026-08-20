import type { CommandEnvelope } from "./envelope";
import type { ContextSnapshot } from "./context";
import type { Identity } from "./security";

export interface PolicyDecision {
  readonly correlationId: string;
  readonly allowed: boolean;
  readonly rule: string;
  readonly denialCode: string | null;
  readonly reason: string;
  readonly policyVersion: string;
  readonly evaluatedAt: string;
}

/**
 * Immutable dispatch constraints from the trust boundary.
 * No data-plane content can modify these rules.
 */
export interface DispatchPolicy {
  /** Dispatch targets a named leviathan from the active roster, not a location. */
  readonly targetMustBeLeviathan: true;
  /** Valid assets: Scramble Jets, Deploy Mechs, Raise Barrier, Evac Sector. */
  readonly allowedAssets: readonly [
    "Scramble Jets",
    "Deploy Mechs",
    "Raise Barrier",
    "Evac Sector",
  ];
  /** Assets deploy individually per threat; mass dispatch is never valid. */
  readonly singleAssetPerCommand: true;
  /** Commander authorization with mandatory reasoning comment is required. */
  readonly requiresCommanderAuthorization: true;
}

export interface PolicyEvaluator {
  evaluate(
    command: CommandEnvelope,
    context: ContextSnapshot,
    identity: Identity,
  ): Promise<PolicyDecision>;
}
