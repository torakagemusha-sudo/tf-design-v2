/**
 * ============================================================================
 * Torafirma Design System — AI-Assisted Studio Barrel Export
 * ============================================================================
 * Central barrel file exporting all AI Studio components.
 * Import from this module to access any AI-Assisted Studio component.
 *
 * @example
 * ```tsx
 * import { IntentInput, AIProposalCard, DiffViewer } from './ai-studio';
 * ```
 * ============================================================================
 */

// ─── Core Intent Input Components ───────────────────────────────────────────
export { default as AIBiasDetector } from './AIBiasDetector';
export { default as AIChatHistory } from './AIChatHistory';
export { default as AIChatInput } from './AIChatInput';
export { default as AIChatMessage } from './AIChatMessage';
export { default as AIChatPanel } from './AIChatPanel';

// ─── AI Proposal Components ─────────────────────────────────────────────────
export { default as AIChatSuggestedPrompts } from './AIChatSuggestedPrompts';
export { default as AIConfidenceCalibration } from './AIConfidenceCalibration';
export { default as AIContextItem } from './AIContextItem';
export { default as AIContextPriority } from './AIContextPriority';
export { default as AIContextSelector } from './AIContextSelector';
export { default as AIContextWindow } from './AIContextWindow';
export { default as AIContinueButton } from './AIContinueButton';

// ─── Patch Preview Components ───────────────────────────────────────────────
export { default as AICostEstimator } from './AICostEstimator';
export { default as AIDataSourceAttribution } from './AIDataSourceAttribution';
export { default as AIDebugPanel } from './AIDebugPanel';
export { default as AIDeploymentStatus } from './AIDeploymentStatus';
export { default as AIEthicsReviewPanel } from './AIEthicsReviewPanel';

// ─── Diff Viewer Components ─────────────────────────────────────────────────
export { default as AIEvaluationDimension } from './AIEvaluationDimension';
export { default as AIEvaluationPanel } from './AIEvaluationPanel';
export { default as AIEvaluationScore } from './AIEvaluationScore';
export { default as AIExperimentCard } from './AIExperimentCard';
export { default as AIExperimentMetrics } from './AIExperimentMetrics';
export { default as AIExperimentTracker } from './AIExperimentTracker';
export { default as AIExplanationPanel } from './AIExplanationPanel';

// ─── Suggestion Queue Components ────────────────────────────────────────────
export { default as AIFeedbackButton } from './AIFeedbackButton';
export { default as AIFeedbackForm } from './AIFeedbackForm';
export { default as AIFineTuneStatus } from './AIFineTuneStatus';
export { default as AILatencyIndicator } from './AILatencyIndicator';

// ─── Assumption Components ──────────────────────────────────────────────────
export { default as AILimeExplanation } from './AILimeExplanation';
export { default as AIMaxTokensInput } from './AIMaxTokensInput';
export { default as AIModelCapabilities } from './AIModelCapabilities';
export { default as AIModelCard } from './AIModelCard';

// ─── Accept / Reject / Revise Controls ──────────────────────────────────────
export { default as AIModelComparison } from './AIModelComparison';
export { default as AIModelInfo } from './AIModelInfo';
export { default as AIModelSelector } from './AIModelSelector';
export { default as AIModelStatus } from './AIModelStatus';

// ─── AI Chat Panel Components ───────────────────────────────────────────────
export { default as AIPipelineBuilder } from './AIPipelineBuilder';
export { default as AIPipelineEdge } from './AIPipelineEdge';
export { default as AIPipelineNode } from './AIPipelineNode';
export { default as AIPipelineToolbar } from './AIPipelineToolbar';
export { default as AIPromptBuilder } from './AIPromptBuilder';

// ─── AI Model Selector Components ───────────────────────────────────────────
export { default as AIPromptTemplate } from './AIPromptTemplate';
export { default as AIPromptTemplateCard } from './AIPromptTemplateCard';
export { default as AIPromptVariableInput } from './AIPromptVariableInput';
export { default as AIProposalActions } from './AIProposalActions';

// ─── AI Prompt Template Components ──────────────────────────────────────────
export { default as AIProposalCard } from './AIProposalCard';
export { default as AIProposalConfidence } from './AIProposalConfidence';
export { default as AIProposalContent } from './AIProposalContent';
export { default as AIProposalFilter } from './AIProposalFilter';

// ─── AI Parameter Controls ──────────────────────────────────────────────────
export { default as AIProposalHeader } from './AIProposalHeader';
export { default as AIProposalList } from './AIProposalList';
export { default as AIRegenerateButton } from './AIRegenerateButton';
export { default as AIRerunButton } from './AIRerunButton';
export { default as AISafetyChecker } from './AISafetyChecker';
export { default as AIShapValues } from './AIShapValues';

// ─── AI Action Buttons ──────────────────────────────────────────────────────
export { default as AIStopButton } from './AIStopButton';
export { default as AITemperatureControl } from './AITemperatureControl';
export { default as AITokenUsage } from './AITokenUsage';
export { default as AITrainingExample } from './AITrainingExample';

// ─── AI Usage & Cost Components ─────────────────────────────────────────────
export { default as AITrainingSet } from './AITrainingSet';
export { default as AIVersionSelector } from './AIVersionSelector';
export { default as AcceptButton } from './AcceptButton';
export { default as AcceptRejectControls } from './AcceptRejectControls';

// ─── AI Evaluation Components ───────────────────────────────────────────────
export { default as AssumptionConfidence } from './AssumptionConfidence';
export { default as AssumptionItem } from './AssumptionItem';
export { default as AssumptionList } from './AssumptionList';
export { default as AssumptionValidation } from './AssumptionValidation';
export { default as DiffViewer } from './DiffViewer';

// ─── AI Training Components ─────────────────────────────────────────────────
export { default as DiffViewerHeader } from './DiffViewerHeader';
export { default as DiffViewerHunkHeader } from './DiffViewerHunkHeader';
export { default as DiffViewerInline } from './DiffViewerInline';

// ─── AI Pipeline Components ─────────────────────────────────────────────────
export { default as DiffViewerLine } from './DiffViewerLine';
export { default as DiffViewerSideBySide } from './DiffViewerSideBySide';
export { default as DiffViewerUnified } from './DiffViewerUnified';
export { default as IntentInput } from './IntentInput';

// ─── AI Experiment Components ───────────────────────────────────────────────
export { default as IntentInputHistory } from './IntentInputHistory';
export { default as IntentInputSuggestion } from './IntentInputSuggestion';
export { default as IntentInputToolbar } from './IntentInputToolbar';
export { default as IntentInputVoiceButton } from './IntentInputVoiceButton';

// ─── AI Deployment & Debug Components ───────────────────────────────────────
export { default as PatchPreview } from './PatchPreview';
export { default as PatchPreviewActionBar } from './PatchPreviewActionBar';
export { default as PatchPreviewDiff } from './PatchPreviewDiff';

// ─── AI Safety & Ethics Components ──────────────────────────────────────────
export { default as PatchPreviewHeader } from './PatchPreviewHeader';
export { default as PatchPreviewHunk } from './PatchPreviewHunk';
export { default as RejectButton } from './RejectButton';
export { default as ReviseButton } from './ReviseButton';
export { default as SuggestionQueue } from './SuggestionQueue';
export { default as SuggestionQueueActions } from './SuggestionQueueActions';
export { default as SuggestionQueueItem } from './SuggestionQueueItem';
export { default as SuggestionQueuePriority } from './SuggestionQueuePriority';

// ─── Type Exports ───────────────────────────────────────────────────────────
export * from './types';
