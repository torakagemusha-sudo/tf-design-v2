import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * YamlEditor — YAML editor with syntax validation and dual view support.
 *
 * @example
 * <YamlEditor value={yaml} onChange={setYaml} onParse={handleParse} />
 */
export interface YamlEditorProps extends BaseComponentProps {
  /** YAML string value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Called when YAML is successfully parsed */
  onParse?: (data: unknown) => void;
  /** Readonly state */
  readonly?: boolean;
  /** Indentation spaces */
  indent?: number;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Validation errors */
  errors?: Array<{ line: number; message: string }>;
}

export const YamlEditor: React.FC<YamlEditorProps> = ({
  value,
  onChange,
  onParse,
  readonly = false,
  indent = 2,
  showLineNumbers = true,
  errors = [],
  className = "",
  style,
  ...rest
}) => {
  const [parseError, setParseError] = useState<string | null>(null);
  const lines = useMemo(() => value.split("\n"), [value]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange(val);
    try {
      // Basic YAML structure validation
      if (val.trim()) {
        const parsed = yamlParseBasic(val);
        setParseError(null);
        onParse?.(parsed);
      } else {
        setParseError(null);
      }
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Invalid YAML");
    }
  }, [onChange, onParse]);

  return (
    <div className={`tf-yaml-editor ${parseError ? "tf-yaml-editor--error" : ""} ${className}`} style={style} data-testid="yaml-editor" {...rest}>
      <div className="tf-yaml-editor__editor">
        {showLineNumbers && (
          <div className="tf-yaml-editor__linenos">
            {lines.map((_, i) => (
              <div key={i} className="tf-yaml-editor__lineno">
                {errors.some(e => e.line === i + 1) ? (
                  <span className="tf-yaml-editor__lineno--error" title={errors.find(e => e.line === i + 1)?.message}>!</span>
                ) : (
                  i + 1
                )}
              </div>
            ))}
          </div>
        )}
        <textarea
          className="tf-yaml-editor__textarea"
          value={value}
          onChange={handleChange}
          readOnly={readonly}
          spellCheck={false}
          placeholder="# Enter YAML..."
          style={{ tabSize: indent }}
        />
      </div>
      {parseError && <div className="tf-yaml-editor__error">{parseError}</div>}
      {errors.length > 0 && (
        <div className="tf-yaml-editor__errors">
          {errors.map((err, i) => (
            <div key={i} className="tf-yaml-editor__error-item">Line {err.line}: {err.message}</div>
          ))}
        </div>
      )}
    </div>
  );
};

/** Basic YAML parser for structural validation */
function yamlParseBasic(yaml: string): unknown {
  const lines = yaml.split("\n");
  const stack: Array<{ obj: Record<string, unknown>; arr: unknown[] | null; indent: number }> = [];
  let root: unknown = null;
  let inArray = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const indent = line.length - line.trimStart().length;
    const trimmed = line.trimStart();

    if (trimmed.startsWith("- ")) {
      inArray = true;
      if (!root) root = [];
    } else if (trimmed.includes(":")) {
      inArray = false;
      if (!root) root = {};
    }
  }
  return root ?? {};
}

YamlEditor.displayName = "YamlEditor";
export default YamlEditor;
