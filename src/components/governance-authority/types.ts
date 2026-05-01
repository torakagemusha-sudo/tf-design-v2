/**
 * =============================================================================
 * Torafirma Design System — Governance & Authority Types
 * =============================================================================
 *
 * Central type definitions for the Governance & Authority component family.
 * All authority-aware, policy-governed components import from here.
 *
 * Design tokens:
 *   - Dark theme (#0a0a0a, #111827, #1f2937)
 *   - Authority-gold accents (#d4a843, #b8942d)
 *   - Semantic colors: pass/green, warn/amber, danger/red, info/blue
 *   - Font: Inter, 12–13px system UI
 *   - Sharp corners (2px), strong borders
 */

// ---------------------------------------------------------------------------
// Authority Model
// ---------------------------------------------------------------------------

/** Authority level per Torafirma Architecture Constitution §6.1 */
export type AuthorityLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Named authority levels */
export const AUTHORITY_LEVELS: Record<AuthorityLevel, string> = {
  0: "OBSERVE",
  1: "DRAFT",
  2: "STAGE",
  3: "EXECUTE",
  4: "COMMIT",
  5: "OVERRIDE",
  6: "SOVEREIGN",
};

/** Authority level with display metadata */
export interface AuthorityLevelMeta {
  level: AuthorityLevel;
  name: string;
  label: string;
  description: string;
  color: string;
  canOverride: boolean;
}

/** Current session authority state */
export interface SessionAuthority {
  currentLevel: AuthorityLevel;
  effectiveLevel: AuthorityLevel;
  delegations: AuthorityDelegation[];
  escalationRequests: AuthorityEscalation[];
  history: AuthorityUsage[];
}

/** Authority delegation record */
export interface AuthorityDelegation {
  id: string;
  fromRole: string;
  toRole: string;
  fromUser: string;
  toUser: string;
  level: AuthorityLevel;
  grantedAt: string;
  expiresAt: string;
  reason: string;
  active: boolean;
}

/** Authority escalation request */
export interface AuthorityEscalation {
  id: string;
  requesterId: string;
  requesterName: string;
  requestedLevel: AuthorityLevel;
  currentLevel: AuthorityLevel;
  reason: string;
  requestedAt: string;
  status: "pending" | "approved" | "rejected" | "expired";
  reviewedBy?: string;
  reviewedAt?: string;
  reviewComment?: string;
}

/** Single authority usage record */
export interface AuthorityUsage {
  id: string;
  timestamp: string;
  actor: string;
  authorityLevel: AuthorityLevel;
  action: string;
  target: string;
  result: "success" | "blocked" | "failed" | "override";
  traceId: string;
}

// ---------------------------------------------------------------------------
// Policy Model
// ---------------------------------------------------------------------------

/** Policy gate status */
export type PolicyGateStatus = "pass" | "fail" | "warning" | "pending" | "blocked";

/** Single policy rule */
export interface PolicyRule {
  id: string;
  label: string;
  description: string;
  condition: PolicyCondition;
  status: PolicyGateStatus;
  message?: string;
  severity: "info" | "warning" | "critical";
}

/** Policy condition descriptor */
export interface PolicyCondition {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "contains" | "exists";
  value: unknown;
}

/** Policy action descriptor */
export interface PolicyAction {
  id: string;
  label: string;
  description: string;
  commandClass: string;
  targetType: string;
  requiredAuthority: AuthorityLevel;
}

/** Complete policy definition */
export interface Policy {
  id: string;
  name: string;
  description: string;
  version: string;
  active: boolean;
  rules: PolicyRule[];
  actions: PolicyAction[];
  requiredAuthority: AuthorityLevel;
  createdAt: string;
  updatedAt: string;
  owner: string;
}

/** Policy condition builder state */
export interface PolicyConditionGroup {
  id: string;
  operator: "and" | "or";
  conditions: PolicyCondition[];
  groups: PolicyConditionGroup[];
}

// ---------------------------------------------------------------------------
// Gate & Interlock Model
// ---------------------------------------------------------------------------

