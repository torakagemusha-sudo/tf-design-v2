import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import type { FormFieldProps } from "./formFieldTypes";
import { FormField } from "./FormField";

/**
 * FormFieldSelect — dropdown select with option groups support.
 *
 * @example
 * <FormFieldSelect name="role" label="Role" value="admin" options={roles} onChange={handleChange} />
 */
export interface FormFieldSelectProps extends Omit<FormFieldProps, "type"> {
  options: FieldOption[];
  /** Allow empty selection */
  allowEmpty?: boolean;
  /** Empty option label */
  emptyLabel?: string;
  /** Group options by category */
  groupBy?: string;
}

export const FormFieldSelect: React.FC<FormFieldSelectProps> = ({
  options,
  allowEmpty = true,
  emptyLabel = "— Select —",
  ...props
}) => {
  const fieldId = `tf-ffs-${props.name}`;

  return (
    <div className={`tf-form-field-select tf-form-field--${props.width || "full"} tf-form-field--${props.size || "md"} ${props.error ? "tf-form-field--error" : ""} ${props.className || ""}`} data-testid={`form-field-select-${props.name}`}>
      {props.label && (
        <label className="tf-form-field__label" htmlFor={fieldId}>
          {props.label}
          {props.required && <span className="tf-form-field__required">*</span>}
        </label>
      )}
      {props.description && <span className="tf-form-field__description">{props.description}</span>}
      <select
        id={fieldId}
        className="tf-form-field-select__input"
        name={props.name}
        value={String(props.value ?? "")}
        onChange={e => props.onChange(props.name, e.target.value)}
        disabled={props.disabled || props.readonly}
      >
        {allowEmpty && <option value="">{emptyLabel}</option>}
        {options.map(opt => (
          <option key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {props.error && <span className="tf-form-field__error">{props.error}</span>}
    </div>
  );
};

FormFieldSelect.displayName = "FormFieldSelect";
export default FormFieldSelect;
