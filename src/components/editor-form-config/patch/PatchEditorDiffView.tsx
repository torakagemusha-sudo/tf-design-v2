import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PatchEditorDiffView — side-by-side diff view for comparing original and modified files.
 *
 * @example
 * <PatchEditorDiffView original={oldCode} modified={newCode} filename="app.ts" />
 */
export interface PatchEditorDiffViewProps extends BaseComponentProps {
  /** Original file content */
  original: string;
  /** Modified file content */
  modified: string;
  /** Filename */
  filename?: string;
  /** Original file label */
  originalLabel?: string;
  /** Modified file label */
  modifiedLabel?: string;
  /** Syntax language */
  language?: string;
  /** Context lines */
  contextLines?: number;
}

export const PatchEditorDiffView: React.FC<PatchEditorDiffViewProps> = ({
  original,
  modified,
  filename = "file",
  originalLabel = "Original",
  modifiedLabel = "Modified",
  contextLines = 3,
  className = "",
  style,
  ...rest
}) => {
  const diff = useMemo(() => computeLineDiff(original, modified, contextLines), [original, modified, contextLines]);

  return (
    <div className={`tf-patch-editor-diff-view ${className}`} style={style} data-testid="patch-editor-diff-view" {...rest}>
      <div className="tf-patch-editor-diff-view__header">
        <div className="tf-patch-editor-diff-view__col tf-patch-editor-diff-view__col--original">{originalLabel}</div>
        <div className="tf-patch-editor-diff-view__col tf-patch-editor-diff-view__col--modified">{modifiedLabel}</div>
      </div>
      <div className="tf-patch-editor-diff-view__body">
        {diff.map((row, i) => (
          <div key={i} className={`tf-patch-editor-diff-view__row tf-patch-editor-diff-view__row--${row.type}`}>
            <div className="tf-patch-editor-diff-view__line-no">{row.oldLine ?? ""}</div>
            <div className="tf-patch-editor-diff-view__content tf-patch-editor-diff-view__content--original">{row.original}</div>
            <div className="tf-patch-editor-diff-view__line-no">{row.newLine ?? ""}</div>
            <div className="tf-patch-editor-diff-view__content tf-patch-editor-diff-view__content--modified">{row.modified}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

function computeLineDiff(original: string, modified: string, _context: number) {
  const origLines = original.split("\n");
  const modLines = modified.split("\n");
  const maxLen = Math.max(origLines.length, modLines.length);
  const result: Array<{ type: string; oldLine: number | null; newLine: number | null; original: string; modified: string }> = [];
  for (let i = 0; i < maxLen; i++) {
    const o = origLines[i] ?? "";
    const m = modLines[i] ?? "";
    if (o === m) {
      result.push({ type: "context", oldLine: i + 1, newLine: i + 1, original: o, modified: m });
    } else if (m === "" && i < origLines.length) {
      result.push({ type: "remove", oldLine: i + 1, newLine: null, original: o, modified: "" });
    } else if (o === "" && i < modLines.length) {
      result.push({ type: "add", oldLine: null, newLine: i + 1, original: "", modified: m });
    } else {
      result.push({ type: "remove", oldLine: i + 1, newLine: null, original: o, modified: "" });
      result.push({ type: "add", oldLine: null, newLine: i + 1, original: "", modified: m });
    }
  }
  return result;
}

PatchEditorDiffView.displayName = "PatchEditorDiffView";
export default PatchEditorDiffView;
