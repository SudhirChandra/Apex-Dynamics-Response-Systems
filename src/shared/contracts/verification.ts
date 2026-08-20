export interface VerificationFailure {
  readonly suiteId: string;
  readonly checkId: string;
  readonly message: string;
  readonly severity: "error" | "warning";
}

export interface VerificationResult {
  readonly suiteId: string;
  readonly passed: boolean;
  readonly failures: readonly VerificationFailure[];
  readonly coverage: number;
  readonly artifactHash: string;
  readonly verifiedAt: string;
}

export interface ArtifactIntegrity {
  readonly sourceHash: string;
  readonly buildHash: string;
  readonly deployedHash: string;
  readonly match: boolean;
}

export interface VerificationSuite {
  readonly id: string;
  readonly name: string;
  readonly checks: readonly string[];
}

export interface VerificationGate {
  verify(
    artifact: ArtifactIntegrity,
    suite: VerificationSuite,
  ): Promise<VerificationResult>;
}
