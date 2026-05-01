/**
 * =============================================================================
 * Torafirma Design System — Governance & Authority Components
 * =============================================================================
 *
 * Barrel export for the Governance & Authority component family.
 * Import any component via:
 *   import { PolicyGate, AuditEventList } from "./governance-authority";
 *
 * @module governance-authority
 */

// ---------------------------------------------------------------------------
// Types (central export)
// ---------------------------------------------------------------------------
export * from "./types";

// ---------------------------------------------------------------------------
// 1–5  PolicyGate Family
// ---------------------------------------------------------------------------
export { default as PolicyGate } from "./PolicyGate";
export type { PolicyGateProps } from "./PolicyGate";

export { default as PolicyGateHeader } from "./PolicyGateHeader";
export type { PolicyGateHeaderProps } from "./PolicyGateHeader";

export { default as PolicyGateRules } from "./PolicyGateRules";
export type { PolicyGateRulesProps } from "./PolicyGateRules";

export { default as PolicyGateStatus } from "./PolicyGateStatus";
export type { PolicyGateStatusProps } from "./PolicyGateStatus";

export { default as PolicyGateAction } from "./PolicyGateAction";
export type { PolicyGateActionProps } from "./PolicyGateAction";

// ---------------------------------------------------------------------------
// 6–8  InterlockNotice Family
// ---------------------------------------------------------------------------
export { default as InterlockNotice } from "./InterlockNotice";
export type { InterlockNoticeProps } from "./InterlockNotice";

export { default as InterlockNoticeDetails } from "./InterlockNoticeDetails";
export type { InterlockNoticeDetailsProps } from "./InterlockNoticeDetails";

export { default as InterlockNoticeOverride } from "./InterlockNoticeOverride";
export type { InterlockNoticeOverrideProps } from "./InterlockNoticeOverride";

// ---------------------------------------------------------------------------
// 9–15  OverridePanel Family
// ---------------------------------------------------------------------------
export { default as OverridePanel } from "./OverridePanel";
export type { OverridePanelProps } from "./OverridePanel";

export { default as OverridePanelHeader } from "./OverridePanelHeader";
export type { OverridePanelHeaderProps } from "./OverridePanelHeader";

export { default as OverridePanelReason } from "./OverridePanelReason";
export type { OverridePanelReasonProps } from "./OverridePanelReason";

export { default as OverridePanelAuthority } from "./OverridePanelAuthority";
export type { OverridePanelAuthorityProps } from "./OverridePanelAuthority";

export { default as OverridePanelExpiry } from "./OverridePanelExpiry";
export type { OverridePanelExpiryProps } from "./OverridePanelExpiry";

export { default as OverridePanelAudit } from "./OverridePanelAudit";
export type { OverridePanelAuditProps } from "./OverridePanelAudit";

export { default as OverridePanelSubmit } from "./OverridePanelSubmit";
export type { OverridePanelSubmitProps } from "./OverridePanelSubmit";

// ---------------------------------------------------------------------------
// 16–20  SignedWorkorderCard Family
// ---------------------------------------------------------------------------
export { default as SignedWorkorderCard } from "./SignedWorkorderCard";
export type { SignedWorkorderCardProps } from "./SignedWorkorderCard";

export { default as SignedWorkorderHeader } from "./SignedWorkorderHeader";
export type { SignedWorkorderHeaderProps } from "./SignedWorkorderHeader";

export { default as SignedWorkorderDetails } from "./SignedWorkorderDetails";
export type { SignedWorkorderDetailsProps } from "./SignedWorkorderDetails";

export { default as SignedWorkorderSignature } from "./SignedWorkorderSignature";
export type { SignedWorkorderSignatureProps } from "./SignedWorkorderSignature";

export { default as SignedWorkorderAudit } from "./SignedWorkorderAudit";
export type { SignedWorkorderAuditProps } from "./SignedWorkorderAudit";

// ---------------------------------------------------------------------------
// 21–27  AuditEvent Family
// ---------------------------------------------------------------------------
export { default as AuditEventList } from "./AuditEventList";
export type { AuditEventListProps } from "./AuditEventList";

