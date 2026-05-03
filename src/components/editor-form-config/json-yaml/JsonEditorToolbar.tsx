import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { JsonEditorExpandButton } from "./JsonEditorExpandButton";
import { JsonEditorSearch } from "./JsonEditorSearch";
import { JsonEditorFormatButton } from "./JsonEditorFormatButton";
import { JsonEditorValidateButton } from "./JsonEditorValidateButton";
import { JsonEditorCollapseButton } from "./JsonEditorCollapseButton";

/**
 * JsonEditorToolbar — toolbar for the JSON editor with view mode toggle and actions.
 *
 * @example
 * <JsonEditorToolbar viewMode="tree" onViewModeChange={setMode} onFormat={format} isValid />
 */
export interface JsonEditorToolbarProps extends BaseComponentProps {
  /** Current view mode */
  viewMode: JsonViewMode;
  /** View mode change */
  onViewModeChange: (mode: JsonViewMode) => void;
  /** Format handler */
  onFormat?: () => void;
  /** Validation status */
  isValid: boolean;
  /** Collapse all handler */
  onCollapseAll?: () => void;
  /** Expand all handler */
  onExpandAll?: () => void;
  /** Search query */
  searchQuery?: string;
  /** Search change */
  onSearchChange?: (q: string) => void;
  /** Validate handler */
  onValidate?: () => void;
}

export const JsonEditorToolbar: React.FC<JsonEditorToolbarProps> = ({
  viewMode,
  onViewModeChange,
  onFormat,
  isValid,
  onCollapseAll,
  onExpandAll,
  searchQuery = "",
  onSearchChange,
  onValidate,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-json-editor-toolbar ${className}`} style={style} data-testid="json-editor-toolbar" {...rest}>
    <div className="tf-json-editor-toolbar__modes">
      {(["tree", "text", "split"] as JsonViewMode[]).map(m => (
        <button
          key={m}
          className={`tf-json-editor-toolbar__mode ${viewMode === m ? "tf-json-editor-toolbar__mode--active" : ""}`}
          onClick={() => onViewModeChange(m)}
        >
          {m.charAt(0).toUpperCase() + m.slice(1)}
        </button>
      ))}
    </div>
    <div className="tf-json-editor-toolbar__divider" />
    <div className="tf-json-editor-toolbar__actions">
      {onFormat && <JsonEditorFormatButton onFormat={onFormat} />}
      {onValidate && <JsonEditorValidateButton onValidate={onValidate} isValid={isValid} />}
      {onCollapseAll && <JsonEditorCollapseButton onCollapseAll={onCollapseAll} />}
      {onExpandAll && <JsonEditorExpandButton onExpandAll={onExpandAll} />}
    </div>
    <div className="tf-json-editor-toolbar__divider" />
    {onSearchChange && (
      <JsonEditorSearch query={searchQuery} onChange={onSearchChange} />
    )}
    <div className={`tf-json-editor-toolbar__validity ${isValid ? "tf-json-editor-toolbar__validity--ok" : "tf-json-editor-toolbar__validity--error"}`}>
      {isValid ? "✓ Valid" : "✗ Invalid"}
    </div>
  </div>
);

JsonEditorToolbar.displayName = "JsonEditorToolbar";
export default JsonEditorToolbar;
