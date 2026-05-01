import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldLookup — lookup selector that fetches records from a remote source.
 *
 * @example
 * <FormFieldLookup name="user" label="User" value="u1" fetchRecords={fetchUsers} onChange={handleChange} />
 */
export interface FormFieldLookupProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  /** Async function to fetch records */
  fetchRecords: (query: string) => Promise<Array<{ id: string; label: string }>>;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
}

export const FormFieldLookup: React.FC<FormFieldLookupProps> = ({
  name,
  label,
  value = "",
  onChange,
  fetchRecords,
  error,
  disabled = false,
  readonly = false,
  placeholder = "Search...",
  className = "",
  style,
  ...rest
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ id: string; label: string }>>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 1) { setResults([]); return; }
    setLoading(true);
    const timer = setTimeout(() => {
      fetchRecords(query).then(r => { setResults(r); setOpen(true); }).finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [query, fetchRecords]);

  const selected = useMemo(() => results.find(r => r.id === value), [results, value]);

  return (
    <div className={`tf-form-field-lookup ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-lookup-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-lookup__field">
        <input
          className="tf-form-field-lookup__input"
          type="text"
          value={selected ? selected.label : query}
          onChange={e => { setQuery(e.target.value); if (selected) onChange(name, ""); }}
          onFocus={() => query.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
        />
        {loading && <span className="tf-form-field-lookup__spinner" />}
        {value && !readonly && <button type="button" className="tf-form-field-lookup__clear" onClick={() => onChange(name, "")}>×</button>}
      </div>
      {open && results.length > 0 && (
        <div className="tf-form-field-lookup__dropdown">
          {results.map(r => (
            <button key={r.id} type="button" className="tf-form-field-lookup__option" onMouseDown={() => { onChange(name, r.id); setOpen(false); }}>
              {r.label}
            </button>
          ))}
        </div>
      )}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldLookup.displayName = "FormFieldLookup";
export default FormFieldLookup;
