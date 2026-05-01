import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * SchemaEditor — visual schema editor with draggable nodes and relationship edges.
 * Provides a canvas for designing database/app schemas visually.
 *
 * @example
 * <SchemaEditor nodes={nodes} edges={edges} onNodeSelect={handleSelect} onEdgeCreate={handleEdge} />
 */
export interface SchemaEditorProps extends BaseComponentProps {
  /** Schema nodes to render on canvas */
  nodes: SchemaNodeData[];
  /** Relationship edges between nodes */
  edges: SchemaEdgeData[];
  /** Called when a node is selected */
  onNodeSelect?: (node: SchemaNodeData) => void;
  /** Called when a node is moved */
  onNodeMove?: (id: string, pos: { x: number; y: number }) => void;
  /** Called when an edge is created */
  onEdgeCreate?: (edge: SchemaEdgeData) => void;
  /** Called when an edge is removed */
  onEdgeRemove?: (id: string) => void;
  /** Called when a node is added */
  onNodeAdd?: (node: SchemaNodeData) => void;
  /** Called when a node is deleted */
  onNodeDelete?: (id: string) => void;
  /** Canvas background grid size */
  gridSize?: number;
  /** Whether to show grid */
  showGrid?: boolean;
  /** Whether editing is enabled */
  editable?: boolean;
  /** Zoom level (0.1 - 3) */
  zoom?: number;
  /** Fit-to-view on mount */
  fitView?: boolean;
  /** Read-only mode */
  readonly?: boolean;
}

export const SchemaEditor: React.FC<SchemaEditorProps> = ({
  nodes,
  edges,
  onNodeSelect,
  onNodeMove,
  onEdgeCreate,
  onEdgeRemove,
  onNodeAdd,
  onNodeDelete,
  gridSize = 20,
  showGrid = true,
  editable = true,
  zoom = 1,
  fitView = false,
  readonly = false,
  className = "",
  style,
  ...rest
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [dragNode, setDragNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [currentZoom, setCurrentZoom] = useState(zoom);

  const effectiveZoom = currentZoom;

  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    if (!editable || readonly) return;
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    setDragNode(nodeId);
    setSelectedNodeId(nodeId);
    onNodeSelect?.(node);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: (e.clientX - rect.left - pan.x) / effectiveZoom - node.position.x,
        y: (e.clientY - rect.top - pan.y) / effectiveZoom - node.position.y,
      });
    }
  }, [editable, readonly, nodes, pan, effectiveZoom, onNodeSelect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragNode && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = (e.clientX - rect.left - pan.x) / effectiveZoom - dragOffset.x;
      const newY = (e.clientY - rect.top - pan.y) / effectiveZoom - dragOffset.y;
      onNodeMove?.(dragNode, { x: Math.round(newX / (gridSize / 2)) * (gridSize / 2), y: Math.round(newY / (gridSize / 2)) * (gridSize / 2) });
    } else if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  }, [dragNode, dragOffset, pan, effectiveZoom, gridSize, isPanning, panStart, onNodeMove]);

  const handleMouseUp = useCallback(() => {
    setDragNode(null);
    setIsPanning(false);
  }, []);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedNodeId(null);
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  }, [pan]);

  const nodeTypes: Record<string, string> = {
    entity: "tf-schema-editor__node--entity",
    attribute: "tf-schema-editor__node--attribute",
    relation: "tf-schema-editor__node--relation",
    index: "tf-schema-editor__node--index",
    validation: "tf-schema-editor__node--validation",
    trigger: "tf-schema-editor__node--trigger",
  };

  const edgeTypeClasses: Record<string, string> = {
    oneToOne: "tf-schema-editor__edge--1-1",
    oneToMany: "tf-schema-editor__edge--1-n",
    manyToOne: "tf-schema-editor__edge--n-1",
    manyToMany: "tf-schema-editor__edge--n-n",
    inheritance: "tf-schema-editor__edge--inheritance",
    dependency: "tf-schema-editor__edge--dependency",
  };

  return (
    <div
      ref={canvasRef}
      className={`tf-schema-editor ${showGrid ? "tf-schema-editor--grid" : ""} ${readonly ? "tf-schema-editor--readonly" : ""} ${className}`}
      style={{
        backgroundSize: `${gridSize * effectiveZoom}px ${gridSize * effectiveZoom}px`,
        cursor: isPanning ? "grabbing" : dragNode ? "grabbing" : "default",
        ...style,
      }}
      data-testid="schema-editor"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseDown={handleCanvasMouseDown}
      {...rest}
    >
      <div className="tf-schema-editor__viewport" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${effectiveZoom})` }}>
        <svg className="tf-schema-editor__edges-layer">
          {edges.map(edge => {
            const src = nodes.find(n => n.id === edge.source);
            const tgt = nodes.find(n => n.id === edge.target);
            if (!src || !tgt) return null;
            return (
              <g key={edge.id} className={`tf-schema-editor__edge ${edgeTypeClasses[edge.type] || ""}`}>
                <line
                  x1={src.position.x + 80} y1={src.position.y + 30}
                  x2={tgt.position.x + 80} y2={tgt.position.y + 30}
                  className="tf-schema-editor__edge-line"
                />
                {edge.label && (
                  <text
                    x={(src.position.x + tgt.position.x) / 2 + 80}
                    y={(src.position.y + tgt.position.y) / 2 + 30 - 6}
                    className="tf-schema-editor__edge-label"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        {nodes.map(node => (
          <div
            key={node.id}
            className={`tf-schema-editor__node ${nodeTypes[node.type] || ""} ${node.selected || selectedNodeId === node.id ? "tf-schema-editor__node--selected" : ""} ${node.disabled ? "tf-schema-editor__node--disabled" : ""}`}
            style={{ transform: `translate(${node.position.x}px, ${node.position.y}px)` }}
            onMouseDown={e => handleNodeMouseDown(e, node.id)}
            data-testid={`schema-node-${node.id}`}
          >
            <div className="tf-schema-editor__node-header">
              {node.icon && <span className="tf-schema-editor__node-icon">{node.icon}</span>}
              <span className="tf-schema-editor__node-label">{node.label}</span>
            </div>
            {node.expanded && (
              <div className="tf-schema-editor__node-props">
                {Object.entries(node.properties).map(([k, v]) => (
                  <div key={k} className="tf-schema-editor__node-prop">
                    <span className="tf-schema-editor__node-prop-key">{k}:</span>
                    <span className="tf-schema-editor__node-prop-val">{String(v)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="tf-schema-editor__zoom-controls">
        <button className="tf-schema-editor__zoom-btn" onClick={() => setCurrentZoom(z => Math.min(z + 0.1, 3))}>+</button>
        <span className="tf-schema-editor__zoom-level">{Math.round(effectiveZoom * 100)}%</span>
        <button className="tf-schema-editor__zoom-btn" onClick={() => setCurrentZoom(z => Math.max(z - 0.1, 0.1))}>-</button>
      </div>
    </div>
  );
};

SchemaEditor.displayName = "SchemaEditor";
export default SchemaEditor;
