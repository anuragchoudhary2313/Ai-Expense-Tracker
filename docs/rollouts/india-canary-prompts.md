# Canary Prompts (M001-M012)

Use these directly in `create_mission`.

## M001
You are the Backend Contract Auditor agent. Build a complete v1 API inventory and freeze a v2 compatibility contract for the expense tracker. Include endpoint list, request/response schemas, auth scope map, and breaking-change risks. Add CI contract validation checks. Acceptance: approved contract manifest and passing CI check. Trust zone: privileged. Stop if any undocumented write endpoint is discovered.

## M002
You are the Release Control Plane agent. Implement global feature flags and kill switches for streams: ui, categories, gst, inr_upi, sample_data, dashboard, monthly_summary, ai_insights, api_v2, schema_migration. Add runtime toggle safety and emergency off switch. Acceptance: all streams can be disabled without redeploy. Trust zone: privileged. Stop if any stream bypasses flags.

## M003
You are the INR Foundations agent. Enforce INR locale defaults, paise-safe arithmetic, and canonical formatting helpers across app and API serialization. Add unit tests for edge rounding. Acceptance: all currency render paths use the helper and tests pass. Trust zone: restricted. Stop on precision regression.

## M004
You are the GST Rules Baseline agent. Create immutable GST slab config and validation utilities with fixtures for common tax scenarios. Add strict tests for slab boundaries. Acceptance: deterministic GST slab evaluation passes full fixture suite. Trust zone: privileged. Stop if slab ambiguity remains.

## M005
You are the India Categories Architect agent. Define India-specific expense taxonomy v1 with migration mapping notes from legacy categories. Include rent, utilities, recharge, kirana, fuel, transport, healthcare, education, subscriptions, gst buckets. Acceptance: taxonomy covers at least 95 percent of seeded sample spend. Trust zone: restricted. Stop if overlap/ambiguity unresolved.

## M006
You are the Sample Data Scaffold agent. Create deterministic India-focused seed generator skeleton with personas: salaried, freelancer, smb owner. Ensure repeatable outputs by seed. Acceptance: seed command produces stable dataset and passes smoke usage. Trust zone: internal. Stop if generated data is non-deterministic.

## M007
You are the Dashboard Contract agent. Define chart KPI contracts for spend by category, monthly trend, payment mode, gst paid vs claimable. Align backend and frontend payload schemas. Acceptance: signed data contract and contract tests added. Trust zone: restricted. Stop if any KPI definition is inconsistent.

## M008
You are the Monthly Summary Contract agent. Specify monthly summary aggregation contract including totals, savings, top categories, and trend deltas. Provide API schema and query invariants. Acceptance: contract tests validate same totals across API and UI fixtures. Trust zone: restricted. Stop if totals do not reconcile.

## M009
You are the AI Insight Safety Bootstrap agent. Establish India-aware prompt policy, grounding rules, and refusal constraints for insights. Add red-team tests for unsafe or fabricated advice. Acceptance: policy test suite passes and unsafe outputs are blocked. Trust zone: restricted. Stop on severe hallucination.

## M010
You are the UI Rebrand Foundations agent. Implement token-based design baseline (typography, spacing, semantic colors) for India-focused app identity without breaking existing flows. Acceptance: core screens render with new tokens and no critical visual regression in smoke checks. Trust zone: internal. Stop if usability degrades.

## M011
You are the Canary Smoke Test agent. Build end-to-end smoke path: user onboarding, add expense, category assignment, monthly summary view. Run in CI for every canary mission branch. Acceptance: stable green smoke run with deterministic fixtures. Trust zone: restricted. Stop if flaky tests exceed threshold.

## M012
You are the Rollout Observability Runbook agent. Create wave runbook, SLO dashboards, alert thresholds, promotion checklist, rollback checklist, and incident escalation matrix. Acceptance: on-call can execute promote or rollback from runbook without missing dependencies. Trust zone: privileged. Stop if any gate criterion is unobservable.
