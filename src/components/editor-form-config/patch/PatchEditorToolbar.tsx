import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PatchEditorToolbar — toolbar for patch editor with file info and selection controls.
 *
 * @example
 * <PatchEditorToolbar filename="app.ts" added={10} removed={5} selectedCount={3} totalCount={5} />
 */
export interface PatchEditorToolbarProps extends BaseComponentProps {
  filename: string;
  oldLabel?: string;
  newLabel?: string;
  added: number;
  removed: number;
  selectedCount: number;
  totalCount: number;
  reviewedCount: number;
  onSelectAll: () => void;
  onSelectNone: () => void;
}

export const PatchEditorToolbar: React.FC<PatchEditorToolbarProps> = ({
  filename,
  oldLabel,
  newLabel,
  added,
  removed,
  selectedCount,
  totalCount,
  reviewedCount,
  onSelectAll,
  onSelectNone,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-patch-editor-toolbar ${className}`} style={style} data-testid="patch-editor-toolbar" {...rest}>
    <div className="tf-patch-editor-toolbar__file">
      <span className="tf-patch-editor-toolbar__filename">{filename}</span>
      {oldLabel && newLabel && (
        <span className="tf-patch-editor-toolbar__labels">{oldLabel} → {newLabel}</span>
      )}
    </div>
    <div className="tf-patch-editor-toolbar__stats">
      <span className="tf-patch-editor-toolbar__stat tf-patch-editor-toolbar__stat--added">+{added}</span>
      <span className="tf-patch-editor-toolbar__stat tf-patch-editor-toolbar__stat--removed">−{removed}</span>
      <span className="tf-patch-editor-toolbar__stat">{selectedCount}/{totalCount} selected</span>
      <span className="tf-patch-editor-toolbar__stat">{reviewedCount}/{totalCount} reviewed</span>
    </div>
    <div className="tf-patch-editor-toolbar__selection">
      <button className="tf-patch-editor-toolbar__btn" onClick={onSelectAll} type="button">Select All</button>
      <button className="tf-patch-editor-toolbar__btn" onClick={onSelectNone} type="button">Select None</button>
    </div>
  </div>
);

PatchEditorToolbar.displayName = "PatchEditorToolbar";
export default PatchEditorToolbar;
