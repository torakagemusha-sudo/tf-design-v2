import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldCode — code input with syntax highlighting and line numbers.
 *
 * @example
 * <FormFieldCode name="script" label="Script" value="console.log()" language="javascript" onChange={handleChange} />
 */
export interface FormFieldCodeProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  language?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  rows?: number;
  showLineNumbers?: boolean;
  placeholder?: string;
}

export const FormFieldCode: React.FC<FormFieldCodeProps> = ({
  name,
  label,
  value = "",
  onChange,
  language = "text",
  error,
  disabled = false,
  readonly = false,
  rows = 8,
  showLineNumbers = true,
  placeholder = "// Enter code...",
  className = "",
  style,
  ...rest
}) => {
  const lines = useMemo(() => value.split("\n"), [value]);

  return (
    <div className={`tf-form-field-code ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-code-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label} <span className="tf-form-field-code__lang">[{language}]</span></label>}
      <div className="tf-form-field-code__editor">
        {showLineNumbers && (
          <div className="tf-form-field-code__linenos">
            {lines.map((_, i) => <div key={i} className="tf-form-field-code__lineno">{i + 1}</div>)}
          </div>
        )}
        <textarea
          className="tf-form-field-code__textarea"
          name={name}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          rows={rows}
          disabled={disabled}
          readOnly={readonly}
          placeholder={placeholder}
          spellCheck={false}
        />
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldCode.displayName = "FormFieldCode";
export default FormFieldCode;
