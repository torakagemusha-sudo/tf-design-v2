import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormField — generic form field wrapper that renders the appropriate field
 * based on the type prop. Provides consistent labeling, validation, and layout.
 *
 * @example
 * <FormField type="text" name="username" label="Username" value="john" onChange={handleChange} />
 */
export interface FormFieldProps extends BaseComponentProps {
  name: string;
  label?: string;
  type: string;
  value?: unknown;
  onChange: (name: string, value: unknown) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  size?: "sm" | "md" | "lg";
  width?: "full" | "half" | "third" | "quarter";
  /** Extra props passed to the underlying input */
  inputProps?: Record<string, unknown>;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  description,
  error,
  required = false,
  readonly = false,
  disabled = false,
  hidden = false,
  size = "md",
  width = "full",
  inputProps = {},
  className = "",
  style,
  ...rest
}) => {
  if (hidden) return null;

  const fieldId = `tf-ff-${name}`;
  const widthClass = `tf-form-field--${width}`;
  const sizeClass = `tf-form-field--${size}`;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    onChange(name, type === "number" ? Number(val) : val);
  }, [name, type, onChange]);

  return (
    <div className={`tf-form-field ${widthClass} ${sizeClass} ${error ? "tf-form-field--error" : ""} ${disabled ? "tf-form-field--disabled" : ""} ${className}`} style={style} data-testid={`form-field-${name}`} {...rest}>
      {label && (
        <label className="tf-form-field__label" htmlFor={fieldId}>
          {label}
          {required && <span className="tf-form-field__required">*</span>}
        </label>
      )}
      {description && <span className="tf-form-field__description">{description}</span>}
      <div className="tf-form-field__control">
        <input
          id={fieldId}
          className="tf-form-field__input"
          type={type}
          name={name}
          value={String(value ?? "")}
          placeholder={placeholder}
          onChange={handleChange}
          readOnly={readonly}
          disabled={disabled}
          {...(inputProps as any)}
        />
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormField.displayName = "FormField";
export default FormField;
