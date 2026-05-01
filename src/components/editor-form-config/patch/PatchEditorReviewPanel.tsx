import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PatchEditorReviewPanel — side panel showing patch review status and progress.
 *
 * @example
 * <PatchEditorReviewPanel hunks={hunks} reviewedHunks={reviewed} selectedHunks={selected} />
 */
export interface PatchEditorReviewPanelProps extends BaseComponentProps {
  hunks: PatchHunk[];
  reviewedHunks: Set<string>;
  selectedHunks: Set<string>;
  /** Navigate to hunk handler */
  onNavigateToHunk?: (hunkId: string) => void;
}

export const PatchEditorReviewPanel: React.FC<PatchEditorReviewPanelProps> = ({
  hunks,
  reviewedHunks,
  selectedHunks,
  onNavigateToHunk,
  className = "",
  style,
  ...rest
}) => {
  const progress = hunks.length > 0 ? Math.round((reviewedHunks.size / hunks.length) * 100) : 0;

  return (
    <div className={`tf-patch-editor-review-panel ${className}`} style={style} data-testid="patch-editor-review-panel" {...rest}>
      <div className="tf-patch-editor-review-panel__progress">
        <div className="tf-patch-editor-review-panel__progress-bar" style={{ width: `${progress}%` }} />
        <span className="tf-patch-editor-review-panel__progress-text">{progress}% reviewed</span>
      </div>
      <div className="tf-patch-editor-review-panel__summary">
        <span className="tf-patch-editor-review-panel__stat">{selectedHunks.size} selected</span>
        <span className="tf-patch-editor-review-panel__stat">{reviewedHunks.size} accepted</span>
        <span className="tf-patch-editor-review-panel__stat">{hunks.length - reviewedHunks.size} pending</span>
      </div>
      <div className="tf-patch-editor-review-panel__hunks">
        {hunks.map(hunk => (
          <button
            key={hunk.id}
            className={`tf-patch-editor-review-panel__hunk ${selectedHunks.has(hunk.id) ? "tf-patch-editor-review-panel__hunk--selected" : ""} ${reviewedHunks.has(hunk.id) ? "tf-patch-editor-review-panel__hunk--reviewed" : ""}`}
            onClick={() => onNavigateToHunk?.(hunk.id)}
            type="button"
          >
            <span className="tf-patch-editor-review-panel__hunk-range">@@ {hunk.oldStart},{hunk.oldLines}</span>
            {hunk.header && <span className="tf-patch-editor-review-panel__hunk-header">{hunk.header}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

PatchEditorReviewPanel.displayName = "PatchEditorReviewPanel";
export default PatchEditorReviewPanel;
