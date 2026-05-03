import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldRichText — rich text editor with formatting toolbar.
 * Content-editable div with basic formatting commands.
 *
 * @example
 * <FormFieldRichText name="body" label="Body" value="<p>Hello</p>" onChange={handleChange} />
 */
export interface FormFieldRichTextProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  /** Available toolbar actions */
  toolbar?: ("bold" | "italic" | "underline" | "strike" | "heading" | "link" | "list" | "code")[];
}

export const FormFieldRichText: React.FC<FormFieldRichTextProps> = ({
  name,
  label,
  value = "",
  onChange,
  error,
  disabled = false,
  readonly = false,
  placeholder = "Start typing...",
  toolbar = ["bold", "italic", "underline", "heading", "list", "link"],
  className = "",
  style,
  ...rest
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const exec = useCallback((command: string, valueArg: string = "") => {
    document.execCommand(command, false, valueArg);
    if (editorRef.current) onChange(name, editorRef.current.innerHTML);
  }, [name, onChange]);

  const toolbarButtons: Record<string, { icon: string; cmd: string }> = {
    bold: { icon: "B", cmd: "bold" },
    italic: { icon: "I", cmd: "italic" },
    underline: { icon: "U", cmd: "underline" },
    strike: { icon: "S", cmd: "strikeThrough" },
    heading: { icon: "H", cmd: "formatBlock" },
    link: { icon: "🔗", cmd: "createLink" },
    list: { icon: "≡", cmd: "insertUnorderedList" },
    code: { icon: "{ }", cmd: "formatBlock" },
  };

  return (
    <div className={`tf-form-field-rich-text ${focused ? "tf-form-field-rich-text--focused" : ""} ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-rich-text-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-rich-text__editor">
        <div className="tf-form-field-rich-text__toolbar">
          {toolbar.map(action => (
            <button
              key={action}
              type="button"
              className="tf-form-field-rich-text__tool"
              onClick={() => exec(toolbarButtons[action].cmd, action === "heading" ? "<h2>" : action === "code" ? "<pre>" : "")}
              disabled={disabled || readonly}
            >
              {toolbarButtons[action].icon}
            </button>
          ))}
        </div>
        <div
          ref={editorRef}
          className="tf-form-field-rich-text__content"
          contentEditable={!disabled && !readonly}
          onInput={() => editorRef.current && onChange(name, editorRef.current.innerHTML)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          data-placeholder={placeholder}
          suppressContentEditableWarning
        />
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldRichText.displayName = "FormFieldRichText";
export default FormFieldRichText;
