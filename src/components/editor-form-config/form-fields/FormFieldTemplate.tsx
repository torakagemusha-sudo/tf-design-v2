import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldTemplate — template string input with variable highlighting.
 *
 * @example
 * <FormFieldTemplate name="subject" label="Subject" value="Hello {{name}}" variables={["name","email"]} onChange={handleChange} />
 */
export interface FormFieldTemplateProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  /** Available variable names for autocomplete */
  variables?: string[];
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
}

export const FormFieldTemplate: React.FC<FormFieldTemplateProps> = ({
  name,
  label,
  value = "",
  onChange,
  variables = [],
  error,
  disabled = false,
  readonly = false,
  placeholder = "Use {{var}} for variables",
  className = "",
  style,
  ...rest
}) => {
  const highlighted = useMemo(() => {
    if (!value) return "";
    return value.replace(/\{\{([^{}]+)\}\}/g, '<span class="tf-form-field-template__var">{{$1}}</span>');
  }, [value]);

  const insertVar = useCallback((v: string) => {
    onChange(name, `${value}{{${v}}}`);
  }, [value, name, onChange]);

  return (
    <div className={`tf-form-field-template ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-template-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      {variables.length > 0 && (
        <div className="tf-form-field-template__vars">
          {variables.map(v => (
            <button key={v} type="button" className="tf-form-field-template__var-btn" onClick={() => insertVar(v)} disabled={readonly}>
              + {v}
            </button>
          ))}
        </div>
      )}
      <div className="tf-form-field-template__editor">
        <textarea
          className="tf-form-field-template__textarea"
          name={name}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
        />
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldTemplate.displayName = "FormFieldTemplate";
export default FormFieldTemplate;
