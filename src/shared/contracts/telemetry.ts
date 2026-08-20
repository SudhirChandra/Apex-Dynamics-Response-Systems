export interface DomainEvent<TPayload = unknown> {
  readonly id: string;
  readonly correlationId: string;
  readonly type: string;
  readonly actorId: string;
  readonly sessionId: string;
  readonly contextSnapshotId: string;
  readonly policyVersion: string;
  readonly reason: string;
  readonly decision: string;
  readonly payload: TPayload;
  readonly occurredAt: string;
  readonly integrity: string;
}

export interface AuditRecord<TPayload = unknown> extends DomainEvent<TPayload> {
  readonly auditSinkId: string;
  readonly appendedAt: string;
  readonly immutable: true;
}

export interface EventFilter {
  readonly correlationId?: string;
  readonly type?: string;
  readonly actorId?: string;
  readonly after?: string;
  readonly before?: string;
}

export interface TelemetrySink {
  emit(event: DomainEvent): Promise<void>;
  query(filter: EventFilter): Promise<readonly DomainEvent[]>;
}
