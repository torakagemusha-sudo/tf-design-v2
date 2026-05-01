import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormDependencyGraph — visualizes field dependencies as a directed graph.
 *
 * @example
 * <FormDependencyGraph nodes={depNodes} />
 */
export interface FormDependencyGraphProps extends BaseComponentProps {
  nodes: DependencyNode[];
  /** Currently focused node */
  focusedNode?: string;
  /** Node click handler */
  onNodeClick?: (id: string) => void;
  /** Height of the graph canvas */
  height?: number;
}

export const FormDependencyGraph: React.FC<FormDependencyGraphProps> = ({
  nodes,
  focusedNode,
  onNodeClick,
  height = 200,
  className = "",
  style,
  ...rest
}) => {
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const cols = Math.ceil(Math.sqrt(nodes.length));
    nodes.forEach((node, i) => {
      positions[node.id] = {
        x: (i % cols) * 120 + 60,
        y: Math.floor(i / cols) * 60 + 30,
      };
    });
    return positions;
  }, [nodes]);

  return (
    <div className={`tf-form-dependency-graph ${className}`} style={{ height, ...style }} data-testid="form-dependency-graph" {...rest}>
      <svg className="tf-form-dependency-graph__svg" width="100%" height={height}>
        <defs>
          <marker id="dep-arrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0 0L8 4L0 8Z" fill="currentColor" />
          </marker>
        </defs>
        {nodes.map(node =>
          node.dependencies.map(depId => {
            const src = nodePositions[depId];
            const tgt = nodePositions[node.id];
            if (!src || !tgt) return null;
            return (
              <line
                key={`${depId}-${node.id}`}
                x1={src.x} y1={src.y}
                x2={tgt.x} y2={tgt.y}
                className="tf-form-dependency-graph__edge"
                markerEnd="url(#dep-arrow)"
              />
            );
          })
        )}
        {nodes.map(node => {
          const pos = nodePositions[node.id];
          if (!pos) return null;
          return (
            <g
              key={node.id}
              className={`tf-form-dependency-graph__node ${node.id === focusedNode ? "tf-form-dependency-graph__node--focused" : ""}`}
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={() => onNodeClick?.(node.id)}
            >
              <circle r={node.type === "group" ? 20 : 14} className="tf-form-dependency-graph__node-shape" />
              <text className="tf-form-dependency-graph__node-label" textAnchor="middle" dy="0.35em">
                {node.label.slice(0, 8)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

FormDependencyGraph.displayName = "FormDependencyGraph";
export default FormDependencyGraph;
