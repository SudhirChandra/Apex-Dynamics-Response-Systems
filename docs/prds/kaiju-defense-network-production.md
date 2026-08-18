<!-- markdownlint-disable-file -->
<!-- markdown-table-prettify-ignore-start -->
# Kaiju Defense Network — Production Harness PRD
Version 1.0 | Status Draft | Owner RDRC Engineering | Team Apex Dynamics | Target Q4 2026 | Lifecycle Prototype-to-Production

## Progress Tracker
| Phase | Done | Gaps | Updated |
|-------|------|------|---------|
| Context | Yes | None | 2026-08-18 |
| Problem & Users | Yes | None | 2026-08-18 |
| Scope | Yes | Open questions on sensor data format, retention period | 2026-08-18 |
| Requirements | Yes | NFR metrics need baseline measurement | 2026-08-18 |
| Metrics & Risks | Yes | Baseline measurements pending | 2026-08-18 |
| Operationalization | Partial | Deployment environment TBD | 2026-08-18 |
| Finalization | No | Review with RDRC operations team | 2026-08-18 |
Unresolved Critical Questions: 3 | TBDs: 4

## 1. Executive Summary
### Context
The Regional Disaster Response Center (RDRC) operates a monitoring room staffed by rotating watch guards who track kaiju threats approaching Puget Sound cities. A working prototype — the Kaiju Defense Network dashboard — tracks inbound threats on a live map and supports dispatch of response assets (jets, mechs, barriers, evacuation). The prototype demos cleanly but is built entirely on mocked data, ephemeral client-side state, and a hardcoded 4-threat roster. It cannot serve as a production operational tool.

### Core Opportunity
Transform the prototype from a stateless display into a persistent, auditable, flexible decision-support layer that watch guards and commanders can trust during real events — where threats are unpredictable, decisions carry public consequence, and accountability demands a record.

### Goals
| Goal ID | Statement | Type | Baseline | Target | Timeframe | Priority |
|---------|-----------|------|----------|--------|-----------|----------|
| G-001 | Incoming guard achieves full situational awareness at shift start | Operational | Manual verbal handover (minutes) | Shift summary panel orientation in <30 seconds | Q4 2026 | P0 |
| G-002 | Every dispatch action is traceable to commander's reasoning | Accountability | No audit trail exists | 100% of dispatches have mandatory comment + timestamp + guard ID | Q4 2026 | P0 |
| G-003 | System supports variable threat count without code changes | Flexibility | Hardcoded 4-leviathan roster | Dynamic roster: 0 to N threats managed via UI/API | Q4 2026 | P0 |
| G-004 | Guard can override any system-computed value with both versions visible | Decision support | No override path; system-only computation | Dual-truth display on all computed fields | Q4 2026 | P1 |
| G-005 | System surfaces computed conclusions, not raw telemetry | Decision support | Raw range/speed/height numbers on roster cards | Derived alerts: ETA, threshold crossings, evacuation window | Q4 2026 | P1 |

## 2. Problem Definition
### Current Situation
The prototype is a React + MapLibre single-page application running entirely client-side with seeded mock data. It demonstrates the UX of a kaiju threat-tracking command center but has no backend, no persistence, no audit capability, and no flexibility in its data model. All four leviathans, their spawn points, tracks, and statuses are hardcoded. The signal feed generates random canned phrases on a Poisson timer. Dispatch is a silent button press that decrements a counter. State resets on every page reload.

### Problem Statement
The Kaiju Defense Network prototype operates as a stateless, rigid, interpretation-free display — leaving watch guards without the institutional memory, computed decision-support, or operational flexibility required to reliably protect residents during real events where threats are unpredictable, decisions carry public consequence, and accountability demands a record.

### Root Causes
* **No persistence layer**: all state is ephemeral React state; no backend, no database, no event log
* **Hardcoded data model**: roster, asset types, severity scale, and status values are constants in source code
* **No human-in-the-loop path**: system computes all values; guards cannot override, annotate, or contribute ground truth
* **No audit trail**: dispatch actions and alert triggers leave no record beyond the in-memory signal feed

### Impact of Inaction
Without production hardening, the RDRC cannot use this tool during real events. Guards will continue to rely on verbal handovers, manual logs, and memory — creating accountability gaps, delayed decision-making, and risk of both false alarms and missed warnings that erode public trust.