/** Policy gate result */
export interface PolicyGateResult {
  policyId: string;
  policyName: string;
  status: PolicyGateStatus;
  rules: PolicyRule[];
  requiredAuthority: AuthorityLevel;
  currentAuthority: AuthorityLevel;
  canOverride: boolean;
  overrideRequires: AuthorityLevel;
}

/** Interlock blocking reason */
export interface InterlockReason {
  code: string;
  message: string;
  severity: "blocking" | "warning";
  source: string;
  resolvable: boolean;
}

/** Interlock notice data */
export interface InterlockNoticeData {
  operation: string;
  target: string;
  blockedAt: string;
  reasons: InterlockReason[];
  canOverride: boolean;
  overrideAuthorityRequired: AuthorityLevel;
}

/** Override request payload */
export interface OverrideRequest {
  operation: string;
  target: string;
  reason: string;
  requestedAuthority: AuthorityLevel;
  requestedBy: string;
  requestedAt: string;
  expiryMinutes: number;
  auditDestination: string;
}

// ---------------------------------------------------------------------------
// Signed Workorder Model
// ---------------------------------------------------------------------------

/** Workorder signature block */
export interface WorkorderSignature {
  signerId: string;
  signerName: string;
  signerRole: string;
  authorityLevel: AuthorityLevel;
  signedAt: string;
  signatureHash: string;
  comment?: string;
}

/** Signed workorder */
export interface SignedWorkorder {
  id: string;
  title: string;
  description: string;
  type: string;
  status: "draft" | "pending" | "approved" | "rejected" | "executed" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  requestedBy: string;
  requestedAt: string;
  target: string;
  targetType: string;
  authorityRequired: AuthorityLevel;
  signatures: WorkorderSignature[];
  auditTrailId: string;
  expiresAt?: string;
  metadata: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Audit Event Model
// ---------------------------------------------------------------------------

/** Audit event severity */
export type AuditEventSeverity = "info" | "notice" | "warning" | "critical" | "emergency";

/** Audit event category */
export type AuditEventCategory =
  | "authentication"
  | "authorization"
  | "policy"
  | "execution"
  | "override"
  | "delegation"
  | "escalation"
  | "violation"
  | "compliance"
  | "system";

/** Single audit event */
export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  targetType: string;
  category: AuditEventCategory;
  severity: AuditEventSeverity;
  message: string;
  details: Record<string, unknown>;
  traceId: string;
  authorityLevel: AuthorityLevel;
  result: "success" | "failure" | "blocked" | "override";
  ipAddress?: string;
  sessionId?: string;
}

/** Audit event filter state */
export interface AuditEventFilter {
  categories: AuditEventCategory[];
  severities: AuditEventSeverity[];
  actors: string[];
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
}

/** Audit event timeline group */
export interface AuditEventTimelineGroup {
  date: string;
  events: AuditEvent[];
}

// ---------------------------------------------------------------------------
// Lock Model
// ---------------------------------------------------------------------------

/** Lock state */
export type LockState = "unlocked" | "locked" | "override" | "expired" | "pending";

/** Lock reason */
export interface LockReason {
  code: string;
  message: string;
  lockedBy?: string;
  lockedAt?: string;
  expiresAt?: string;
  canUnlock: boolean;
  unlockAuthority: AuthorityLevel;
}

/** Lock indicator data */
export interface LockData {
  state: LockState;
  target: string;
  reasons: LockReason[];
  overrideAvailable: boolean;
  overrideAuthorityRequired: AuthorityLevel;
}

// ---------------------------------------------------------------------------
// Approval Chain Model
// ---------------------------------------------------------------------------

/** Approval chain step */
export interface ApprovalStep {
  id: string;
  order: number;
  role: string;
  userId?: string;
  userName?: string;
  authorityLevel: AuthorityLevel;
  status: "pending" | "approved" | "rejected" | "delegated" | "skipped";
  actionedAt?: string;
  comment?: string;
  delegatedTo?: string;
}

/** Approval chain */
export interface ApprovalChain {
  id: string;
  name: string;
  description: string;
  steps: ApprovalStep[];
  parallel: boolean;
  allRequired: boolean;
}

/** Approval request */
export interface ApprovalRequest {
  id: string;
  requester: string;
  requesterId: string;
  title: string;
  description: string;
  requestedAt: string;
  chain: ApprovalChain;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "approved" | "rejected" | "in_progress";
  target: string;
  targetType: string;
}

