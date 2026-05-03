import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import type { FormFieldProps } from "./formFieldTypes";
import { FormField } from "./FormField";

/**
 * FormFieldAutocomplete — autocomplete field with suggestions dropdown.
 *
 * @example
 * <FormFieldAutocomplete name="city" label="City" value="NYC" suggestions={cities} onChange={handleChange} />
 */
export interface FormFieldAutocompleteProps extends Omit<FormFieldProps, "type"> {
  suggestions: AutocompleteSuggestion[];
  /** Minimum chars before showing suggestions */
  minChars?: number;
  /** Allow free text (not from suggestions) */
  allowFreeText?: boolean;
  /** Async suggestion fetcher */
  onFetchSuggestions?: (query: string) => Promise<AutocompleteSuggestion[]>;
}

export const FormFieldAutocomplete: React.FC<FormFieldAutocompleteProps> = ({
  suggestions,
  minChars = 1,
  allowFreeText = true,
  onFetchSuggestions,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(String(props.value ?? ""));
  const [filtered, setFiltered] = useState<AutocompleteSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setQuery(String(props.value ?? "")); }, [props.value]);

  useEffect(() => {
    if (query.length >= minChars) {
      const f = suggestions.filter(s => s.label.toLowerCase().includes(query.toLowerCase()));
      setFiltered(f);
      setOpen(f.length > 0);
    } else {
      setOpen(false);
    }
  }, [query, suggestions, minChars]);

  const selectSuggestion = useCallback((s: AutocompleteSuggestion) => {
    setQuery(s.label);
    props.onChange(props.name, s.value);
    setOpen(false);
  }, [props]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { setActiveIndex(i => Math.min(i + 1, filtered.length - 1)); e.preventDefault(); }
    else if (e.key === "ArrowUp") { setActiveIndex(i => Math.max(i - 1, 0)); e.preventDefault(); }
    else if (e.key === "Enter" && open) { selectSuggestion(filtered[activeIndex]); e.preventDefault(); }
    else if (e.key === "Escape") { setOpen(false); }
  }, [open, filtered, activeIndex, selectSuggestion]);

  return (
    <div className={`tf-form-field-autocomplete ${props.className || ""}`} data-testid={`form-field-autocomplete-${props.name}`}>
      {props.label && (
        <label className="tf-form-field__label">{props.label}{props.required && <span className="tf-form-field__required">*</span>}</label>
      )}
      <input
        ref={inputRef}
        className={`tf-form-field-autocomplete__input ${props.error ? "tf-form-field--error" : ""}`}
        type="text"
        value={query}
        placeholder={props.placeholder}
        onChange={e => { setQuery(e.target.value); props.onChange(props.name, e.target.value); }}
        onKeyDown={handleKeyDown}
        onFocus={() => query.length >= minChars && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        disabled={props.disabled}
        readOnly={props.readonly}
      />
      {open && filtered.length > 0 && (
        <ul className="tf-form-field-autocomplete__list">
          {filtered.map((s, i) => (
            <li
              key={s.value}
              className={`tf-form-field-autocomplete__item ${i === activeIndex ? "tf-form-field-autocomplete__item--active" : ""}`}
              onMouseDown={() => selectSuggestion(s)}
            >
              <span className="tf-form-field-autocomplete__item-label">{s.label}</span>
              {s.description && <span className="tf-form-field-autocomplete__item-desc">{s.description}</span>}
            </li>
          ))}
        </ul>
      )}
      {props.error && <span className="tf-form-field__error">{props.error}</span>}
    </div>
  );
};

FormFieldAutocomplete.displayName = "FormFieldAutocomplete";
export default FormFieldAutocomplete;
