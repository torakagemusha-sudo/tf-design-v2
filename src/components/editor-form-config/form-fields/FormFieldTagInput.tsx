import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldTagInput — tag/token input with add/remove functionality.
 *
 * @example
 * <FormFieldTagInput name="tags" label="Tags" values={["react","typescript"]} onChange={handleChange} />
 */
export interface FormFieldTagInputProps extends BaseComponentProps {
  name: string;
  label?: string;
  values: string[];
  onChange: (name: string, values: string[]) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxTags?: number;
  delimiter?: string;
  /** Suggestions for autocomplete */
  suggestions?: string[];
}

export const FormFieldTagInput: React.FC<FormFieldTagInputProps> = ({
  name,
  label,
  values,
  onChange,
  placeholder = "Add tag...",
  error,
  disabled = false,
  readonly = false,
  maxTags,
  delimiter = ",",
  suggestions = [],
  className = "",
  style,
  ...rest
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !values.includes(trimmed) && (!maxTags || values.length < maxTags)) {
      onChange(name, [...values, trimmed]);
    }
    setInput("");
  }, [values, maxTags, onChange, name]);

  const removeTag = useCallback((tag: string) => {
    onChange(name, values.filter(v => v !== tag));
  }, [values, onChange, name]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === delimiter) { e.preventDefault(); addTag(input); }
    else if (e.key === "Backspace" && !input && values.length > 0) { onChange(name, values.slice(0, -1)); }
  }, [input, values, delimiter, addTag, onChange, name]);

  const filteredSuggestions = useMemo(() =>
    suggestions.filter(s => s.toLowerCase().includes(input.toLowerCase()) && !values.includes(s)),
  [suggestions, input, values]);

  return (
    <div className={`tf-form-field-tag-input ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-tag-input-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-tag-input__area" onClick={() => inputRef.current?.focus()}>
        {values.map(tag => (
          <span key={tag} className="tf-form-field-tag-input__tag">
            {tag}
            {!readonly && <button type="button" className="tf-form-field-tag-input__remove" onClick={() => removeTag(tag)}>×</button>}
          </span>
        ))}
        {!readonly && (!maxTags || values.length < maxTags) && (
          <input
            ref={inputRef}
            className="tf-form-field-tag-input__input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => input && addTag(input)}
            placeholder={values.length === 0 ? placeholder : ""}
            disabled={disabled}
          />
        )}
      </div>
      {input && filteredSuggestions.length > 0 && (
        <ul className="tf-form-field-tag-input__suggestions">
          {filteredSuggestions.map(s => (
            <li key={s} className="tf-form-field-tag-input__suggestion" onMouseDown={() => addTag(s)}>{s}</li>
          ))}
        </ul>
      )}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldTagInput.displayName = "FormFieldTagInput";
export default FormFieldTagInput;
