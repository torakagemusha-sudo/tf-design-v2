/**
 * @fileoverview Barrel export for the Torafirma Runtime, Trace & Console component family.
 * All components in this directory are exported from this module.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console
 * @version 0.2.0
 */

// Central types module
export * from "./types";

// Core Trace Console (1-7)
export { TraceConsole, type TraceConsoleProps } from "./TraceConsole";
export { TraceConsoleHeader, type TraceConsoleHeaderProps } from "./TraceConsoleHeader";
export { TraceConsoleToolbar, type TraceConsoleToolbarProps } from "./TraceConsoleToolbar";
export { TraceConsoleFilter, type TraceConsoleFilterProps, type TraceFilterState } from "./TraceConsoleFilter";
export { TraceConsoleSearch, type TraceConsoleSearchProps } from "./TraceConsoleSearch";
export { TraceConsoleExport, type TraceConsoleExportProps, type ExportFormat } from "./TraceConsoleExport";
export { TraceConsoleSettings, type TraceConsoleSettingsProps, type ConsoleSettings, DEFAULT_CONSOLE_SETTINGS } from "./TraceConsoleSettings";

// Event Stream (8-12)
export { EventStream, type EventStreamProps } from "./EventStream";
export { EventStreamItem, type EventStreamItemProps } from "./EventStreamItem";
export { EventStreamHeader, type EventStreamHeaderProps } from "./EventStreamHeader";
export { EventStreamFilter, type EventStreamFilterProps, type StreamFilterState } from "./EventStreamFilter";
export { EventStreamBadge, type EventStreamBadgeProps } from "./EventStreamBadge";

// Runtime Target (13-16)
export { RuntimeTargetSelector, type RuntimeTargetSelectorProps } from "./RuntimeTargetSelector";
export { RuntimeTargetCard, type RuntimeTargetCardProps } from "./RuntimeTargetCard";
export { RuntimeTargetStatus, type RuntimeTargetStatusProps } from "./RuntimeTargetStatus";
export { RuntimeTargetMetrics, type RuntimeTargetMetricsProps } from "./RuntimeTargetMetrics";

// Process Panel (17-21)
export { ProcessPanel, type ProcessPanelProps } from "./ProcessPanel";
export { ProcessList, type ProcessListProps } from "./ProcessList";
export { ProcessItem, type ProcessItemProps } from "./ProcessItem";
export { ProcessTree, type ProcessTreeProps } from "./ProcessTree";
export { ProcessStats, type ProcessStatsProps } from "./ProcessStats";

// Log Viewer (22-32)
export { LogViewer, type LogViewerProps } from "./LogViewer";
export { LogLine, type LogLineProps } from "./LogLine";
export { LogLevelBadge, type LogLevelBadgeProps, LEVEL_ICONS } from "./LogLevelBadge";
export { LogTimestamp, type LogTimestampProps } from "./LogTimestamp";
export { LogSource, type LogSourceProps } from "./LogSource";
export { LogFilterBar, type LogFilterBarProps } from "./LogFilterBar";
export { LogSearch, type LogSearchProps } from "./LogSearch";
export { LogHighlight, type LogHighlightProps } from "./LogHighlight";
export { LogColorize, type LogColorizeProps, LEVEL_COLORS } from "./LogColorize";
export { LogFollowToggle, type LogFollowToggleProps } from "./LogFollowToggle";
export { LogWrapToggle, type LogWrapToggleProps } from "./LogWrapToggle";

// Execution Timeline (33-39)
export { ExecutionTimeline, type ExecutionTimelineProps } from "./ExecutionTimeline";
export { ExecutionTimelineTrack, type ExecutionTimelineTrackProps } from "./ExecutionTimelineTrack";
export { ExecutionTimelineEvent, type ExecutionTimelineEventProps } from "./ExecutionTimelineEvent";
export { ExecutionTimelineRuler, type ExecutionTimelineRulerProps } from "./ExecutionTimelineRuler";
export { ExecutionTimelineZoom, type ExecutionTimelineZoomProps } from "./ExecutionTimelineZoom";
export { ExecutionTimelineCursor, type ExecutionTimelineCursorProps } from "./ExecutionTimelineCursor";
export { ExecutionTimelineSelection, type ExecutionTimelineSelectionProps } from "./ExecutionTimelineSelection";

// Terminal Pane (40-45)
export { TerminalPane, type TerminalPaneProps } from "./TerminalPane";
export { TerminalLine, type TerminalLineProps } from "./TerminalLine";
export { TerminalPrompt, type TerminalPromptProps } from "./TerminalPrompt";
export { TerminalCursor, type TerminalCursorProps } from "./TerminalCursor";
export { TerminalHistory, type TerminalHistoryProps } from "./TerminalHistory";
export { TerminalAutocomplete, type TerminalAutocompleteProps } from "./TerminalAutocomplete";

// Trace Event Detail (46-56)
export { TraceEventCard, type TraceEventCardProps } from "./TraceEventCard";
export { TraceEventHeader, type TraceEventHeaderProps } from "./TraceEventHeader";
export { TraceEventBody, type TraceEventBodyProps } from "./TraceEventBody";
export { TraceEventMetadata, type TraceEventMetadataProps } from "./TraceEventMetadata";
export { TraceEventStackTrace, type TraceEventStackTraceProps } from "./TraceEventStackTrace";
export { TraceEventTiming, type TraceEventTimingProps } from "./TraceEventTiming";
export { TraceEventDiff, type TraceEventDiffProps } from "./TraceEventDiff";
export { TraceEventActor, type TraceEventActorProps } from "./TraceEventActor";
export { TraceEventAuthority, type TraceEventAuthorityProps } from "./TraceEventAuthority";
export { TraceEventResult, type TraceEventResultProps } from "./TraceEventResult";
export { TraceEventReason, type TraceEventReasonProps } from "./TraceEventReason";

