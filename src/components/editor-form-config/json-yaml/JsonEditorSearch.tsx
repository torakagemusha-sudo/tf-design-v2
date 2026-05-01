import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * JsonEditorSearch — search input for finding content within JSON.
 *
 * @example
 * <JsonEditorSearch query="name" onChange={setQuery} />
 */
export interface JsonEditorSearchProps extends BaseComponentProps {
  /** Search query value */
  query: string;
  /** Query change handler */
  onChange: (query: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Result count */
  resultCount?: number;
}

export const JsonEditorSearch: React.FC<JsonEditorSearchProps> = ({
  query,
  onChange,
  placeholder = "Search...",
  resultCount,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-json-editor-search ${className}`} style={style} data-testid="json-editor-search" {...rest}>
    <svg className="tf-json-editor-search__icon" width="12" height="12" viewBox="0 0 12 12">
      <circle cx="5" cy="5" r="3.5" stroke="currentColor" fill="none" strokeWidth="1.2"/>
      <path d="M7.5 7.5l2.5 2.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
    <input
      className="tf-json-editor-search__input"
      type="search"
      value={query}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
    {resultCount !== undefined && query && (
      <span className="tf-json-editor-search__count">{resultCount} results</span>
    )}
    {query && (
      <button className="tf-json-editor-search__clear" onClick={() => onChange("")} title="Clear">×</button>
    )}
  </div>
);

JsonEditorSearch.displayName = "JsonEditorSearch";
export default JsonEditorSearch;
