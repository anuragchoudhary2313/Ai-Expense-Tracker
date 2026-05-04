# Federated Rollout Plan: India-First AI Expense Tracker

This rollout applies the `federated-agent-swarm-orchestration` skill and maps execution to DevFleet with canary-to-full promotion gates.

## Rollout Shape

- Total specialized agents (missions): 120
- Canary wave: 12 missions (`M001`-`M012`)
- Partial wave: 48 missions (`M013`-`M060`)
- Full wave: 60 missions (`M061`-`M120`)

## Trust Zones

- `internal`: UI/presentation and low-risk app behavior changes.
- `restricted`: business logic and financial derivations.
- `privileged`: schema, auth, release controls, compliance, and production-impacting operations.

## Approval Gates

1. `G0 pre-canary`: mission planning complete, kill switches verified, observability online.
2. `G1 exit-canary`: all canary missions pass, no Sev1, GST and INR correctness tests at 100%.
3. `G2 exit-partial`: partial wave pass, p95 API < 350ms, rollback drill successful.
4. `G3 go-full`: RC matrix green and release approvers sign off.

## Stop Conditions

Trigger hard stop + rollback when any occurs:

- Privileged mission failure with data/schema risk
- GST mismatch > 0.2% in validation
- INR rounding mismatch > 0.1%
- API 5xx > 1.5% for 10m
- p95 latency degradation > 30% for 15m
- AI severe hallucination > 0.5% on audited sample
- Backup/restore drill failure

## SLO and Failure Budget

- API availability: 99.9%
- Core write path success: 99.95%
- GST correctness: 99.95%
- INR precision correctness: 99.99%
- Dashboard freshness: 99% within 5m
- AI insight factual precision: >= 97%

## Retry Policy

- `internal`: 2 auto retries
- `restricted`: 1 auto + 1 approved manual retry
- `privileged`: no auto retries for destructive steps

## Stream Coverage

- UI Rebrand
- Categories
- GST
- INR + UPI
- Sample Data
- Dashboard Charts
- Monthly Summary
- AI Insights
- Backend APIs
- Schema Migration
- Tests
- Docs/Readme
- Release Hardening

## Mission Catalog

Full mission list, dependencies, and acceptance criteria are in [india-federated-missions.json](./india-federated-missions.json).

## Canary Mission Prompts

Ready-to-dispatch prompts are in [india-canary-prompts.md](./india-canary-prompts.md).

## Execution Sequence (DevFleet)

1. `plan_project(prompt="India-first production enhancement rollout")`
2. Register missions from `india-federated-missions.json`
3. Dispatch canary roots (`M001`, `M002`, `M003`, `M004`, `M005`, `M006`, `M007`, `M008`, `M009`, `M010`, `M011`, `M012`)
4. Evaluate `G1`
5. Auto-dispatch partial missions based on dependencies
6. Evaluate `G2`
7. Dispatch full wave
8. Evaluate `G3` and run 72h hypercare (`M120`)
