import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldCheckboxGroup — group of checkboxes for multi-select scenarios.
 *
 * @example
 * <FormFieldCheckboxGroup name="roles" label="Roles" values={["admin"]} options={roleOptions} onChange={handleChange} />
 */
export interface FormFieldCheckboxGroupProps extends BaseComponentProps {
  name: string;
  label?: string;
  values: string[];
  options: FieldOption[];
  onChange: (name: string, values: string[]) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  layout?: "vertical" | "horizontal";
}

export const FormFieldCheckboxGroup: React.FC<FormFieldCheckboxGroupProps> = ({
  name,
  label,
  values,
  options,
  onChange,
  error,
  disabled = false,
  readonly = false,
  layout = "vertical",
  className = "",
  style,
  ...rest
}) => {
  const toggle = useCallback((val: string) => {
    onChange(name, values.includes(val) ? values.filter(v => v !== val) : [...values, val]);
  }, [name, values, onChange]);

  return (
    <fieldset className={`tf-form-field-checkbox-group tf-form-field-checkbox-group--${layout} ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-checkbox-group-${name}`} {...rest}>
      {label && <legend className="tf-form-field__label">{label}</legend>}
      <div className="tf-form-field-checkbox-group__options">
        {options.map(opt => (
          <label key={String(opt.value)} className="tf-form-field-checkbox-group__option">
            <input
              type="checkbox"
              className="tf-form-field-checkbox-group__input"
              checked={values.includes(String(opt.value))}
              onChange={() => toggle(String(opt.value))}
              disabled={disabled || opt.disabled}
            />
            <span className="tf-form-field-checkbox-group__box" />
            <span className="tf-form-field-checkbox-group__label-text">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </fieldset>
  );
};

FormFieldCheckboxGroup.displayName = "FormFieldCheckboxGroup";
export default FormFieldCheckboxGroup;
