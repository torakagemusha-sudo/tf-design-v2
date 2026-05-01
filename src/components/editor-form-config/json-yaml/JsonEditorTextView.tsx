import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * JsonEditorTextView — text view mode for JSON editor with syntax highlighting.
 *
 * @example
 * <JsonEditorTextView value={jsonString} onChange={handleChange} />
 */
export interface JsonEditorTextViewProps extends BaseComponentProps {
  /** Raw JSON string */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Readonly */
  readonly?: boolean;
  /** Parse error message */
  error?: string | null;
  /** Indent size */
  indent?: number;
}

export const JsonEditorTextView: React.FC<JsonEditorTextViewProps> = ({
  value,
  onChange,
  readonly = false,
  error,
  indent = 2,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-json-editor-text-view ${error ? "tf-json-editor-text-view--error" : ""} ${className}`} style={style} data-testid="json-editor-text-view" {...rest}>
    <textarea
      className="tf-json-editor-text-view__textarea"
      value={value}
      onChange={e => onChange(e.target.value)}
      readOnly={readonly}
      spellCheck={false}
      placeholder="Enter JSON..."
      style={{ tabSize: indent }}
    />
    {error && <div className="tf-json-editor-text-view__error">{error}</div>}
  </div>
);

JsonEditorTextView.displayName = "JsonEditorTextView";
export default JsonEditorTextView;
