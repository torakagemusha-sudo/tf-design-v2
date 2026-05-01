// Torafirma Command & Action Components — Barrel Export
// ======================================================
// This module exports the complete Command & Action component family
// for the Torafirma Design System.
//
// Components 1–50: All new components built for v2
// Reference existing v1 components from their respective modules.

// Quick Action Components
export { default as QuickActionChip } from './QuickActionChip';
export type { QuickActionChipProps } from './QuickActionChip';

export { default as SplitActionButton } from './SplitActionButton';
export type { SplitActionButtonProps } from './SplitActionButton';

export { default as ToggleCommandButton } from './ToggleCommandButton';
export type { ToggleCommandButtonProps } from './ToggleCommandButton';

export { default as CommandPill } from './CommandPill';
export type { CommandPillProps } from './CommandPill';

export { default as FloatingActionButton } from './FloatingActionButton';
export type { FloatingActionButtonProps } from './FloatingActionButton';

// Navigation & Organization Components
export { default as CommandBreadcrumb } from './CommandBreadcrumb';
export type { BreadcrumbSegment, CommandBreadcrumbProps } from './CommandBreadcrumb';

export { default as CommandGroupHeader } from './CommandGroupHeader';
export type { CommandGroupHeaderProps } from './CommandGroupHeader';

export { default as ActionDivider } from './ActionDivider';
export type { ActionDividerProps } from './ActionDivider';

export { default as ActionCollapsibleSection } from './ActionCollapsibleSection';
export type { ActionCollapsibleSectionProps } from './ActionCollapsibleSection';

// History & Favorites Components
export { default as CommandHistoryTray } from './CommandHistoryTray';
export type { CommandHistoryEntry, CommandHistoryTrayProps } from './CommandHistoryTray';

export { default as CommandFavoritesBar } from './CommandFavoritesBar';
export type { CommandFavoritesBarProps } from './CommandFavoritesBar';

export { default as CommandBookmarkButton } from './ActionBookmarkButton';
export type { ActionBookmarkButtonProps as CommandBookmarkButtonProps } from './ActionBookmarkButton';

export { default as CommandPinToggle } from './CommandPinToggle';
export type { CommandPinToggleProps } from './CommandPinToggle';

// Search & Discovery Components
export { default as CommandSearch } from './CommandSearch';
export type { CommandSearchProps } from './CommandSearch';

export { default as CommandTemplateSelector } from './CommandTemplateSelector';
export type { CommandTemplate, CommandTemplateSelectorProps } from './CommandTemplateSelector';

// Action Row & Toolbar Components
export { default as ActionButtonRow } from './ActionButtonRow';
export type { ActionButtonRowProps } from './ActionButtonRow';

export { default as ActionDropdown } from './ActionDropdown';
export type { CommandGroup, ActionDropdownProps } from './ActionDropdown';

export { default as BatchActionBar } from './BatchActionBar';
export type { BatchActionBarProps } from './BatchActionBar';

export { default as BulkActionPanel } from './BulkActionPanel';
export type { BulkItem, BulkActionPanelProps } from './BulkActionPanel';

export { default as ActionFilterToolbar } from './ActionFilterToolbar';
export type { ActionFilter, ActionFilterToolbarProps } from './ActionFilterToolbar';

// Status & Indicator Components
export { default as CommandStatusIndicator } from './CommandStatusIndicator';
export type { CommandStatusIndicatorProps } from './CommandStatusIndicator';

export { default as CommandShortcutHint } from './CommandShortcutHint';
export type { CommandShortcutHintProps } from './CommandShortcutHint';

export { default as ActionImpactBadge } from './ActionImpactBadge';
export type { ActionImpactLevel, ActionImpactBadgeProps } from './ActionImpactBadge';

export { default as ActionSeverityIndicator } from './ActionSeverityIndicator';
export type { ActionSeverity, ActionSeverityIndicatorProps } from './ActionSeverityIndicator';

export { default as CommandExecutionTimer } from './CommandExecutionTimer';
export type { CommandExecutionTimerProps } from './CommandExecutionTimer';

