import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";
import { FormFieldRadio } from "./FormFieldRadio";

/**
 * FormFieldRadioGroup — group of mutually exclusive radio buttons.
 *
 * @example
 * <FormFieldRadioGroup name="plan" label="Plan" value="pro" options={plans} onChange={handleChange} />
 */
export interface FormFieldRadioGroupProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  options: FieldOption[];
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  layout?: "vertical" | "horizontal";
}

export const FormFieldRadioGroup: React.FC<FormFieldRadioGroupProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  error,
  disabled = false,
  readonly = false,
  layout = "vertical",
  className = "",
  style,
  ...rest
}) => (
  <fieldset className={`tf-form-field-radio-group tf-form-field-radio-group--${layout} ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-radio-group-${name}`} {...rest}>
    {label && <legend className="tf-form-field__label">{label}</legend>}
    <div className="tf-form-field-radio-group__options">
      {options.map(opt => (
        <FormFieldRadio
          key={String(opt.value)}
          name={name}
          label={opt.label}
          value={String(opt.value)}
          selectedValue={value}
          onChange={onChange}
          disabled={disabled || opt.disabled}
        />
      ))}
    </div>
    {error && <span className="tf-form-field__error">{error}</span>}
  </fieldset>
);

FormFieldRadioGroup.displayName = "FormFieldRadioGroup";
export default FormFieldRadioGroup;
