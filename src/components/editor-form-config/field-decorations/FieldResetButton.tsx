import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FieldResetButton — resets a single field to its default value.
 *
 * @example
 * <FieldResetButton onReset={() => onChange("name", "")} defaultValue="John" />
 */
export interface FieldResetButtonProps extends BaseComponentProps {
  onReset: () => void;
  defaultValue?: unknown;
  label?: string;
}

export const FieldResetButton: React.FC<FieldResetButtonProps> = ({
  onReset,
  defaultValue,
  label = "Reset",
  className = "",
  style,
  ...rest
}) => (
  <button
    className={`tf-field-reset-btn ${className}`}
    style={style}
    type="button"
    onClick={onReset}
    title={defaultValue !== undefined ? `Reset to "${String(defaultValue)}"` : "Reset to default"}
    data-testid="field-reset-button"
    {...rest}
  >
    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1v4l2.5-2.5M1 5a4 4 0 108 0" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>
    {label}
  </button>
);

FieldResetButton.displayName = "FieldResetButton";
export default FieldResetButton;
