import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldJson — JSON input with validation and formatting.
 *
 * @example
 * <FormFieldJson name="config" label="Config" value='{"key":"val"}' onChange={handleChange} />
 */
export interface FormFieldJsonProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  rows?: number;
  indent?: number;
}

export const FormFieldJson: React.FC<FormFieldJsonProps> = ({
  name,
  label,
  value = "",
  onChange,
  error,
  disabled = false,
  readonly = false,
  rows = 8,
  indent = 2,
  className = "",
  style,
  ...rest
}) => {
  const [localError, setLocalError] = useState<string | undefined>(error);

  useEffect(() => { setLocalError(error); }, [error]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange(name, val);
    try { if (val.trim()) JSON.parse(val); setLocalError(undefined); }
    catch (err) { setLocalError("Invalid JSON"); }
  }, [name, onChange]);

  const format = useCallback(() => {
    try { onChange(name, JSON.stringify(JSON.parse(value), null, indent)); setLocalError(undefined); }
    catch { /* ignore */ }
  }, [value, onChange, name, indent]);

  return (
    <div className={`tf-form-field-json ${localError ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-json-${name}`} {...rest}>
      <div className="tf-form-field-json__header">
        {label && <label className="tf-form-field__label">{label}</label>}
        <button type="button" className="tf-form-field-json__format" onClick={format} disabled={!value}>Format</button>
      </div>
      <textarea
        className="tf-form-field-json__textarea"
        name={name}
        value={value}
        onChange={handleChange}
        rows={rows}
        disabled={disabled}
        readOnly={readonly}
        placeholder={'{\n  "key": "value"\n}'}
        spellCheck={false}
        style={{ tabSize: indent }}
      />
      {localError && <span className="tf-form-field__error">{localError}</span>}
    </div>
  );
};

FormFieldJson.displayName = "FormFieldJson";
export default FormFieldJson;
