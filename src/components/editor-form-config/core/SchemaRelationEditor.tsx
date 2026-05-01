import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * SchemaRelationEditor — relationship/foreign-key editor for schema nodes.
 *
 * @example
 * <SchemaRelationEditor relations={relations} entities={entityList} onChange={setRelations} />
 */
export interface SchemaRelationEditorProps extends BaseComponentProps {
  /** Current relations */
  relations: Array<{
    id: string;
    name: string;
    source: string;
    target: string;
    type: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany";
    sourceField: string;
    targetField: string;
    onDelete?: "cascade" | "setNull" | "restrict";
    onUpdate?: "cascade" | "setNull" | "restrict";
  }>;
  /** Available entity/node IDs */
  entities: Array<{ id: string; label: string }>;
  /** Change handler */
  onChange: (relations: SchemaRelationEditorProps["relations"]) => void;
  readonly?: boolean;
}

export const SchemaRelationEditor: React.FC<SchemaRelationEditorProps> = ({
  relations,
  entities,
  onChange,
  readonly = false,
  className = "",
  style,
  ...rest
}) => {
  const addRelation = useCallback(() => {
    onChange([...relations, {
      id: `rel_${Date.now()}`, name: "", source: "", target: "",
      type: "oneToMany", sourceField: "", targetField: "", onDelete: "restrict", onUpdate: "restrict"
    }]);
  }, [relations, onChange]);

  const update = useCallback((i: number, patch: Partial<SchemaRelationEditorProps["relations"][0]>) => {
    onChange(relations.map((r, j) => j === i ? { ...r, ...patch } : r));
  }, [relations, onChange]);

  const remove = useCallback((i: number) => {
    onChange(relations.filter((_, j) => j !== i));
  }, [relations, onChange]);

  return (
    <div className={`tf-schema-relation-editor ${className}`} style={style} data-testid="schema-relation-editor" {...rest}>
      <div className="tf-schema-relation-editor__header">
        <span className="tf-schema-relation-editor__title">Relations ({relations.length})</span>
        {!readonly && <button className="tf-schema-relation-editor__add" onClick={addRelation}>+ Add Relation</button>}
      </div>
      {relations.length === 0 && <p className="tf-schema-relation-editor__empty">No relations defined.</p>}
      <div className="tf-schema-relation-editor__list">
        {relations.map((rel, i) => (
          <div key={rel.id} className="tf-schema-relation-editor__item">
            <input className="tf-schema-relation-editor__name" value={rel.name} placeholder="Name" onChange={e => update(i, { name: e.target.value })} disabled={readonly} />
            <select value={rel.source} onChange={e => update(i, { source: e.target.value })} disabled={readonly}>
              <option value="">Source</option>
              {entities.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
            </select>
            <select value={rel.type} onChange={e => update(i, { type: e.target.value as SchemaRelationEditorProps["relations"][0]["type"] })} disabled={readonly}>
              <option value="oneToOne">1:1</option>
              <option value="oneToMany">1:N</option>
              <option value="manyToOne">N:1</option>
              <option value="manyToMany">N:N</option>
            </select>
            <select value={rel.target} onChange={e => update(i, { target: e.target.value })} disabled={readonly}>
              <option value="">Target</option>
              {entities.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
            </select>
            <select value={rel.onDelete} onChange={e => update(i, { onDelete: e.target.value as SchemaRelationEditorProps["relations"][0]["onDelete"] })} disabled={readonly}>
              <option value="restrict">On Delete: Restrict</option>
              <option value="cascade">Cascade</option>
              <option value="setNull">Set Null</option>
            </select>
            {!readonly && <button className="tf-schema-relation-editor__remove" onClick={() => remove(i)}>×</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

SchemaRelationEditor.displayName = "SchemaRelationEditor";
export default SchemaRelationEditor;
