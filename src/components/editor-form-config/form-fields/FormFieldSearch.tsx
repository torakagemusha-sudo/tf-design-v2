import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import type { FormFieldProps } from "./formFieldTypes";
import { FormField } from "./FormField";

/**
 * FormFieldSearch — search input with clear button.
 *
 * @example
 * <FormFieldSearch name="query" label="Search" value="term" onChange={handleChange} onSearch={executeSearch} />
 */
export interface FormFieldSearchProps extends Omit<FormFieldProps, "type"> {
  /** Search handler */
  onSearch?: (query: string) => void;
  /** Debounce delay in ms */
  debounceMs?: number;
}

export const FormFieldSearch: React.FC<FormFieldSearchProps> = ({
  onSearch,
  debounceMs = 300,
  ...props
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = useCallback((name: string, value: unknown) => {
    props.onChange(name, value);
    if (onSearch) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onSearch(String(value)), debounceMs);
    }
  }, [props, onSearch, debounceMs]);

  return (
    <div className={`tf-form-field-search ${props.className || ""}`} data-testid={`form-field-search-${props.name}`}>
      <FormField
        {...props}
        type="search"
        onChange={handleChange}
        className="tf-form-field-search__input"
      />
    </div>
  );
};

FormFieldSearch.displayName = "FormFieldSearch";
export default FormFieldSearch;
