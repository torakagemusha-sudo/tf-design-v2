import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * JsonEditor — JSON editor with validation, tree/text views, and search.
 * Supports dual-pane editing with real-time validation feedback.
 *
 * @example
 * <JsonEditor value={json} onChange={setJson} viewMode="tree" />
 */
export interface JsonEditorProps extends BaseComponentProps {
  /** JSON string value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Current view mode */
  viewMode?: JsonViewMode;
  /** Readonly state */
  readonly?: boolean;
  /** Indentation spaces */
  indent?: number;
  /** Validation errors */
  errors?: Array<{ path: string; message: string }>;
  /** Root label for tree view */
  rootLabel?: string;
  /** Maximum depth to render initially */
  maxInitialDepth?: number;
  /** Whether editor is compact */
  compact?: boolean;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  viewMode = "tree",
  readonly = false,
  indent = 2,
  errors = [],
  rootLabel = "root",
  maxInitialDepth = 3,
  compact = false,
  className = "",
  style,
  ...rest
}) => {
  const [mode, setMode] = useState<JsonViewMode>(viewMode);
  const [parsed, setParsed] = useState<unknown>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    try {
      setParsed(value.trim() ? JSON.parse(value) : null);
      setParseError(null);
    } catch (e) {
      setParseError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [value]);

  const togglePath = useCallback((path: string) => {
    setCollapsedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  }, []);

  const collapseAll = useCallback(() => {
    if (!parsed) return;
    const paths = new Set<string>();
    const collect = (obj: unknown, path: string, depth: number) => {
      if (depth >= maxInitialDepth && (typeof obj === "object" && obj !== null)) {
        paths.add(path);
        return;
      }
      if (Array.isArray(obj)) obj.forEach((v, i) => collect(v, `${path}[${i}]`, depth + 1));
      else if (typeof obj === "object" && obj !== null) {
        Object.entries(obj).forEach(([k, v]) => collect(v, path ? `${path}.${k}` : k, depth + 1));
      }
    };
    collect(parsed, "", 0);
    setCollapsedPaths(paths);
  }, [parsed, maxInitialDepth]);

  const expandAll = useCallback(() => {
    setCollapsedPaths(new Set());
  }, []);

  const formatJson = useCallback(() => {
    try {
      onChange(JSON.stringify(JSON.parse(value), null, indent));
    } catch { /* ignore format errors on invalid JSON */ }
  }, [value, onChange, indent]);

  return (
    <div className={`tf-json-editor tf-json-editor--${mode} ${compact ? "tf-json-editor--compact" : ""} ${parseError ? "tf-json-editor--error" : ""} ${className}`} style={style} data-testid="json-editor" {...rest}>
      <JsonEditorToolbar
        viewMode={mode}
        onViewModeChange={setMode}
        onFormat={formatJson}
        isValid={!parseError}
        onCollapseAll={collapseAll}
        onExpandAll={expandAll}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="tf-json-editor__body">
        {mode === "tree" || mode === "split" ? (
          <div className="tf-json-editor__tree">
            {parseError ? (
              <div className="tf-json-editor__parse-error">{parseError}</div>
            ) : parsed !== null ? (
              <JsonEditorTreeView
                data={parsed}
                rootLabel={rootLabel}
                collapsedPaths={collapsedPaths}
                onTogglePath={togglePath}
                searchQuery={searchQuery}
                currentPath={currentPath}
                onPathChange={setCurrentPath}
                errors={errors}
              />
            ) : (
              <div className="tf-json-editor__empty">Empty JSON — start typing or paste JSON data</div>
            )}
          </div>
        ) : null}
        {mode === "text" || mode === "split" ? (
          <JsonEditorTextView
            value={value}
            onChange={onChange}
            readonly={readonly}
            error={parseError}
            indent={indent}
          />
        ) : null}
      </div>
      {errors.length > 0 && (
        <div className="tf-json-editor__errors">
          {errors.map((err, i) => (
            <div key={i} className="tf-json-editor__error-item">
              <span className="tf-json-editor__error-path">{err.path}</span>
              <span className="tf-json-editor__error-msg">{err.message}</span>
            </div>
          ))}
        </div>
      )}
      <JsonEditorPath path={currentPath || rootLabel} onSegmentClick={setCurrentPath} />
    </div>
  );
};

JsonEditor.displayName = "JsonEditor";
export default JsonEditor;
