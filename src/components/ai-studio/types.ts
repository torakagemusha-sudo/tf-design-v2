/**
 * ============================================================================
 * Torafirma Design System — AI-Assisted Studio Type Definitions
 * ============================================================================
 * Central types, interfaces and enums for the AI Studio component family.
 * All components import from this module.
 * ============================================================================
 */

// ─── Intent & Input Types ───────────────────────────────────────────────────

/** A single intent entry in the user's input history */
export interface IntentHistoryEntry {
  id: string;
  text: string;
  timestamp: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

/** An autocomplete suggestion for intent input */
export interface IntentSuggestion {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  category?: string;
}

// ─── AI Proposal Types ──────────────────────────────────────────────────────

/** Confidence level for an AI proposal */
export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'uncertain';

/** A single AI-generated proposal */
export interface AIProposal {
  id: string;
  title: string;
  description: string;
  confidence: ConfidenceLevel;
  confidenceScore: number;
  createdAt: Date;
  category?: string;
  tags?: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'modified';
}

/** Filter criteria for proposals */
export interface ProposalFilter {
  category?: string;
  confidence?: ConfidenceLevel[];
  status?: string[];
  searchQuery?: string;
}

// ─── Patch & Diff Types ─────────────────────────────────────────────────────

/** Type of change in a diff */
export type DiffChangeType = 'added' | 'removed' | 'modified' | 'context';

/** A single line in a diff */
export interface DiffLine {
  type: DiffChangeType;
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

/** A hunk of changes in a diff */
export interface DiffHunk {
  id: string;
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  heading?: string;
  lines: DiffLine[];
}

/** A file diff */
export interface FileDiff {
  id: string;
  oldPath: string;
  newPath: string;
  isNew: boolean;
  isDeleted: boolean;
  hunks: DiffHunk[];
}

/** Diff viewer display mode */
export type DiffDisplayMode = 'side-by-side' | 'unified' | 'inline';

// ─── Suggestion Queue Types ─────────────────────────────────────────────────

/** Priority level for a suggestion */
export type SuggestionPriority = 'critical' | 'high' | 'medium' | 'low';

/** A single AI suggestion in the queue */
export interface AISuggestion {
  id: string;
  title: string;
  description: string;
  priority: SuggestionPriority;
  confidence: number;
  category: string;
  createdAt: Date;
  status: 'new' | 'viewed' | 'accepted' | 'rejected' | 'deferred';
}

// ─── Assumption Types ───────────────────────────────────────────────────────

/** An assumption made by the AI */
export interface AIAssumption {
  id: string;
  text: string;
  confidence: number;
  category: string;
  isValidated: boolean;
  isValid?: boolean;
  evidence?: string[];
}

// ─── Chat Types ─────────────────────────────────────────────────────────────

/** A single chat message */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  model?: string;
}

/** Suggested prompt for the user */
export interface SuggestedPrompt {
  id: string;
  label: string;
  prompt: string;
  category?: string;
}

// ─── Model Types ────────────────────────────────────────────────────────────

/** AI model information */
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  version: string;
  description: string;
  capabilities: ModelCapability[];
  status: 'available' | 'unavailable' | 'degraded' | 'deprecated';
  maxTokens: number;
  contextWindow: number;
  pricing?: {
    inputPer1K: number;
    outputPer1K: number;
  };
}

/** Model capability */
export interface ModelCapability {
  name: string;
  description: string;
  isSupported: boolean;
}

// ─── Prompt Template Types ──────────────────────────────────────────────────

/** A prompt template */
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: PromptVariable[];
  category: string;
  isSystem?: boolean;
}

/** A variable in a prompt template */
export interface PromptVariable {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'textarea';
  defaultValue?: string;
  options?: string[];
  required: boolean;
  description?: string;
}

// ─── Token & Cost Types ─────────────────────────────────────────────────────

/** Token usage statistics */
export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  promptCost: number;
  completionCost: number;
  totalCost: number;
}

/** Cost estimate for an operation */
export interface CostEstimate {
  minTokens: number;
  maxTokens: number;
  estimatedCost: number;
  currency: string;
}

// ─── Feedback Types ─────────────────────────────────────────────────────────

/** Feedback on an AI output */
export interface AIFeedback {
  id: string;
  rating: 'positive' | 'negative' | 'neutral';
  comment?: string;
  dimensions?: FeedbackDimension[];
  timestamp: Date;
}

/** Feedback dimension score */
export interface FeedbackDimension {
  name: string;
  score: number;
  maxScore: number;
  description?: string;
}

// ─── Training Types ─────────────────────────────────────────────────────────

/** A training example */
export interface TrainingExample {
  id: string;
  input: string;
  expectedOutput: string;
  metadata?: Record<string, unknown>;
  isValidated: boolean;
}

/** Fine-tuning job status */
export interface FineTuneStatus {
  id: string;
  modelId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  startedAt?: Date;
  completedAt?: Date;
  epochs?: number;
  loss?: number;
}

// ─── Pipeline Types ─────────────────────────────────────────────────────────

/** A node in an AI pipeline */
export interface PipelineNode {
  id: string;
  type: string;
  label: string;
  config: Record<string, unknown>;
  position: { x: number; y: number };
  status: 'idle' | 'running' | 'completed' | 'error';
}

/** An edge connecting pipeline nodes */
export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

// ─── Experiment Types ───────────────────────────────────────────────────────

/** An AI experiment */
export interface AIExperiment {
  id: string;
  name: string;
  description: string;
  modelId: string;
  status: 'draft' | 'running' | 'completed' | 'failed';
  metrics: ExperimentMetric[];
  startedAt?: Date;
  completedAt?: Date;
}

/** Experiment metric */
export interface ExperimentMetric {
  name: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
}

// ─── Model Version Types ────────────────────────────────────────────────────

/** A model version */
export interface ModelVersion {
  id: string;
  version: string;
  createdAt: Date;
  isActive: boolean;
  deploymentStatus: 'not_deployed' | 'deploying' | 'deployed' | 'rolling_back';
}

// ─── Safety & Ethics Types ──────────────────────────────────────────────────

/** Safety check result */
export interface SafetyCheckResult {
  id: string;
  check: string;
  passed: boolean;
  severity?: 'critical' | 'warning' | 'info';
  details?: string;
  category: string;
}

/** Bias detection result */
export interface BiasDetectionResult {
  dimension: string;
  score: number;
  findings: string[];
  recommendations: string[];
}

/** Explainability result */
export interface ExplainabilityResult {
  feature: string;
  importance: number;
  direction: 'positive' | 'negative' | 'neutral';
  description?: string;
}

/** Ethics review checklist item */
export interface EthicsReviewItem {
  id: string;
  principle: string;
  question: string;
  status: 'pending' | 'passed' | 'failed' | 'na';
  evidence?: string;
  notes?: string;
}

/** Model card information */
export interface ModelCard {
  id: string;
  modelName: string;
  version: string;
  description: string;
  intendedUse: string;
  factors: string[];
  metrics: Record<string, number>;
  evaluationData: string;
  trainingData: string;
  ethicalConsiderations: string[];
  caveats: string[];
  license: string;
}

/** Data source attribution */
export interface DataSourceAttribution {
  id: string;
  name: string;
  url?: string;
  description: string;
  license?: string;
  usagePercent?: number;
}

// ─── Utility Types ──────────────────────────────────────────────────────────

/** Common component size */
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

/** Common component variant */
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'warning' | 'success';

/** An item in the AI context selector */
export interface AIContextItem {
  id: string;
  label: string;
  type: string;
  isSelected: boolean;
  priority?: number;
  description?: string;
}
