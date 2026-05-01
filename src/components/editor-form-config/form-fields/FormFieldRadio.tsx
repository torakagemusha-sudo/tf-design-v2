import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldRadio — single radio button with label.
 *
 * @example
 * <FormFieldRadio name="theme" label="Dark" value="dark" selectedValue="dark" onChange={handleChange} />
 */
export interface FormFieldRadioProps extends BaseComponentProps {
  name: string;
  label?: string;
  value: string;
  selectedValue?: string;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
  readonly?: boolean;
}

export const FormFieldRadio: React.FC<FormFieldRadioProps> = ({
  name,
  label,
  value,
  selectedValue,
  onChange,
  disabled = false,
  readonly = false,
  className = "",
  style,
  ...rest
}) => (
  <label className={`tf-form-field-radio ${selectedValue === value ? "tf-form-field-radio--selected" : ""} ${className}`} style={style} data-testid={`form-field-radio-${name}-${value}`} {...rest}>
    <input
      className="tf-form-field-radio__input"
      type="radio"
      name={name}
      value={value}
      checked={selectedValue === value}
      onChange={() => onChange(name, value)}
      disabled={disabled || readonly}
    />
    <span className="tf-form-field-radio__circle">
      {selectedValue === value && <span className="tf-form-field-radio__dot" />}
    </span>
    {label && <span className="tf-form-field-radio__text">{label}</span>}
  </label>
);

FormFieldRadio.displayName = "FormFieldRadio";
export default FormFieldRadio;
