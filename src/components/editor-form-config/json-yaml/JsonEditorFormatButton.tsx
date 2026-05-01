import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * JsonEditorFormatButton — format/prettify button for JSON editor.
 *
 * @example
 * <JsonEditorFormatButton onFormat={handleFormat} />
 */
export interface JsonEditorFormatButtonProps extends BaseComponentProps {
  /** Format handler */
  onFormat: () => void;
  /** Whether formatting is in progress */
  formatting?: boolean;
}

export const JsonEditorFormatButton: React.FC<JsonEditorFormatButtonProps> = ({
  onFormat,
  formatting = false,
  className = "",
  style,
  ...rest
}) => (
  <button
    className={`tf-json-editor-format-btn ${formatting ? "tf-json-editor-format-btn--busy" : ""} ${className}`}
    style={style}
    onClick={onFormat}
    disabled={formatting}
    title="Format / Prettify JSON"
    type="button"
    data-testid="json-editor-format-button"
    {...rest}
  >
    {"{ }"}
    <span className="tf-json-editor-format-btn__label">Format</span>
  </button>
);

JsonEditorFormatButton.displayName = "JsonEditorFormatButton";
export default JsonEditorFormatButton;
