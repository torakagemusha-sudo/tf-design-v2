import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry } from "../types";

/**
 * SchemaPropertyEditor — dialog/editor for editing schema node properties.
 *
 * @example
 * <SchemaPropertyEditor node={selectedNode} onSave={handleSave} onClose={() => setOpen(false)} open />
 */
export interface SchemaPropertyEditorProps extends BaseComponentProps {
  /** Target node to edit */
  node: SchemaNodeData | null;
  /** Dialog open state */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Save handler */
  onSave: (nodeId: string, properties: Record<string, unknown>) => void;
  /** Available property definitions */
  propertyDefs?: PropertyDefinition[];
}

export const SchemaPropertyEditor: React.FC<SchemaPropertyEditorProps> = ({
  node,
  open,
  onClose,
  onSave,
  propertyDefs,
  className = "",
  style,
  ...rest
}) => {
  const [localProps, setLocalProps] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (node) setLocalProps({ ...node.properties });
  }, [node]);

  const handleChange = useCallback((key: string, value: unknown) => {
    setLocalProps(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = useCallback(() => {
    if (node) onSave(node.id, localProps);
    onClose();
  }, [node, localProps, onSave, onClose]);

  if (!open || !node) return null;

  return (
    <div className={`tf-schema-property-editor ${className}`} style={style} data-testid="schema-property-editor" {...rest}>
      <div className="tf-schema-property-editor__overlay" onClick={onClose} />
      <div className="tf-schema-property-editor__dialog">
        <header className="tf-schema-property-editor__header">
          <h4 className="tf-schema-property-editor__title">Edit {node.label}</h4>
          <button className="tf-schema-property-editor__close" onClick={onClose}>×</button>
        </header>
        <div className="tf-schema-property-editor__body">
          <div className="tf-schema-property-editor__info">
            <span className="tf-schema-property-editor__type">Type: <code>{node.type}</code></span>
            <span className="tf-schema-property-editor__id">ID: <code>{node.id}</code></span>
          </div>
          {(propertyDefs || Object.keys(node.properties).map(k => ({
            key: k, label: k, type: "text" as const, value: node.properties[k],
          }))).map(prop => (
            <div key={prop.key} className="tf-schema-property-editor__field">
              <label className="tf-schema-property-editor__label">{prop.label}</label>
              <input
                className="tf-schema-property-editor__input"
                value={String(localProps[prop.key] ?? "")}
                onChange={e => handleChange(prop.key, e.target.value)}
              />
            </div>
          ))}
        </div>
        <footer className="tf-schema-property-editor__footer">
          <button className="tf-schema-property-editor__save" onClick={handleSave}>Save</button>
          <button className="tf-schema-property-editor__cancel" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
};

SchemaPropertyEditor.displayName = "SchemaPropertyEditor";
export default SchemaPropertyEditor;
