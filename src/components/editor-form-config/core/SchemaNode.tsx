import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * SchemaNode — individual schema node element with selection, drag, and expand.
 *
 * @example
 * <SchemaNode node={node} selected onSelect={() => {}} onDrag={(pos) => {}} />
 */
export interface SchemaNodeProps extends BaseComponentProps {
  /** Node data */
  node: SchemaNodeData;
  /** Whether node is selected */
  selected?: boolean;
  /** Selection handler */
  onSelect?: (node: SchemaNodeData) => void;
  /** Drag handler */
  onDrag?: (id: string, position: { x: number; y: number }) => void;
  /** Expand toggle */
  onExpandToggle?: (id: string) => void;
  /** Delete handler */
  onDelete?: (id: string) => void;
  /** Duplicate handler */
  onDuplicate?: (id: string) => void;
  /** Whether editable */
  editable?: boolean;
}

export const SchemaNode: React.FC<SchemaNodeProps> = ({
  node,
  selected = false,
  onSelect,
  onDrag,
  onExpandToggle,
  onDelete,
  onDuplicate,
  editable = true,
  className = "",
  style,
  ...rest
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!editable) return;
    e.stopPropagation();
    onSelect?.(node);
    setIsDragging(true);
  }, [editable, node, onSelect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !onDrag) return;
    onDrag(node.id, { x: node.position.x + e.movementX, y: node.position.y + e.movementY });
  }, [isDragging, node.id, node.position, onDrag]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const typeClasses: Record<string, string> = {
    entity: "tf-schema-node--entity",
    attribute: "tf-schema-node--attribute",
    relation: "tf-schema-node--relation",
    index: "tf-schema-node--index",
    validation: "tf-schema-node--validation",
    trigger: "tf-schema-node--trigger",
  };

  return (
    <div
      ref={nodeRef}
      className={`tf-schema-node ${typeClasses[node.type] || ""} ${selected ? "tf-schema-node--selected" : ""} ${node.disabled ? "tf-schema-node--disabled" : ""} ${isDragging ? "tf-schema-node--dragging" : ""} ${className}`}
      style={{ transform: `translate(${node.position.x}px, ${node.position.y}px)`, ...style }}
      data-testid={`schema-node-${node.id}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      {...rest}
    >
      <div className="tf-schema-node__header" style={{ borderLeftColor: node.color || "transparent" }}>
        {node.icon && <span className="tf-schema-node__icon">{node.icon}</span>}
        <span className="tf-schema-node__label">{node.label}</span>
        <div className="tf-schema-node__actions">
          {onExpandToggle && (
            <button className="tf-schema-node__btn" onClick={() => onExpandToggle(node.id)} title="Expand/Collapse">
              {node.expanded ? "−" : "+"}
            </button>
          )}
          {onDuplicate && <button className="tf-schema-node__btn" onClick={() => onDuplicate(node.id)} title="Duplicate">⎘</button>}
          {onDelete && <button className="tf-schema-node__btn tf-schema-node__btn--danger" onClick={() => onDelete(node.id)} title="Delete">×</button>}
        </div>
      </div>
      {node.expanded && (
        <div className="tf-schema-node__body">
          {Object.entries(node.properties).map(([key, val]) => (
            <div key={key} className="tf-schema-node__prop">
              <span className="tf-schema-node__prop-key">{key}</span>
              <span className="tf-schema-node__prop-val">{String(val)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SchemaNode.displayName = "SchemaNode";
export default SchemaNode;
