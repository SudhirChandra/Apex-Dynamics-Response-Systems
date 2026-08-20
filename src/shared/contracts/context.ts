export type TrustClassification = "control-plane" | "data-plane";

export type StaleBehavior = "deny-action" | "warn" | "allow-read-only";

export interface Provenance {
  readonly origin: string;
  readonly retrievedAt: string;
  readonly integrityHash: string;
}

export interface Scope {
  readonly classification: TrustClassification;
  readonly domain: string;
  readonly boundaryId: string;
}

export interface Freshness {
  readonly observedAt: string;
  readonly expiresAt: string;
  readonly staleBehavior: StaleBehavior;
}

export interface ContextChunk<TRaw = unknown> {
  readonly id: string;
  readonly source: string;
  readonly sourceIdentity: string;
  readonly schema: string;
  readonly schemaVersion: string;
  readonly provenance: Provenance;
  readonly scope: Scope;
  readonly freshness: Freshness;
  readonly raw: TRaw;
}

export interface ContextSnapshot {
  readonly id: string;
  readonly chunks: readonly ContextChunk[];
  readonly resolvedAt: string;
  readonly integrityHash: string;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

export interface ContextRequirements {
  readonly domain: string;
  readonly classifications: readonly TrustClassification[];
  readonly maxStaleness?: string;
}

export interface ContextAdapter {
  resolve(requirements: ContextRequirements): Promise<ContextSnapshot>;
  validate(chunk: ContextChunk): ValidationResult;
  classify(input: unknown): TrustClassification;
}