// ---------------------------------------------------------------------------
// Governance Dashboard Model
// ---------------------------------------------------------------------------

/** Governance statistic */
export interface GovernanceStat {
  label: string;
  value: number;
  change: number;
  unit?: string;
  trend: "up" | "down" | "stable";
}

/** Governance alert */
export interface GovernanceAlert {
  id: string;
  title: string;
  message: string;
  severity: AuditEventSeverity;
  category: AuditEventCategory;
  createdAt: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
}

/** Policy violation */
export interface PolicyViolation {
  id: string;
  policyId: string;
  policyName: string;
  ruleId: string;
  ruleLabel: string;
  actor: string;
  target: string;
  severity: "low" | "medium" | "high" | "critical";
  detectedAt: string;
  status: "open" | "acknowledged" | "resolved" | "escalated";
  resolution?: string;
}

/** Compliance score */
export interface ComplianceScore {
  overall: number;
  byCategory: Record<string, number>;
  trend: number;
  period: string;
}

/** Risk indicator */
export interface RiskIndicator {
  level: "low" | "medium" | "high" | "critical";
  score: number;
  factors: string[];
  trend: "improving" | "stable" | "worsening";
}

// ---------------------------------------------------------------------------
// Role & Permission Model
// ---------------------------------------------------------------------------

/** Permission definition */
export interface Permission {
  id: string;
  label: string;
  description: string;
  category: string;
  authorityRequired: AuthorityLevel;
}

/** Role definition */
export interface Role {
  id: string;
  name: string;
  description: string;
  authorityLevel: AuthorityLevel;
  permissions: string[];
  inheritsFrom?: string[];
}

/** User role assignment */
export interface UserRole {
  userId: string;
  userName: string;
  roles: Role[];
  effectiveAuthority: AuthorityLevel;
  grantedAt: string;
  grantedBy: string;
}

/** Permission matrix cell */
export interface PermissionMatrixCell {
  roleId: string;
  permissionId: string;
  granted: boolean;
  inherited: boolean;
  sourceRole?: string;
}

// ---------------------------------------------------------------------------
// Data Retention & Privacy Model
// ---------------------------------------------------------------------------

/** Data retention policy */
export interface DataRetentionPolicy {
  id: string;
  name: string;
  description: string;
  category: string;
  retentionDays: number;
  autoPurge: boolean;
  archiveBeforePurge: boolean;
  archiveDays: number;
  legalHold: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Privacy setting */
export interface PrivacySetting {
  id: string;
  category: string;
  label: string;
  description: string;
  value: "allow" | "deny" | "ask" | "minimal";
  authorityRequired: AuthorityLevel;
  editable: boolean;
}

// ---------------------------------------------------------------------------
// Governance Report Model
// ---------------------------------------------------------------------------

/** Governance report configuration */
export interface GovernanceReportConfig {
  title: string;
  period: string;
  includeAuditTrail: boolean;
  includeViolations: boolean;
  includeCompliance: boolean;
  includeRisk: boolean;
  includeRoles: boolean;
  format: "pdf" | "json" | "csv";
}

/** Governance report */
export interface GovernanceReport {
  id: string;
  config: GovernanceReportConfig;
  generatedAt: string;
  generatedBy: string;
  status: "generating" | "ready" | "failed";
  url?: string;
  size?: number;
}

// ---------------------------------------------------------------------------
// Shared Component Props
// ---------------------------------------------------------------------------

/** Base props for all governance components */
export interface GovernanceComponentBaseProps {
  className?: string;
  "data-testid"?: string;
}

/** Base props for authority-aware components */
export interface AuthorityAwareProps extends GovernanceComponentBaseProps {
  currentAuthority: AuthorityLevel;
  requiredAuthority: AuthorityLevel;
  showAuthorityBadge?: boolean;
}

/** Base props for interactive governance components */
export interface InteractiveGovernanceProps extends GovernanceComponentBaseProps {
  onAction?: (action: string, payload?: Record<string, unknown>) => void;
  disabled?: boolean;
  loading?: boolean;
}
