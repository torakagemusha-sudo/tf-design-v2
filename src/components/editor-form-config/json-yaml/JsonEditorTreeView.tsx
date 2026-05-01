import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * JsonEditorTreeView — tree view mode for JSON editor with collapsible nodes.
 *
 * @example
 * <JsonEditorTreeView data={jsonData} collapsedPaths={collapsed} onTogglePath={toggle} />
 */
export interface JsonEditorTreeViewProps extends BaseComponentProps {
  /** Parsed JSON data */
  data: unknown;
  /** Root label */
  rootLabel?: string;
  /** Set of collapsed paths */
  collapsedPaths: Set<string>;
  /** Toggle path callback */
  onTogglePath: (path: string) => void;
  /** Search query for highlighting */
  searchQuery?: string;
  /** Currently navigated path */
  currentPath?: string;
  /** Path change callback */
  onPathChange?: (path: string) => void;
  /** Validation errors */
  errors?: Array<{ path: string; message: string }>;
}

export const JsonEditorTreeView: React.FC<JsonEditorTreeViewProps> = ({
  data,
  rootLabel = "root",
  collapsedPaths,
  onTogglePath,
  searchQuery = "",
  currentPath = "",
  onPathChange,
  errors = [],
  className = "",
  style,
  ...rest
}) => {
  const errorPaths = useMemo(() => new Set(errors.map(e => e.path)), [errors]);

  const highlightMatch = useCallback((text: string) => {
    if (!searchQuery) return text;
    const idx = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="tf-json-editor-tree-view__highlight">{text.slice(idx, idx + searchQuery.length)}</mark>
        {text.slice(idx + searchQuery.length)}
      </>
    );
  }, [searchQuery]);

  const renderValue = (val: unknown, path: string, depth: number): React.ReactNode => {
    const isCollapsed = collapsedPaths.has(path);
    const hasError = errorPaths.has(path);

    if (val === null) return <span className="tf-json-editor-tree-view__null">null</span>;
    if (typeof val === "boolean") return <span className="tf-json-editor-tree-view__bool">{String(val)}</span>;
    if (typeof val === "number") return <span className="tf-json-editor-tree-view__number">{val}</span>;
    if (typeof val === "string") return <span className="tf-json-editor-tree-view__string">"{highlightMatch(val)}"</span>;

    if (Array.isArray(val)) {
      return (
        <div className={`tf-json-editor-tree-view__node ${hasError ? "tf-json-editor-tree-view__node--error" : ""}`}>
          <button className="tf-json-editor-tree-view__toggle" onClick={() => onTogglePath(path)}>
            {isCollapsed ? "▶" : "▼"}
          </button>
          <span className="tf-json-editor-tree-view__bracket">[</span>
          <span className="tf-json-editor-tree-view__count">{val.length} items</span>
          {!isCollapsed && (
            <div className="tf-json-editor-tree-view__children">
              {val.map((v, i) => (
                <div key={i} className="tf-json-editor-tree-view__child">
                  <span className="tf-json-editor-tree-view__index">{i}:</span>
                  {renderValue(v, `${path}[${i}]`, depth + 1)}
                </div>
              ))}
            </div>
          )}
          {isCollapsed && <span className="tf-json-editor-tree-view__ellipsis">...</span>}
          <span className="tf-json-editor-tree-view__bracket">]</span>
        </div>
      );
    }

    if (typeof val === "object" && val !== null) {
      const entries = Object.entries(val);
      return (
        <div className={`tf-json-editor-tree-view__node ${hasError ? "tf-json-editor-tree-view__node--error" : ""}`}>
          <button className="tf-json-editor-tree-view__toggle" onClick={() => onTogglePath(path)}>
            {isCollapsed ? "▶" : "▼"}
          </button>
          <span className="tf-json-editor-tree-view__brace">{"{"}</span>
          <span className="tf-json-editor-tree-view__count">{entries.length} keys</span>
          {!isCollapsed && (
            <div className="tf-json-editor-tree-view__children">
              {entries.map(([k, v]) => (
                <div key={k} className="tf-json-editor-tree-view__child">
                  <span
                    className={`tf-json-editor-tree-view__key ${currentPath === (path ? `${path}.${k}` : k) ? "tf-json-editor-tree-view__key--active" : ""}`}
                    onClick={() => onPathChange?.(path ? `${path}.${k}` : k)}
                  >
                    {highlightMatch(k)}:
                  </span>
                  {renderValue(v, path ? `${path}.${k}` : k, depth + 1)}
                </div>
              ))}
            </div>
          )}
          {isCollapsed && <span className="tf-json-editor-tree-view__ellipsis">...</span>}
          <span className="tf-json-editor-tree-view__brace">{"}"}</span>
        </div>
      );
    }

    return <span>{String(val)}</span>;
  };

  return (
    <div className={`tf-json-editor-tree-view ${className}`} style={style} data-testid="json-editor-tree-view" {...rest}>
      {renderValue(data, "", 0)}
    </div>
  );
};

JsonEditorTreeView.displayName = "JsonEditorTreeView";
export default JsonEditorTreeView;
