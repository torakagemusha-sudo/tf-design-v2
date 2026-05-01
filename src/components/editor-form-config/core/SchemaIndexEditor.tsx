import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * SchemaIndexEditor — index configuration editor for schema entities.
 *
 * @example
 * <SchemaIndexEditor indexes={indexes} fields={availableFields} onChange={setIndexes} />
 */
export interface SchemaIndexEditorProps extends BaseComponentProps {
  /** Current indexes */
  indexes: Array<{ name: string; fields: string[]; unique: boolean; type: "btree" | "hash" | "gin" | "gist" }>;
  /** Available field names */
  availableFields: string[];
  /** Change handler */
  onChange: (indexes: SchemaIndexEditorProps["indexes"]) => void;
  /** Readonly */
  readonly?: boolean;
}

export const SchemaIndexEditor: React.FC<SchemaIndexEditorProps> = ({
  indexes,
  availableFields,
  onChange,
  readonly = false,
  className = "",
  style,
  ...rest
}) => {
  const addIndex = useCallback(() => {
    onChange([...indexes, { name: `idx_${indexes.length + 1}`, fields: [], unique: false, type: "btree" }]);
  }, [indexes, onChange]);

  const updateIndex = useCallback((i: number, patch: Partial<SchemaIndexEditorProps["indexes"][0]>) => {
    onChange(indexes.map((idx, j) => j === i ? { ...idx, ...patch } : idx));
  }, [indexes, onChange]);

  const removeIndex = useCallback((i: number) => {
    onChange(indexes.filter((_, j) => j !== i));
  }, [indexes, onChange]);

  return (
    <div className={`tf-schema-index-editor ${className}`} style={style} data-testid="schema-index-editor" {...rest}>
      <div className="tf-schema-index-editor__header">
        <span className="tf-schema-index-editor__title">Indexes ({indexes.length})</span>
        {!readonly && <button className="tf-schema-index-editor__add" onClick={addIndex}>+ Add Index</button>}
      </div>
      {indexes.length === 0 && <p className="tf-schema-index-editor__empty">No indexes defined.</p>}
      <div className="tf-schema-index-editor__list">
        {indexes.map((idx, i) => (
          <div key={i} className="tf-schema-index-editor__item">
            <input
              className="tf-schema-index-editor__name"
              value={idx.name}
              onChange={e => updateIndex(i, { name: e.target.value })}
              placeholder="Index name"
              disabled={readonly}
            />
            <select
              className="tf-schema-index-editor__type"
              value={idx.type}
              onChange={e => updateIndex(i, { type: e.target.value as SchemaIndexEditorProps["indexes"][0]["type"] })}
              disabled={readonly}
            >
              <option value="btree">B-Tree</option>
              <option value="hash">Hash</option>
              <option value="gin">GIN</option>
              <option value="gist">GiST</option>
            </select>
            <label className="tf-schema-index-editor__unique">
              <input
                type="checkbox"
                checked={idx.unique}
                onChange={e => updateIndex(i, { unique: e.target.checked })}
                disabled={readonly}
              />
              Unique
            </label>
            <select
              className="tf-schema-index-editor__fields"
              multiple
              value={idx.fields}
              onChange={e => updateIndex(i, { fields: Array.from(e.target.selectedOptions, o => o.value) })}
              disabled={readonly}
            >
              {availableFields.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            {!readonly && <button className="tf-schema-index-editor__remove" onClick={() => removeIndex(i)}>×</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

SchemaIndexEditor.displayName = "SchemaIndexEditor";
export default SchemaIndexEditor;