## 3. Users & Personas
| Persona | Goals | Pain Points | Impact |
|---------|-------|------------|--------|
| Watch Guard (Primary Operator) | Detect threats fast; dispatch on commander's authority with clear reasoning; orient quickly at shift start | No shift history; raw data requires interpretation; can't correct system when wrong; multiple tools to context-switch between | Direct — hands on the tool every shift |
| Commander (Decision Authority) | Assess threats accurately; authorize dispatch with confidence; review after-action records | Lacks confidence for alert decisions (false alarm vs. missed trigger both feared); no record of reasoning; sometimes away from monitoring room | Direct — views tool, authorizes all actions |
| Scouts (Field Execution) | Receive clear dispatch orders; report outcomes | Reports go to separate tool; no feedback into this dashboard | Indirect — guard manually reflects scout reports as status updates |
| Public (Alert Recipients) | Timely, accurate alerts via radio/SMS/TV/website | Alert too late = lives at risk; alert too often = credibility erodes | Indirect — downstream consequence of commander's decision |

## 4. Scope
### In Scope
* Persistent event ledger (dispatches, alerts, status changes, overrides) — **Living Ledger** concept
* Shift summary panel auto-generated from ledger data
* Mandatory dispatch comment field (commander's reasoning)
* Dispatch, alert, and status-change audit logs
* Exportable incident report (filtered time-range view of ledger)
* Dynamic threat roster — add/remove via UI or API — **Flex Roster** concept
* Configurable asset types and capacities
* Custom status values (guard-definable, beyond fixed 5)
* Dual-truth display (system-computed alongside guard-asserted values)
* Computed decision-support notifications (ETA, threshold crossings)
* System health indicator (connectivity, data freshness)

### Out of Scope (justify if empty)
* Commander ↔ watch guard communication — handled via existing phone/walk-over/messaging channels
* Role-based access control / authentication — guard operates on commander's verbal authority; single-role UI
* Scout reporting tool and API — separate system owned by a different team
* Field outcome tracking — managed in a different tool; guard reflects outcomes here manually
* AI decision engine for Last-Stand scenarios — remains a mocked seam for future work
* Audio/visual attention-grabbing alerts — team staffing ensures eyes on screen at all times

### Assumptions
* Watch guards have sufficient training to interpret threat data and escalate correctly under time pressure
* One dashboard instance is sufficient (projected + desk views of the same app)
* Guard can reliably context-switch between scout reporting tool and this dashboard
* Internet connectivity is reliable at RDRC facility (map tiles load from external CDN)
* Existing 5-level severity scale maps to RDRC's real operational levels (extensible via custom statuses)

### Constraints
* Existing prototype UI and tech stack (React, MapLibre, Vite, Tailwind) must be preserved
* Dashboard must be readable on both wall projection (distance) and desk monitors (interaction)
* Walkie-talkie fallback exists — system does not need "never fail" architecture but must indicate its own health
* Commander and guard view the same dashboard instance — no separate commander view required

## 5. Product Overview
### Value Proposition
Turn a demo-quality prototype into an operationally trustworthy command-center tool by adding the persistence, audit, flexibility, and decision-support layers that production disaster response demands — without rebuilding the UI that already works.

### Differentiators
* Dual-truth model: system and human assertions coexist visibly, preserving guard authority while maintaining computed intelligence
* Audit-by-design: every action writes to the ledger as a first-class operation, not an afterthought
* Flex-first data model: threats, assets, and statuses are data — not code

## 6. Functional Requirements
| FR ID | Title | Description | Goals | Personas | Priority | Acceptance | Notes |
|-------|-------|------------|-------|----------|----------|-----------|-------|
| FR-001 | Persistent Event Ledger | All dispatches, alert triggers/stand-downs, status changes, and guard overrides write to a persistent store that survives page reload and server restart | G-001, G-002 | Guard, Commander | P0 | Events persisted and retrievable after browser close/reopen | Backend or persistent storage required |
| FR-002 | Mandatory Dispatch Comment | Dispatch action requires a non-empty text comment (commander's reasoning) before execution; comment stored in ledger with timestamp and guard identifier | G-002 | Guard, Commander | P0 | Cannot dispatch with empty comment; comment visible in dispatch log | Replaces current silent button press |
| FR-003 | Dispatch Log View | Timestamped list of all dispatch actions showing: asset type, target threat, guard ID, commander's comment, timestamp | G-002 | Guard, Commander | P0 | Log queryable by time range, threat, and asset type | Read view over ledger |
| FR-004 | Alert Log View | Timestamped list of all citywide alert triggers and stand-downs showing: action (trigger/stand-down), guard ID, comment, timestamp | G-002 | Guard, Commander | P0 | Every alert action has corresponding log entry | Covers both trigger and stand-down |
| FR-005 | Status-Change Log | Record every status change: previous value, new value, source (system-computed or guard-override), guard comment if override, timestamp | G-002, G-004 | Guard, Commander | P0 | Both system and guard-initiated changes logged with source attribution | Feeds dual-truth audit trail |
| FR-006 | Shift Summary Panel | Auto-generated briefing panel showing: active threats with current status, dispatches in last 8 hours, alerts fired, remaining asset capacity, guard overrides | G-001 | Guard | P0 | Incoming guard can read and understand current situation in <30 seconds | Generated from ledger data |
| FR-007 | Dynamic Threat Roster | Threats added and removed via UI action or API call; roster is not limited to a fixed count; UI adapts layout to current roster size | G-003 | Guard | P0 | Guard can add a new threat and see it on map + roster without code deploy | Replaces hardcoded 4-leviathan array |
| FR-008 | Configurable Asset Types | Dispatch asset types (jets, mechs, barriers, evac) and their capacities are editable configuration, not source-code constants | G-003 | Guard, Commander | P1 | Asset types and capacities changed without code deploy | Admin/config surface TBD |
| FR-009 | Custom Status Values | Status values beyond the fixed 5 (Dormant → Cataclysm) can be defined by guards; new statuses appear in roster, logs, and filters | G-003 | Guard | P1 | Guard-created status value appears in all relevant UI surfaces | Must integrate with severity color scheme |
| FR-010 | Dual-Truth Display | For computed fields (status, ETA, range), display both system-computed value and guard-asserted override side-by-side when they differ | G-004 | Guard, Commander | P1 | When guard overrides, both values visible on roster card and in logs | Core to guard authority model |
| FR-011 | Guard Override Action | Guard can override any system-computed value; override requires a reason comment; original system value preserved alongside override | G-004 | Guard | P1 | Override action available on all computed fields; reason mandatory | Writes to status-change log (FR-005) |
| FR-012 | Computed Decision-Support Notifications | System surfaces derived conclusions in the signal feed: ETA to landfall, evacuation window status, threshold-crossing alerts tied to actual computed values | G-005 | Guard, Commander | P1 | Feed contains computed alerts referencing specific threats with actionable timeframes | Replaces canned random phrases |
| FR-013 | Exportable Incident Report | Pull a time range and export a structured document containing all ledger entries (dispatches, alerts, overrides, status changes) for that period | G-002 | Commander | P2 | Exported document contains complete, ordered event history for selected range | Format TBD (PDF, CSV, or JSON) |
| FR-014 | System Health Indicator | Dashboard displays its own connectivity and data-freshness status so guards know when to switch to walkie-talkie fallback | G-001 | Guard | P2 | Health indicator visible at all times; degrades visually when connectivity lost or data stale | Existing map-offline fallback is insufficient |

### Feature Hierarchy
```plain
Production Harness
├── Living Ledger
│   ├── FR-001 Persistent Event Ledger
│   ├── FR-002 Mandatory Dispatch Comment
│   ├── FR-003 Dispatch Log View
│   ├── FR-004 Alert Log View
│   ├── FR-005 Status-Change Log
│   ├── FR-006 Shift Summary Panel
│   └── FR-013 Exportable Incident Report
├── Flex Roster
│   ├── FR-007 Dynamic Threat Roster
│   ├── FR-008 Configurable Asset Types
│   ├── FR-009 Custom Status Values
│   ├── FR-010 Dual-Truth Display
│   └── FR-011 Guard Override Action
└── Decision Support
    ├── FR-012 Computed Notifications
    └── FR-014 System Health Indicator
```

## 7. Non-Functional Requirements
| NFR ID | Category | Requirement | Metric/Target | Priority | Validation | Notes |
|--------|----------|------------|--------------|----------|-----------|-------|
| NFR-001 | Performance | Dashboard remains responsive during active events with maximum roster size | <200ms interaction response with 20 simultaneous threats | P0 | Load test with simulated roster | Prototype tested only with 4 |
| NFR-002 | Reliability | Ledger writes must not be lost due to network interruption | Zero event loss; queue locally and sync when connection restores | P0 | Simulate network drop during dispatch | Offline-first write pattern |
| NFR-003 | Scalability | Roster panel and map must accommodate variable threat counts | Functional and readable with 0–20 threats | P1 | Visual review at 1, 4, 10, 20 threats | Current layout assumes exactly 4 |
| NFR-004 | Security | Ledger entries are append-only; no retroactive modification or deletion | Audit log immutability verified | P0 | Attempt to modify historical entry; must fail | Critical for accountability |
| NFR-005 | Accessibility | All status information conveyed via text label + color, never color alone | WCAG 2.1 AA compliance on all status indicators | P1 | Automated + manual a11y audit | Prototype already uses text labels; must maintain |
| NFR-006 | Accessibility | Wall-projection readability | Critical threat information legible at 5 meters on 1080p projector | P1 | Physical distance test | Font size, contrast, indicator size |
| NFR-007 | Observability | System health indicator reflects actual connectivity and data freshness | Health status updates within 5 seconds of state change | P2 | Simulate network drop; verify indicator response time | Guards need to know when to switch to radios |
| NFR-008 | Maintainability | All previously hardcoded values (roster, assets, statuses) are data-driven configuration | Zero source-code changes required for operational configuration | P1 | Change asset capacity without code deploy | Core Flex Roster requirement |
| NFR-009 | Performance | Shift summary panel generates from ledger data | Summary renders in <2 seconds from ledger with 10,000 entries | P1 | Load test with large ledger | Must not delay shift handover |

## 8. Data & Analytics
### Inputs
* Real-time sensor data feed (format TBD — replaces mocked Poisson-distributed radar pings)
* Guard actions: dispatch commands with comments, alert triggers/stand-downs, status overrides
* Threat definitions: monster metadata (codename, class, archetype, dimensions, spawn/target positions)
* Asset configuration: types, capacities, replenishment rules

### Outputs / Events
* Persistent ledger entries (dispatches, alerts, status changes, overrides)
* Shift summary (computed view over recent ledger entries)
* Exportable incident reports (filtered ledger)
* System health status

### Instrumentation Plan
| Event | Trigger | Payload | Purpose | Owner |
|-------|---------|--------|---------|-------|
| dispatch_executed | Guard completes dispatch | asset_type, target_threat, guard_id, comment, timestamp, remaining_capacity | Audit trail, shift summary, incident report | Ledger |
| alert_triggered | Guard triggers/stands-down citywide alert | action (trigger/standdown), guard_id, comment, timestamp | Audit trail, public accountability | Ledger |
| status_override | Guard overrides system-computed value | threat_id, field, system_value, guard_value, reason, timestamp | Dual-truth record, after-action review | Ledger |
| threat_added | Guard adds new threat to roster | threat_definition, guard_id, timestamp | Dynamic roster tracking | Ledger |
| threat_removed | Guard removes threat from roster | threat_id, guard_id, reason, timestamp | Dynamic roster tracking | Ledger |
| threshold_crossed | System detects computed threshold crossing | threat_id, threshold_type, value, timestamp | Decision-support notification | Feed |

### Metrics & Success Criteria
| Metric | Type | Baseline | Target | Window | Source |
|--------|------|----------|--------|--------|--------|
| Shift orientation time | Operational | Minutes (verbal handover) | <30 seconds (shift summary panel) | Per shift | Observational study |
| Dispatch audit coverage | Compliance | 0% (no trail exists) | 100% dispatches with comment | Continuous | Ledger query |
| Alert audit coverage | Compliance | 0% (no trail exists) | 100% alerts with comment + guard ID | Continuous | Ledger query |
| Override frequency | Operational | N/A (no override path) | Tracked; no target (informational) | Weekly | Ledger query |
| System uptime during events | Reliability | Unknown | >99.5% during active threat periods | Monthly | Health indicator logs |

## 9. Dependencies
| Dependency | Type | Criticality | Owner | Risk | Mitigation |
|-----------|------|------------|-------|------|-----------|
| Persistent storage backend | Technical | Critical | Engineering | No backend exists in prototype | Evaluate options: dedicated API server, BaaS, or local-first DB (e.g., SQLite + sync) |
| Real sensor data API | Technical | High | RDRC Sensor Team | Format and contract undefined | Define API contract early; maintain mock fallback |
| Scout reporting tool API | Technical | Low | Separate team | Guard manually reflects status; no direct integration | Out of scope; guard is the integration layer |
| Map tile service (OpenFreeMap) | External | Medium | OpenFreeMap | External CDN; offline = blank map | Cache tiles locally or self-host tile server for RDRC facility |
| Alert broadcast system | External | High | RDRC Communications | Integration contract for radio/SMS/TV/website undefined | Define trigger API; prototype currently just toggles UI state |

## 10. Risks & Mitigations
| Risk ID | Description | Severity | Likelihood | Mitigation | Owner | Status |
|---------|-------------|---------|-----------|-----------|-------|--------|
| R-001 | Ledger storage fails during active event, losing dispatch records | Critical | Low | Offline-first write queue; local persistence with background sync | Engineering | Open |
| R-002 | Dynamic roster degrades UI readability at high threat counts (>10) | High | Medium | Design review at 1, 4, 10, 20 threats; scrollable roster with priority sorting | Design | Open |
| R-003 | Map tile CDN unreachable during event | High | Low | Local tile cache or self-hosted tile server at RDRC | Infrastructure | Open |
| R-004 | Guard comment requirement slows dispatch during time-critical events | High | Medium | Pre-defined quick-comment templates; minimum comment length kept short | UX | Open |
| R-005 | Dual-truth display creates confusion about which value is "real" | Medium | Medium | Clear visual hierarchy: guard override is primary, system value is secondary/dimmed | Design | Open |
| R-006 | Custom status values proliferate without governance | Medium | Medium | Status management UI with archive/retire capability; seed with standard set | UX | Open |
| R-007 | Refactoring hardcoded roster breaks existing test suite | Medium | High | Phased refactor; maintain mock data compatibility during transition | Engineering | Open |

## 11. Privacy, Security & Compliance
### Data Classification
* Threat telemetry: Operational — real-time sensor data, not personally identifiable
* Guard identifiers: Internal — names/IDs of RDRC personnel in audit logs
* Dispatch comments: Internal — operational reasoning, may reference classified threat assessments
* Alert records: Public impact — trigger events correlate to public-facing broadcasts

### PII Handling
* Guard IDs in ledger entries are internal personnel identifiers; not exposed to public-facing systems
* No public PII collected or stored by this system

### Threat Considerations
* **Ledger tampering**: Append-only ledger with no retroactive modification (NFR-004) mitigates after-the-fact alteration of dispatch records
* **Unauthorized dispatch**: Out of scope (no auth/RBAC); guard operates on commander's verbal authority per existing RDRC protocol
* **Alert system abuse**: Friction-laden trigger (existing hold/arm-confirm UX) + mandatory comment + audit log provides accountability

### Regulatory / Compliance
| Regulation | Applicability | Action | Owner | Status |
|-----------|--------------|--------|-------|--------|
| RDRC operational audit requirements | TBD — validate whether RDRC has formal audit mandates | Confirm retention period and immutability requirements | RDRC Operations | Open |
| Public alert broadcasting regulations | Likely — FCC/EAS requirements for emergency alerts | Validate alert trigger integration meets broadcast standards | RDRC Communications | Open |

## 12. Operational Considerations
| Aspect | Requirement | Notes |
|--------|------------|-------|
| Deployment | Web application deployed to RDRC network; accessible on monitoring room projector and desk workstations | Current prototype runs on localhost via Vite dev server |
| Rollback | Rollback to previous version without ledger data loss | Ledger schema must be forward-compatible |
| Monitoring | System health indicator on dashboard (FR-014); backend health monitoring TBD | Guards are the first line of "monitoring" via health indicator |
| Alerting | Backend alerts to engineering team if ledger write failures exceed threshold | Guards have walkie-talkie fallback |
| Support | RDRC IT provides L1; Apex Dynamics Engineering provides L2 | TBD |
| Capacity Planning | Ledger grows over time; plan for retention policy and archival | Retention period TBD (see Q-002) |

## 13. Rollout & Launch Plan
### Phases / Milestones
| Phase | Date | Gate Criteria | Owner |
|-------|------|--------------|-------|
| Phase 1: Flex Roster | TBD | Dynamic roster, configurable assets, custom statuses; existing tests updated | Engineering |
| Phase 2: Persistence Layer | TBD | Backend or persistent store operational; state survives reload | Engineering |
| Phase 3: Living Ledger | TBD | Mandatory comments, dispatch/alert/status-change logs writing to persistent store | Engineering |
| Phase 4: Decision Support | TBD | Dual-truth display, computed notifications, shift summary panel, health indicator | Engineering |
| Phase 5: Hardening | TBD | NFR validation (performance, reliability, a11y, projection readability); exportable reports | Engineering + Design |
| Phase 6: RDRC Pilot | TBD | Deployed to RDRC monitoring room; guards trained; commander sign-off | RDRC Operations |

### Communication Plan
Guards and commander briefed at each phase gate. No public-facing communication until Phase 6 pilot.

## 14. Open Questions
| Q ID | Question | Owner | Deadline | Status |
|------|----------|-------|---------|--------|
| Q-001 | What does the real sensor data API look like? What format replaces the mocked Poisson-distributed radar pings? | RDRC Sensor Team | TBD | Open |
| Q-002 | What retention period is required for the audit ledger? | RDRC Operations | TBD | Open |
| Q-003 | Does the stand-down alert broadcast on the same channels (radio/SMS/TV/website) as the trigger? | RDRC Communications | TBD | Open |
| Q-004 | Are there different alert levels (shelter-in-place vs. evacuate) or is it a single binary alert? | RDRC Operations | TBD | Open |
| Q-005 | How are new threats initially detected and identified before a guard adds them to the roster? | RDRC Sensor Team | TBD | Open |
| Q-006 | How long are guard shifts and how frequently do handovers occur? | RDRC Operations | TBD | Open |

## 15. Changelog
| Version | Date | Author | Summary | Type |
|---------|------|-------|---------|------|
| 1.0 | 2026-08-18 | PRD Builder (AI-assisted) | Initial PRD created from Design Thinking coaching artifacts (Methods 1–5) | Creation |

## 16. References & Provenance
| Ref ID | Type | Source | Summary | Conflict Resolution |
|--------|------|--------|---------|--------------------|
| DT-01 | DT Artifact | .copilot-tracking/dt/kaiju-defense-network/method-01-scope/ | Stakeholder map, scope boundaries, assumptions log | N/A |
| DT-02 | DT Artifact | .copilot-tracking/dt/kaiju-defense-network/method-02-research/ | 10 research findings with confidence levels | N/A |
| DT-03 | DT Artifact | .copilot-tracking/dt/kaiju-defense-network/method-03-synthesis/ | 3 themes, 4 HMW questions, validated synthesis | N/A |
| DT-04 | DT Artifact | .copilot-tracking/dt/kaiju-defense-network/method-04-brainstorming/ | Selected solutions by HMW; connecting philosophy | N/A |
| DT-05 | DT Artifact | .copilot-tracking/dt/kaiju-defense-network/method-05-concepts/ | Living Ledger + Flex Roster concepts with D/F/V assessment | N/A |
| PROTO | Codebase | src/ | Existing prototype codebase — React + MapLibre + Vite + Tailwind | PRD requirements override prototype behavior where they conflict |

### Citation Usage
All functional requirements trace to Design Thinking research findings (DT-02) and synthesis themes (DT-03). Goal definitions derive from HMW questions (DT-03). Concepts (DT-05) organize requirements into the Living Ledger and Flex Roster feature hierarchies.

## 17. Appendices
### Glossary
| Term | Definition |
|------|-----------|
| RDRC | Regional Disaster Response Center — the operating organization |
| Watch Guard | Monitoring team member who operates the dashboard on rotating shifts |
| Commander | Authority who assesses situations, authorizes dispatch and alert actions |
| Scout | Field unit that executes dispatch orders and reports outcomes via separate tool |
| Leviathan | Tracked kaiju/monster threat in the system |
| Dual-Truth | Display pattern showing system-computed and guard-asserted values side-by-side |
| Living Ledger | Persistent event log capturing all actions with reasoning; enables shift summaries and reports |
| Flex Roster | Data-driven threat/asset/status model replacing hardcoded constants |
| THREATCON | Threat condition level (1–5 scale, Dormant to Cataclysm) |
| Landfall | Point where a threat reaches its coastal target city |

### Additional Notes
This PRD was generated from Design Thinking coaching artifacts produced through a structured DT session (Methods 1–5: Scope Conversations, Design Research, Input Synthesis, Brainstorming, User Concepts). All requirements trace to stakeholder-validated research findings. The recommended implementation sequence is: Flex Roster → Persistence Layer → Living Ledger → Decision Support → Hardening → RDRC Pilot.

Generated 2026-08-18 by PRD Builder (mode: DT-informed production PRD)
<!-- markdown-table-prettify-ignore-end -->
