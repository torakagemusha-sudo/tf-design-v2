import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldCheckbox — single checkbox with label.
 *
 * @example
 * <FormFieldCheckbox name="agree" label="I agree" checked={true} onChange={handleChange} />
 */
export interface FormFieldCheckboxProps extends BaseComponentProps {
  name: string;
  label?: string;
  checked?: boolean;
  onChange: (name: string, checked: boolean) => void;
  description?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  indeterminate?: boolean;
}

export const FormFieldCheckbox: React.FC<FormFieldCheckboxProps> = ({
  name,
  label,
  checked = false,
  onChange,
  description,
  error,
  disabled = false,
  readonly = false,
  indeterminate = false,
  className = "",
  style,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={`tf-form-field-checkbox ${checked ? "tf-form-field-checkbox--checked" : ""} ${error ? "tf-form-field-checkbox--error" : ""} ${className}`} style={style} data-testid={`form-field-checkbox-${name}`} {...rest}>
      <label className="tf-form-field-checkbox__label">
        <input
          ref={inputRef}
          className="tf-form-field-checkbox__input"
          type="checkbox"
          name={name}
          checked={checked}
          onChange={e => onChange(name, e.target.checked)}
          disabled={disabled || readonly}
        />
        <span className="tf-form-field-checkbox__box">
          {checked && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 2" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>}
          {indeterminate && <span className="tf-form-field-checkbox__indeterminate" />}
        </span>
        {label && <span className="tf-form-field-checkbox__text">{label}</span>}
      </label>
      {description && <span className="tf-form-field-checkbox__description">{description}</span>}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldCheckbox.displayName = "FormFieldCheckbox";
export default FormFieldCheckbox;
