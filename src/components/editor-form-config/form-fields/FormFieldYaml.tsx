import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldYaml — YAML input with basic validation.
 *
 * @example
 * <FormFieldYaml name="compose" label="Docker Compose" value="version: '3'" onChange={handleChange} />
 */
export interface FormFieldYamlProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  rows?: number;
}

export const FormFieldYaml: React.FC<FormFieldYamlProps> = ({
  name,
  label,
  value = "",
  onChange,
  error,
  disabled = false,
  readonly = false,
  rows = 10,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-form-field-yaml ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-yaml-${name}`} {...rest}>
    {label && <label className="tf-form-field__label">{label} <span className="tf-form-field-yaml__badge">YAML</span></label>}
    <textarea
      className="tf-form-field-yaml__textarea"
      name={name}
      value={value}
      onChange={e => onChange(name, e.target.value)}
      rows={rows}
      disabled={disabled}
      readOnly={readonly}
      placeholder="# YAML format"
      spellCheck={false}
    />
    {error && <span className="tf-form-field__error">{error}</span>}
  </div>
);

FormFieldYaml.displayName = "FormFieldYaml";
export default FormFieldYaml;