export { default as AuditEventItem } from "./AuditEventItem";
export type { AuditEventItemProps } from "./AuditEventItem";

export { default as AuditEventFilter } from "./AuditEventFilter";
export type { AuditEventFilterProps } from "./AuditEventFilter";

export { default as AuditEventSearch } from "./AuditEventSearch";
export type { AuditEventSearchProps } from "./AuditEventSearch";

export { default as AuditEventDetail } from "./AuditEventDetail";
export type { AuditEventDetailProps } from "./AuditEventDetail";

export { default as AuditEventExport } from "./AuditEventExport";
export type { AuditEventExportProps } from "./AuditEventExport";

export { default as AuditEventTimeline } from "./AuditEventTimeline";
export type { AuditEventTimelineProps } from "./AuditEventTimeline";

// ---------------------------------------------------------------------------
// 28–32  AuthorityLadder Family
// ---------------------------------------------------------------------------
export { default as AuthorityLadder } from "./AuthorityLadder";
export type { AuthorityLadderProps } from "./AuthorityLadder";

export { default as AuthorityLadderStep } from "./AuthorityLadderStep";
export type { AuthorityLadderStepProps } from "./AuthorityLadderStep";

export { default as AuthorityLadderCurrent } from "./AuthorityLadderCurrent";
export type { AuthorityLadderCurrentProps } from "./AuthorityLadderCurrent";

export { default as AuthorityLadderRequired } from "./AuthorityLadderRequired";
export type { AuthorityLadderRequiredProps } from "./AuthorityLadderRequired";

export { default as AuthorityLadderGap } from "./AuthorityLadderGap";
export type { AuthorityLadderGapProps } from "./AuthorityLadderGap";

// ---------------------------------------------------------------------------
// 33–36  LockIndicator Family
// ---------------------------------------------------------------------------
export { default as LockIndicator } from "./LockIndicator";
export type { LockIndicatorProps } from "./LockIndicator";

export { default as LockStatusPanel } from "./LockStatusPanel";
export type { LockStatusPanelProps } from "./LockStatusPanel";

export { default as LockReasonDisplay } from "./LockReasonDisplay";
export type { LockReasonDisplayProps } from "./LockReasonDisplay";

export { default as LockOverrideControl } from "./LockOverrideControl";
export type { LockOverrideControlProps } from "./LockOverrideControl";

// ---------------------------------------------------------------------------
// 37–42  PolicyBrowser Family
// ---------------------------------------------------------------------------
export { default as PolicyBrowser } from "./PolicyBrowser";
export type { PolicyBrowserProps } from "./PolicyBrowser";

export { default as PolicyCard } from "./PolicyCard";
export type { PolicyCardProps } from "./PolicyCard";

export { default as PolicyRuleList } from "./PolicyRuleList";
export type { PolicyRuleListProps } from "./PolicyRuleList";

export { default as PolicyRuleItem } from "./PolicyRuleItem";
export type { PolicyRuleItemProps } from "./PolicyRuleItem";

export { default as PolicyConditionBuilder } from "./PolicyConditionBuilder";
export type { PolicyConditionBuilderProps } from "./PolicyConditionBuilder";

export { default as PolicyActionSelector } from "./PolicyActionSelector";
export type { PolicyActionSelectorProps } from "./PolicyActionSelector";

// ---------------------------------------------------------------------------
// 43–50  ApprovalChain Family
// ---------------------------------------------------------------------------
export { default as ApprovalChainEditor } from "./ApprovalChainEditor";
export type { ApprovalChainEditorProps } from "./ApprovalChainEditor";

export { default as ApprovalChainStep } from "./ApprovalChainStep";
export type { ApprovalChainStepProps } from "./ApprovalChainStep";

export { default as ApprovalChainConnector } from "./ApprovalChainConnector";
export type { ApprovalChainConnectorProps } from "./ApprovalChainConnector";

export { default as ApprovalRequestCard } from "./ApprovalRequestCard";
export type { ApprovalRequestCardProps } from "./ApprovalRequestCard";

export { default as ApprovalRequestList } from "./ApprovalRequestList";
export type { ApprovalRequestListProps } from "./ApprovalRequestList";