// Trace Tree & Visualization (57-62)
export { TraceTreeView, type TraceTreeViewProps } from "./TraceTreeView";
export { TraceTreeNode, type TraceTreeNodeProps } from "./TraceTreeNode";
export { TraceTreeToggle, type TraceTreeToggleProps } from "./TraceTreeToggle";
export { TraceFlameGraph, type TraceFlameGraphProps } from "./TraceFlameGraph";
export { TraceFlameBar, type TraceFlameBarProps } from "./TraceFlameBar";
export { TraceFlameTooltip, type TraceFlameTooltipProps } from "./TraceFlameTooltip";

// Trace Spans & Waterfall (63-69)
export { TraceSpanList, type TraceSpanListProps } from "./TraceSpanList";
export { TraceSpanItem, type TraceSpanItemProps } from "./TraceSpanItem";
export { TraceSpanBar, type TraceSpanBarProps } from "./TraceSpanBar";
export { TraceSpanDetail, type TraceSpanDetailProps } from "./TraceSpanDetail";
export { TraceWaterfall, type TraceWaterfallProps } from "./TraceWaterfall";
export { TraceWaterfallRow, type TraceWaterfallRowProps } from "./TraceWaterfallRow";
export { TraceWaterfallBar, type TraceWaterfallBarProps } from "./TraceWaterfallBar";

// Trace Analysis (70-79)
export { TraceDependencyGraph, type TraceDependencyGraphProps } from "./TraceDependencyGraph";
export { TraceSummaryPanel, type TraceSummaryPanelProps } from "./TraceSummaryPanel";
export { TraceErrorHighlight, type TraceErrorHighlightProps } from "./TraceErrorHighlight";
export { TraceWarningHighlight, type TraceWarningHighlightProps } from "./TraceWarningHighlight";
export { TraceLatencyHistogram, type TraceLatencyHistogramProps } from "./TraceLatencyHistogram";
export { TraceLatencyPercentile, type TraceLatencyPercentileProps } from "./TraceLatencyPercentile";
export { TraceCorrelationMatrix, type TraceCorrelationMatrixProps } from "./TraceCorrelationMatrix";
export { TraceComparison, type TraceComparisonProps } from "./TraceComparison";
export { TraceBookmark, type TraceBookmarkProps } from "./TraceBookmark";
export { TraceAnnotation, type TraceAnnotationProps } from "./TraceAnnotation";

// Trace Import/Export (80-81)
export { TraceExportPanel, type TraceExportPanelProps, type TraceExportFormat, type TraceExportFilters } from "./TraceExportPanel";
export { TraceImportPanel, type TraceImportPanelProps } from "./TraceImportPanel";

// Console I/O (82-88)
export { ConsolePrompt, type ConsolePromptProps } from "./ConsolePrompt";
export { ConsoleOutput, type ConsoleOutputProps } from "./ConsoleOutput";
export { ConsoleCommandHistory, type ConsoleCommandHistoryProps } from "./ConsoleCommandHistory";
export { ConsoleAutoComplete, type ConsoleAutoCompleteProps } from "./ConsoleAutoComplete";
export { ConsoleSyntaxHighlight, type ConsoleSyntaxHighlightProps, type SyntaxLanguage } from "./ConsoleSyntaxHighlight";
export { ConsoleErrorDisplay, type ConsoleErrorDisplayProps } from "./ConsoleErrorDisplay";
export { ConsoleWarningDisplay, type ConsoleWarningDisplayProps } from "./ConsoleWarningDisplay";

// Console Output Display (89-94)
export { ConsoleInfoDisplay, type ConsoleInfoDisplayProps } from "./ConsoleInfoDisplay";
export { ConsoleDebugDisplay, type ConsoleDebugDisplayProps } from "./ConsoleDebugDisplay";
export { ConsoleTableOutput, type ConsoleTableOutputProps } from "./ConsoleTableOutput";
export { ConsoleJsonOutput, type ConsoleJsonOutputProps } from "./ConsoleJsonOutput";
export { ConsoleProgressOutput, type ConsoleProgressOutputProps } from "./ConsoleProgressOutput";
export { ConsoleSpinner, type ConsoleSpinnerProps } from "./ConsoleSpinner";

// Runtime Metrics (95-100)
export { RuntimeMetricsPanel, type RuntimeMetricsPanelProps } from "./RuntimeMetricsPanel";
export { RuntimeMetricGauge, type RuntimeMetricGaugeProps } from "./RuntimeMetricGauge";
export { RuntimeMetricSparkline, type RuntimeMetricSparklineProps } from "./RuntimeMetricSparkline";
export { RuntimeMetricAlert, type RuntimeMetricAlertProps } from "./RuntimeMetricAlert";
export { RuntimeConnectionStatus, type RuntimeConnectionStatusProps, type ConnectionState } from "./RuntimeConnectionStatus";
export { RuntimeSwitchButton, type RuntimeSwitchButtonProps } from "./RuntimeSwitchButton";
