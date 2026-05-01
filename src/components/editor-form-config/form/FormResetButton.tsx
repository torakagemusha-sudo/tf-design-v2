import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormResetButton — resets form to initial/default values.
 *
 * @example
 * <FormResetButton onReset={handleReset} dirty={true} />
 */
export interface FormResetButtonProps extends BaseComponentProps {
  onReset: () => void;
  dirty?: boolean;
  disabled?: boolean;
  label?: string;
  confirm?: boolean;
  confirmMessage?: string;
}

export const FormResetButton: React.FC<FormResetButtonProps> = ({
  onReset,
  dirty = false,
  disabled = false,
  label = "Reset",
  confirm = false,
  confirmMessage = "Reset all changes?",
  className = "",
  style,
  ...rest
}) => (
  <button
    className={`tf-form-reset-btn ${dirty ? "tf-form-reset-btn--dirty" : ""} ${className}`}
    style={style}
    type="reset"
    disabled={disabled || !dirty}
    onClick={() => {
      if (!confirm || window.confirm(confirmMessage)) onReset();
    }}
    data-testid="form-reset-button"
    {...rest}
  >
    ⟲ {label}
  </button>
);

FormResetButton.displayName = "FormResetButton";
export default FormResetButton;
