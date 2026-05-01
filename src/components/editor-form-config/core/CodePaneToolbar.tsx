import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * CodePaneToolbar — toolbar for the code pane with language, actions, and search.
 *
 * @example
 * <CodePaneToolbar language="typescript" modified onSearchChange={setSearch} />
 */
export interface CodePaneToolbarProps extends BaseComponentProps {
  /** Detected/active language */
  language?: string;
  /** Whether document has unsaved changes */
  modified?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** Search query value */
  searchQuery?: string;
  /** Search change handler */
  onSearchChange?: (q: string) => void;
  /** Format code handler */
  onFormat?: () => void;
  /** Extra toolbar items */
  extraItems?: ReactNode;
}

export const CodePaneToolbar: React.FC<CodePaneToolbarProps> = ({
  language = "text",
  modified = false,
  readonly = false,
  searchQuery = "",
  onSearchChange,
  onFormat,
  extraItems,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-code-pane-toolbar ${className}`} style={style} data-testid="code-pane-toolbar" {...rest}>
    <div className="tf-code-pane-toolbar__lang">
      <span className="tf-code-pane-toolbar__lang-badge">{language}</span>
      {modified && <span className="tf-code-pane-toolbar__modified-dot" title="Unsaved changes" />}
      {readonly && <span className="tf-code-pane-toolbar__readonly-badge">Read-only</span>}
    </div>
    <div className="tf-code-pane-toolbar__actions">
      {onFormat && (
        <button className="tf-code-pane-toolbar__btn" onClick={onFormat} title="Format">
          {"{ }"}
        </button>
      )}
      {onSearchChange && (
        <div className="tf-code-pane-toolbar__search">
          <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="5" cy="5" r="3.5" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M7.5 7.5l2.5 2.5" stroke="currentColor" strokeWidth="1.2"/></svg>
          <input
            type="search"
            className="tf-code-pane-toolbar__search-input"
            placeholder="Find..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      )}
      {extraItems}
    </div>
  </div>
);

CodePaneToolbar.displayName = "CodePaneToolbar";
export default CodePaneToolbar;
