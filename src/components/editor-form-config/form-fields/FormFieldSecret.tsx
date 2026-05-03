import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldSecret — secret/masked input with reveal and copy.
 *
 * @example
 * <FormFieldSecret name="apiKey" label="API Key" value="sk-..." onChange={handleChange} />
 */
export interface FormFieldSecretProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  /** Number of characters to show unmasked at end */
  showLast?: number;
}

export const FormFieldSecret: React.FC<FormFieldSecretProps> = ({
  name,
  label,
  value = "",
  onChange,
  error,
  disabled = false,
  readonly = false,
  placeholder = "••••••••",
  showLast = 0,
  className = "",
  style,
  ...rest
}) => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  const maskValue = useMemo(() => {
    if (!value || revealed) return value;
    const visible = showLast > 0 ? value.slice(-showLast) : "";
    return "•".repeat(Math.max(value.length - showLast, 0)) + visible;
  }, [value, revealed, showLast]);

  return (
    <div className={`tf-form-field-secret ${revealed ? "tf-form-field-secret--revealed" : ""} ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-secret-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-secret__wrap">
        <input
          className="tf-form-field-secret__input"
          type={revealed ? "text" : "password"}
          name={name}
          value={revealed ? value : maskValue}
          onChange={e => onChange(name, e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
        />
        <button type="button" className="tf-form-field-secret__reveal" onClick={() => setRevealed(r => !r)} title={revealed ? "Hide" : "Reveal"}>
          {revealed ? "🙈" : "👁️"}
        </button>
        <button type="button" className="tf-form-field-secret__copy" onClick={copy} title="Copy">
          {copied ? "✓" : "📋"}
        </button>
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldSecret.displayName = "FormFieldSecret";
export default FormFieldSecret;
