import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import type { FormFieldProps } from "./formFieldTypes";
import { FormField } from "./FormField";
/**
 * FormFieldTextarea — multiline textarea with row configuration.
 *
 * @example
 * <FormFieldTextarea name="bio" label="Bio" value="Hello" rows={5} onChange={handleChange} />
 */
export interface FormFieldTextareaProps extends Omit<FormFieldProps, "type"> {
  rows?: number;
  cols?: number;
  resize?: "none" | "vertical" | "horizontal" | "both";
  maxLength?: number;
}

export const FormFieldTextarea: React.FC<FormFieldTextareaProps> = ({
  rows = 4,
  cols,
  resize = "vertical",
  maxLength,
  ...props
}) => {
  const fieldId = `tf-fft-${props.name}`;
  const widthClass = `tf-form-field--${props.width || "full"}`;
  const sizeClass = `tf-form-field--${props.size || "md"}`;
  const charCount = String(props.value || "").length;

  return (
    <div className={`tf-form-field-textarea ${widthClass} ${sizeClass} ${props.error ? "tf-form-field--error" : ""} ${props.className || ""}`} data-testid={`form-field-textarea-${props.name}`}>
      {props.label && (
        <label className="tf-form-field__label" htmlFor={fieldId}>
          {props.label}
          {props.required && <span className="tf-form-field__required">*</span>}
        </label>
      )}
      {props.description && <span className="tf-form-field__description">{props.description}</span>}
      <textarea
        id={fieldId}
        className="tf-form-field-textarea__input"
        name={props.name}
        value={String(props.value ?? "")}
        placeholder={props.placeholder}
        onChange={e => props.onChange(props.name, e.target.value)}
        readOnly={props.readonly}
        disabled={props.disabled}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        style={{ resize }}
      />
      <div className="tf-form-field-textarea__meta">
        {props.error && <span className="tf-form-field__error">{props.error}</span>}
        {maxLength && <span className="tf-form-field-textarea__count">{charCount}/{maxLength}</span>}
      </div>
    </div>
  );
};

FormFieldTextarea.displayName = "FormFieldTextarea";
export default FormFieldTextarea;
