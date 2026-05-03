import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import type { FormFieldProps } from "./formFieldTypes";
import { FormField } from "./FormField";

/**
 * FormFieldCombobox — combobox with editable text and dropdown selection.
 * Combines text input with a select dropdown.
 *
 * @example
 * <FormFieldCombobox name="framework" label="Framework" value="react" options={frameworks} onChange={handleChange} />
 */
export interface FormFieldComboboxProps extends Omit<FormFieldProps, "type"> {
  options: FieldOption[];
  /** Allow values not in options */
  creatable?: boolean;
}

export const FormFieldCombobox: React.FC<FormFieldComboboxProps> = ({
  options,
  creatable = false,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(String(props.value ?? ""));

  useEffect(() => { setInputValue(String(props.value ?? "")); }, [props.value]);

  const selectOption = useCallback((val: string) => {
    setInputValue(val);
    props.onChange(props.name, val);
    setOpen(false);
  }, [props]);

  return (
    <div className={`tf-form-field-combobox ${props.className || ""}`} data-testid={`form-field-combobox-${props.name}`}>
      {props.label && <label className="tf-form-field__label">{props.label}{props.required && <span className="tf-form-field__required">*</span>}</label>}
      <div className="tf-form-field-combobox__wrap">
        <input
          className="tf-form-field-combobox__input"
          type="text"
          value={inputValue}
          placeholder={props.placeholder}
          onChange={e => { setInputValue(e.target.value); props.onChange(props.name, e.target.value); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          disabled={props.disabled}
          readOnly={props.readonly}
        />
        <button type="button" className="tf-form-field-combobox__toggle" onClick={() => setOpen(o => !o)} tabIndex={-1}>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
        </button>
      </div>
      {open && (
        <ul className="tf-form-field-combobox__list">
          {options.filter(o => o.label.toLowerCase().includes(inputValue.toLowerCase())).map(opt => (
            <li key={String(opt.value)} className="tf-form-field-combobox__item" onMouseDown={() => selectOption(String(opt.value))}>
              {opt.label}
            </li>
          ))}
          {creatable && inputValue && !options.some(o => String(o.value) === inputValue) && (
            <li className="tf-form-field-combobox__item tf-form-field-combobox__item--create" onMouseDown={() => selectOption(inputValue)}>
              Create "{inputValue}"
            </li>
          )}
        </ul>
      )}
      {props.error && <span className="tf-form-field__error">{props.error}</span>}
    </div>
  );
};

FormFieldCombobox.displayName = "FormFieldCombobox";
export default FormFieldCombobox;
