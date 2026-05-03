import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { PatchEditorLine } from "./PatchEditorLine";

/**
 * PatchEditorHunk — single patch hunk with selectable lines and review controls.
 *
 * @example
 * <PatchEditorHunk hunk={hunk} selected onToggleSelect={() => {}} onReview={handleReview} />
 */
export interface PatchEditorHunkProps extends BaseComponentProps {
  hunk: PatchHunk;
  selected?: boolean;
  reviewed?: boolean;
  onToggleSelect: () => void;
  onReview: (accepted: boolean) => void;
  viewMode?: "unified" | "split";
  readonly?: boolean;
}

export const PatchEditorHunk: React.FC<PatchEditorHunkProps> = ({
  hunk,
  selected = false,
  reviewed = false,
  onToggleSelect,
  onReview,
  viewMode = "unified",
  readonly = false,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-patch-editor-hunk ${selected ? "tf-patch-editor-hunk--selected" : ""} ${reviewed ? "tf-patch-editor-hunk--reviewed" : ""} tf-patch-editor-hunk--${viewMode} ${className}`} style={style} data-testid={`patch-hunk-${hunk.id}`} {...rest}>
    <div className="tf-patch-editor-hunk__header">
      <label className="tf-patch-editor-hunk__select">
        <input type="checkbox" checked={selected} onChange={onToggleSelect} />
      </label>
      <span className="tf-patch-editor-hunk__range">@@ -{hunk.oldStart},{hunk.oldLines} +{hunk.newStart},{hunk.newLines} @@</span>
      {hunk.header && <span className="tf-patch-editor-hunk__title">{hunk.header}</span>}
      {!readonly && (
        <div className="tf-patch-editor-hunk__review">
          <button
            className={`tf-patch-editor-hunk__accept ${reviewed ? "tf-patch-editor-hunk__accept--active" : ""}`}
            onClick={() => onReview(true)}
            title="Accept"
            type="button"
          >
            ✓
          </button>
          <button
            className="tf-patch-editor-hunk__reject"
            onClick={() => onReview(false)}
            title="Reject"
            type="button"
          >
            ✗
          </button>
        </div>
      )}
    </div>
    <div className="tf-patch-editor-hunk__lines">
      {hunk.lines.map((line, i) => (
        <PatchEditorLine key={i} line={line} viewMode={viewMode} />
      ))}
    </div>
  </div>
);

PatchEditorHunk.displayName = "PatchEditorHunk";
export default PatchEditorHunk;
