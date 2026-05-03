import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldMarkdown — markdown editor with live preview toggle.
 *
 * @example
 * <FormFieldMarkdown name="content" label="Content" value="# Hello" onChange={handleChange} />
 */
export interface FormFieldMarkdownProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  rows?: number;
}

export const FormFieldMarkdown: React.FC<FormFieldMarkdownProps> = ({
  name,
  label,
  value = "",
  onChange,
  error,
  disabled = false,
  readonly = false,
  placeholder = "Write in Markdown...",
  rows = 8,
  className = "",
  style,
  ...rest
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const preview = useMemo(() => {
    // Very basic markdown to HTML conversion
    return value
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br/>");
  }, [value]);

  return (
    <div className={`tf-form-field-markdown ${showPreview ? "tf-form-field-markdown--preview" : ""} ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-markdown-${name}`} {...rest}>
      <div className="tf-form-field-markdown__header">
        {label && <label className="tf-form-field__label">{label}</label>}
        <div className="tf-form-field-markdown__tabs">
          <button type="button" className={`tf-form-field-markdown__tab ${!showPreview ? "tf-form-field-markdown__tab--active" : ""}`} onClick={() => setShowPreview(false)}>Write</button>
          <button type="button" className={`tf-form-field-markdown__tab ${showPreview ? "tf-form-field-markdown__tab--active" : ""}`} onClick={() => setShowPreview(true)}>Preview</button>
        </div>
      </div>
      {!showPreview ? (
        <textarea
          className="tf-form-field-markdown__textarea"
          name={name}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          readOnly={readonly}
        />
      ) : (
        <div className="tf-form-field-markdown__preview" dangerouslySetInnerHTML={{ __html: preview }} />
      )}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldMarkdown.displayName = "FormFieldMarkdown";
export default FormFieldMarkdown;
