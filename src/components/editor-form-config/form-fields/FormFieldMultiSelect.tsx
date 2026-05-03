import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import type { FormFieldProps } from "./formFieldTypes";
import { FormField } from "./FormField";

/**
 * FormFieldMultiSelect — multi-select dropdown with checkboxes or tag display.
 *
 * @example
 * <FormFieldMultiSelect name="tags" label="Tags" value={["a","b"]} options={tagOptions} onChange={handleChange} />
 */
export interface FormFieldMultiSelectProps extends Omit<FormFieldProps, "type"> {
  options: FieldOption[];
  /** Maximum selectable items */
  maxSelections?: number;
  /** Display mode */
  displayMode?: "dropdown" | "tags" | "checklist";
}

export const FormFieldMultiSelect: React.FC<FormFieldMultiSelectProps> = ({
  options,
  maxSelections,
  displayMode = "tags",
  ...props
}) => {
  const values = useMemo(() => Array.isArray(props.value) ? props.value as string[] : [], [props.value]);
  const fieldId = `tf-ffms-${props.name}`;

  const toggleValue = useCallback((val: string) => {
    if (values.includes(val)) {
      props.onChange(props.name, values.filter(v => v !== val));
    } else if (!maxSelections || values.length < maxSelections) {
      props.onChange(props.name, [...values, val]);
    }
  }, [values, maxSelections, props]);

  return (
    <div className={`tf-form-field-multi-select tf-form-field-multi-select--${displayMode} ${props.error ? "tf-form-field--error" : ""} ${props.className || ""}`} data-testid={`form-field-multi-select-${props.name}`}>
      {props.label && (
        <label className="tf-form-field__label" htmlFor={fieldId}>
          {props.label}
          {props.required && <span className="tf-form-field__required">*</span>}
        </label>
      )}
      {props.description && <span className="tf-form-field__description">{props.description}</span>}

      {displayMode === "tags" && (
        <div className="tf-form-field-multi-select__tags">
          {values.map(val => {
            const opt = options.find(o => String(o.value) === val);
            return (
              <span key={val} className="tf-form-field-multi-select__tag">
                {opt?.label || val}
                {!props.readonly && (
                  <button type="button" className="tf-form-field-multi-select__tag-remove" onClick={() => toggleValue(val)}>×</button>
                )}
              </span>
            );
          })}
          <select
            className="tf-form-field-multi-select__tag-input"
            value=""
            onChange={e => { if (e.target.value) toggleValue(e.target.value); }}
            disabled={props.disabled || (maxSelections !== undefined && values.length >= maxSelections)}
          >
            <option value="">+ Add...</option>
            {options.filter(o => !values.includes(String(o.value))).map(opt => (
              <option key={String(opt.value)} value={String(opt.value)}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}

      {displayMode === "checklist" && (
        <div className="tf-form-field-multi-select__checklist">
          {options.map(opt => (
            <label key={String(opt.value)} className="tf-form-field-multi-select__check-item">
              <input
                type="checkbox"
                checked={values.includes(String(opt.value))}
                onChange={() => toggleValue(String(opt.value))}
                disabled={props.disabled || (!values.includes(String(opt.value)) && maxSelections !== undefined && values.length >= maxSelections)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {props.error && <span className="tf-form-field__error">{props.error}</span>}
    </div>
  );
};

FormFieldMultiSelect.displayName = "FormFieldMultiSelect";
export default FormFieldMultiSelect;