export { default as CommandSignalRIndicator } from './CommandSignalRIndicator';
export type { CommandSignalRIndicatorProps } from './CommandSignalRIndicator';

export { default as CommandRateLimiter } from './CommandRateLimiter';
export type { CommandRateLimiterProps } from './CommandRateLimiter';

// Access Control & Permission Components
export { default as CommandAccessControl } from './CommandAccessControl';
export type { CommandAccessControlProps } from './CommandAccessControl';

export { default as ActionPermissionRequest } from './ActionPermissionRequest';
export type { ActionPermissionRequestProps } from './ActionPermissionRequest';

// Staging & Preview Components
export { default as StagedCommandPreview } from './StagedCommandPreview';
export type { StagedCommandPreviewProps } from './StagedCommandPreview';

export { default as CommandProgressOverlay } from './CommandProgressOverlay';
export type { CommandProgressOverlayProps } from './CommandProgressOverlay';

export { default as ActionPreviewPane } from './ActionPreviewPane';
export type { ActionPreviewPaneProps } from './ActionPreviewPane';

export { default as CommandDryRunPanel } from './CommandDryRunPanel';
export type { DryRunResult, CommandDryRunPanelProps } from './CommandDryRunPanel';

// Wizard & Multi-Step Components
export { default as MultiStepCommandWizard } from './MultiStepCommandWizard';
export type { WizardStep, MultiStepCommandWizardProps } from './MultiStepCommandWizard';

export { default as ActionConfirmationStepper } from './ActionConfirmationStepper';
export type { ConfirmationStep, ActionConfirmationStepperProps } from './ActionConfirmationStepper';

// Conflict & Dependency Components
export { default as CommandConflictResolver } from './CommandConflictResolver';
export type { CommandConflict, CommandConflictResolverProps } from './CommandConflictResolver';

export { default as CommandDependencyTree } from './CommandDependencyTree';
export type { DependencyNode, CommandDependencyTreeProps } from './CommandDependencyTree';

// Summary & Audit Components
export { default as ActionSummaryCard } from './ActionSummaryCard';
export type { ActionImpact, ActionSummaryCardProps } from './ActionSummaryCard';

export { default as CommandAuditTrail } from './CommandAuditTrail';
export type { AuditEvent, CommandAuditTrailProps } from './CommandAuditTrail';

export { default as ActionMetadataPanel } from './ActionMetadataPanel';
export type { MetadataField, ActionMetadataPanelProps } from './ActionMetadataPanel';

// Rollback & Retry Components
export { default as CommandRollbackPanel } from './CommandRollbackPanel';
export type { RollableCommand, CommandRollbackPanelProps } from './CommandRollbackPanel';

export { default as CommandRetryControl } from './CommandRetryControl';
export type { CommandRetryControlProps } from './CommandRetryControl';

// Scheduling & Export Components
export { default as CommandScheduler } from './CommandScheduler';
export type { CommandSchedule, CommandSchedulerProps } from './CommandScheduler';

export { default as CommandExportButton } from './CommandExportButton';
export type { CommandExportButtonProps } from './CommandExportButton';

// Validation & Version Components
export { default as CommandValidationBanner } from './CommandValidationBanner';
export type { ValidationEntry, CommandValidationBannerProps } from './CommandValidationBanner';

export { default as CommandVersionSelector } from './CommandVersionSelector';
export type { CommandVersion, CommandVersionSelectorProps } from './CommandVersionSelector';

// Utility & Clone Components
export { default as CommandCloneButton } from './CommandCloneButton';
export type { CommandCloneButtonProps } from './CommandCloneButton';

export { default as ActionDiffViewer } from './ActionDiffViewer';
export type { DiffLine, ActionDiffViewerProps } from './ActionDiffViewer';

export { default as ActionPrioritySorter } from './ActionPrioritySorter';
export type { PrioritizedAction, ActionPrioritySorterProps } from './ActionPrioritySorter';

// Collaboration Components
export { default as ActionCommentThread } from './ActionCommentThread';
export type { ActionComment, ActionCommentThreadProps } from './ActionCommentThread';
