import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * JsonEditorValidateButton — validate button for JSON editor.
 *
 * @example
 * <JsonEditorValidateButton onValidate={validate} isValid={true} />
 */
export interface JsonEditorValidateButtonProps extends BaseComponentProps {
  /** Validate handler */
  onValidate: () => void;
  /** Current validation state */
  isValid: boolean;
  /** Whether validation is running */
  validating?: boolean;
}

export const JsonEditorValidateButton: React.FC<JsonEditorValidateButtonProps> = ({
  onValidate,
  isValid,
  validating = false,
  className = "",
  style,
  ...rest
}) => (
  <button
    className={`tf-json-editor-validate-btn ${isValid ? "tf-json-editor-validate-btn--valid" : "tf-json-editor-validate-btn--invalid"} ${className}`}
    style={style}
    onClick={onValidate}
    disabled={validating}
    title={isValid ? "JSON is valid" : "Validate JSON"}
    type="button"
    data-testid="json-editor-validate-button"
    {...rest}
  >
    {isValid ? "✓" : "✗"}
    <span className="tf-json-editor-validate-btn__label">{validating ? "Checking..." : "Validate"}</span>
  </button>
);

JsonEditorValidateButton.displayName = "JsonEditorValidateButton";
export default JsonEditorValidateButton;