export { default as ApprovalActionButton } from "./ApprovalActionButton";
export type { ApprovalActionButtonProps } from "./ApprovalActionButton";

export { default as ApprovalCommentInput } from "./ApprovalCommentInput";
export type { ApprovalCommentInputProps } from "./ApprovalCommentInput";

export { default as ApprovalDelegationPicker } from "./ApprovalDelegationPicker";
export type { ApprovalDelegationPickerProps } from "./ApprovalDelegationPicker";

// ---------------------------------------------------------------------------
// 51–56  GovernanceDashboard Family
// ---------------------------------------------------------------------------
export { default as GovernanceDashboard } from "./GovernanceDashboard";
export type { GovernanceDashboardProps } from "./GovernanceDashboard";

export { default as GovernanceStatsCard } from "./GovernanceStatsCard";
export type { GovernanceStatsCardProps } from "./GovernanceStatsCard";

export { default as GovernanceAlertList } from "./GovernanceAlertList";
export type { GovernanceAlertListProps } from "./GovernanceAlertList";

export { default as GovernanceViolationCard } from "./GovernanceViolationCard";
export type { GovernanceViolationCardProps } from "./GovernanceViolationCard";

export { default as GovernanceComplianceMeter } from "./GovernanceComplianceMeter";
export type { GovernanceComplianceMeterProps } from "./GovernanceComplianceMeter";

export { default as GovernanceRiskIndicator } from "./GovernanceRiskIndicator";
export type { GovernanceRiskIndicatorProps } from "./GovernanceRiskIndicator";

// ---------------------------------------------------------------------------
// 57–60  RolePermission & UserRole Family
// ---------------------------------------------------------------------------
export { default as RolePermissionMatrix } from "./RolePermissionMatrix";
export type { RolePermissionMatrixProps } from "./RolePermissionMatrix";

export { default as RolePermissionCell } from "./RolePermissionCell";
export type { RolePermissionCellProps } from "./RolePermissionCell";

export { default as UserRoleCard } from "./UserRoleCard";
export type { UserRoleCardProps } from "./UserRoleCard";

export { default as UserRoleSelector } from "./UserRoleSelector";
export type { UserRoleSelectorProps } from "./UserRoleSelector";

// ---------------------------------------------------------------------------
// 61–66  SessionAuthority Family
// ---------------------------------------------------------------------------
export { default as SessionAuthorityPanel } from "./SessionAuthorityPanel";
export type { SessionAuthorityPanelProps } from "./SessionAuthorityPanel";

export { default as SessionAuthorityHistory } from "./SessionAuthorityHistory";
export type { SessionAuthorityHistoryProps } from "./SessionAuthorityHistory";

export { default as AuthorityEscalationRequest } from "./AuthorityEscalationRequest";
export type { AuthorityEscalationRequestProps } from "./AuthorityEscalationRequest";

export { default as AuthorityEscalationApproval } from "./AuthorityEscalationApproval";
export type { AuthorityEscalationApprovalProps } from "./AuthorityEscalationApproval";

export { default as AuthorityDelegationCard } from "./AuthorityDelegationCard";
export type { AuthorityDelegationCardProps } from "./AuthorityDelegationCard";

export { default as AuthorityRevocationButton } from "./AuthorityRevocationButton";
export type { AuthorityRevocationButtonProps } from "./AuthorityRevocationButton";

// ---------------------------------------------------------------------------
// 67–70  GovernanceReport & DataRetention Family
// ---------------------------------------------------------------------------
export { default as GovernanceReportGenerator } from "./GovernanceReportGenerator";
export type { GovernanceReportGeneratorProps } from "./GovernanceReportGenerator";

export { default as GovernanceReportViewer } from "./GovernanceReportViewer";
export type { GovernanceReportViewerProps } from "./GovernanceReportViewer";

export { default as DataRetentionPolicyEditor } from "./DataRetentionPolicyEditor";
export type { DataRetentionPolicyEditorProps } from "./DataRetentionPolicyEditor";

export { default as PrivacySettingsPanel } from "./PrivacySettingsPanel";
export type { PrivacySettingsPanelProps } from "./PrivacySettingsPanel";
