import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * SchemaEdge — schema relationship edge rendered as SVG.
 * Connects two schema nodes with a labeled line.
 *
 * @example
 * <SchemaEdge edge={edge} sourcePos={{x:0,y:0}} targetPos={{x:100,y:100}} onClick={handleClick} />
 */
export interface SchemaEdgeProps extends BaseComponentProps {
  /** Edge data */
  edge: SchemaEdgeData;
  /** Source node position (center) */
  sourcePos: { x: number; y: number };
  /** Target node position (center) */
  targetPos: { x: number; y: number };
  /** Click handler */
  onClick?: (edge: SchemaEdgeData) => void;
  /** Delete handler */
  onDelete?: (id: string) => void;
  /** Whether selected */
  selected?: boolean;
}

export const SchemaEdge: React.FC<SchemaEdgeProps> = ({
  edge,
  sourcePos,
  targetPos,
  onClick,
  onDelete,
  selected = false,
  className = "",
  style,
  ...rest
}) => {
  const midX = (sourcePos.x + targetPos.x) / 2;
  const midY = (sourcePos.y + targetPos.y) / 2;

  const typeClasses: Record<string, string> = {
    oneToOne: "tf-schema-edge--1-1",
    oneToMany: "tf-schema-edge--1-n",
    manyToOne: "tf-schema-edge--n-1",
    manyToMany: "tf-schema-edge--n-n",
    inheritance: "tf-schema-edge--inheritance",
    dependency: "tf-schema-edge--dependency",
  };

  return (
    <g
      className={`tf-schema-edge ${typeClasses[edge.type] || ""} ${selected ? "tf-schema-edge--selected" : ""} ${className}`}
      style={style}
      data-testid={`schema-edge-${edge.id}`}
      onClick={() => onClick?.(edge)}
      {...rest}
    >
      <line
        x1={sourcePos.x} y1={sourcePos.y}
        x2={targetPos.x} y2={targetPos.y}
        className="tf-schema-edge__line"
        markerEnd="url(#arrowhead)"
      />
      {edge.label && (
        <g>
          <rect
            x={midX - edge.label.length * 3.5}
            y={midY - 10}
            width={edge.label.length * 7 + 8}
            height={18}
            rx={4}
            className="tf-schema-edge__label-bg"
          />
          <text
            x={midX + 4}
            y={midY + 3}
            className="tf-schema-edge__label"
            textAnchor="middle"
          >
            {edge.label}
          </text>
        </g>
      )}
      {selected && onDelete && (
        <circle
          cx={midX}
          cy={midY - 20}
          r={8}
          className="tf-schema-edge__delete-btn"
          onClick={e => { e.stopPropagation(); onDelete(edge.id); }}
        />
      )}
    </g>
  );
};

SchemaEdge.displayName = "SchemaEdge";
export default SchemaEdge;
