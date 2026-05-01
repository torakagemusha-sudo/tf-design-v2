import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldReference — reference to another record with selection dialog.
 *
 * @example
 * <FormFieldReference name="parent" label="Parent" value="record-1" records={records} onChange={handleChange} />
 */
export interface FormFieldReferenceProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  records: Array<{ id: string; label: string; description?: string }>;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
}

export const FormFieldReference: React.FC<FormFieldReferenceProps> = ({
  name,
  label,
  value = "",
  records,
  onChange,
  error,
  disabled = false,
  readonly = false,
  placeholder = "Select a record...",
  className = "",
  style,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => records.find(r => r.id === value), [records, value]);

  return (
    <div className={`tf-form-field-reference ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-reference-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-reference__field">
        <span className="tf-form-field-reference__value">
          {selected ? selected.label : <span className="tf-form-field-reference__placeholder">{placeholder}</span>}
        </span>
        {!readonly && (
          <button type="button" className="tf-form-field-reference__browse" onClick={() => setOpen(!open)} disabled={disabled}>
            Browse
          </button>
        )}
        {value && !readonly && (
          <button type="button" className="tf-form-field-reference__clear" onClick={() => onChange(name, "")}>×</button>
        )}
      </div>
      {open && (
        <div className="tf-form-field-reference__dropdown">
          {records.map(r => (
            <button
              key={r.id}
              type="button"
              className={`tf-form-field-reference__option ${r.id === value ? "tf-form-field-reference__option--selected" : ""}`}
              onClick={() => { onChange(name, r.id); setOpen(false); }}
            >
              <span className="tf-form-field-reference__option-label">{r.label}</span>
              {r.description && <span className="tf-form-field-reference__option-desc">{r.description}</span>}
            </button>
          ))}
        </div>
      )}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldReference.displayName = "FormFieldReference";
export default FormFieldReference;
