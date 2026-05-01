import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigVariableEditor — environment variable editor with key-value pairs.
 *
 * @example
 * <ConfigVariableEditor variables={envVars} onChange={setEnvVars} />
 */
export interface ConfigVariableEditorProps extends BaseComponentProps {
  variables: Array<{ key: string; value: string; encrypted?: boolean }>;
  onChange: (variables: ConfigVariableEditorProps["variables"]) => void;
  readonly?: boolean;
  /** Allow encrypted values */
  allowEncryption?: boolean;
}

export const ConfigVariableEditor: React.FC<ConfigVariableEditorProps> = ({
  variables,
  onChange,
  readonly = false,
  allowEncryption = false,
  className = "",
  style,
  ...rest
}) => {
  const addVar = useCallback(() => {
    onChange([...variables, { key: "", value: "" }]);
  }, [variables, onChange]);

  const updateVar = useCallback((index: number, patch: Partial<ConfigVariableEditorProps["variables"][0]>) => {
    onChange(variables.map((v, i) => i === index ? { ...v, ...patch } : v));
  }, [variables, onChange]);

  const removeVar = useCallback((index: number) => {
    onChange(variables.filter((_, i) => i !== index));
  }, [variables, onChange]);

  return (
    <div className={`tf-config-variable-editor ${className}`} style={style} data-testid="config-variable-editor" {...rest}>
      <div className="tf-config-variable-editor__header">
        <span className="tf-config-variable-editor__title">Variables ({variables.length})</span>
        {!readonly && <button type="button" className="tf-config-variable-editor__add" onClick={addVar}>+ Add</button>}
      </div>
      <div className="tf-config-variable-editor__list">
        {variables.map((v, i) => (
          <div key={i} className="tf-config-variable-editor__row">
            <input
              className="tf-config-variable-editor__key"
              value={v.key}
              onChange={e => updateVar(i, { key: e.target.value })}
              placeholder="KEY"
              disabled={readonly}
            />
            <span className="tf-config-variable-editor__eq">=</span>
            <input
              className={`tf-config-variable-editor__value ${v.encrypted ? "tf-config-variable-editor__value--encrypted" : ""}`}
              type={v.encrypted ? "password" : "text"}
              value={v.value}
              onChange={e => updateVar(i, { value: e.target.value })}
              placeholder="value"
              disabled={readonly}
            />
            {allowEncryption && (
              <button
                type="button"
                className={`tf-config-variable-editor__lock ${v.encrypted ? "tf-config-variable-editor__lock--locked" : ""}`}
                onClick={() => updateVar(i, { encrypted: !v.encrypted })}
                disabled={readonly}
                title={v.encrypted ? "Decrypt" : "Encrypt"}
              >
                {v.encrypted ? "🔒" : "🔓"}
              </button>
            )}
            {!readonly && <button type="button" className="tf-config-variable-editor__remove" onClick={() => removeVar(i)}>×</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

ConfigVariableEditor.displayName = "ConfigVariableEditor";
export default ConfigVariableEditor;
