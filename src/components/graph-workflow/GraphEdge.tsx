/**
 * @fileoverview GraphEdge — Base graph edge/connection component.
 * Renders a directed or undirected connection between two nodes with configurable style.
 */

import React, { useCallback } from 'react';
import type { GraphEdgeData, GraphComponentProps } from './types';

export interface GraphEdgeProps extends GraphComponentProps {
  /** Edge data model */
  edge: GraphEdgeData;
  /** Source node position */
  sourcePos: { x: number; y: number };
  /** Target node position */
  targetPos: { x: number; y: number };
  /** Whether the edge is selected */
  selected?: boolean;
  /** Whether the edge is being hovered */
  hovered?: boolean;
  /** Whether the edge is animated (flow effect) */
  animated?: boolean;
  /** Scale factor for rendering */
  scale?: number;
  /** Callback when edge is clicked */
  onSelect?: (edgeId: string) => void;
  /** Callback when edge is double-clicked */
  onDoubleClick?: (edgeId: string) => void;
  /** Callback when context menu is triggered */
  onContextMenu?: (edgeId: string, event: React.MouseEvent) => void;
  /** Callback when a waypoint is added */
  onWaypointAdd?: (edgeId: string, position: { x: number; y: number }) => void;
  /** Custom label renderer */
  renderLabel?: (edge: GraphEdgeData) => React.ReactNode;
  /** Custom badge renderer */
  renderBadge?: (edge: GraphEdgeData) => React.ReactNode;
}

/**
 * GraphEdge — Base graph edge/connection component.
 *
 * Renders a connection line between two nodes with support for
 * waypoints, labels, animation, and interaction states.
 *
 * @example
 * <GraphEdge
 *   edge={edgeData}
 *   sourcePos={{ x: 100, y: 200 }}
 *   targetPos={{ x: 300, y: 200 }}
 *   onSelect={(id) => handleEdgeSelect(id)}
 * />
 */
export const GraphEdge: React.FC<GraphEdgeProps> = ({
  className = '',
  style,
  edge,
  sourcePos,
  targetPos,
  selected = false,
  hovered = false,
  animated = false,
  scale = 1,
  onSelect,
  onDoubleClick,
  onContextMenu,
  onWaypointAdd,
  renderLabel,
  renderBadge,
  ...rest
}) => {
  const buildPath = useCallback((): string => {
    const points = [
      sourcePos,
      ...(edge.waypoints?.map((w) => w.position) ?? []),
      targetPos,
    ];

    if (points.length === 2) {
      const curvature = edge.curvature ?? 0;
      if (curvature > 0) {
        const midX = (points[0].x + points[1].x) / 2;
        const midY = (points[0].y + points[1].y) / 2;
        const cX = midX + curvature * (points[1].y - points[0].y);
        const cY = midY - curvature * (points[1].x - points[0].x);
        return `M ${points[0].x} ${points[0].y} Q ${cX} ${cY} ${points[1].x} ${points[1].y}`;
      }
      return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
    }

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  }, [sourcePos, targetPos, edge.waypoints, edge.curvature]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect?.(edge.id);
    },
    [edge.id, onSelect]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDoubleClick?.(edge.id);
    },
    [edge.id, onDoubleClick]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onContextMenu?.(edge.id, e);
    },
    [edge.id, onContextMenu]
  );

  const strokeColor = edge.color ?? '#4a6fa5';
  const strokeWidth = (edge.thickness ?? 2) / scale;
  const dashArray =
    edge.style === 'dashed'
      ? '8,4'
      : edge.style === 'dotted'
        ? '2,4'
        : 'none';

  const typeClass = `tf-graph-edge--type-${edge.type}`;
  const selectedClass = selected ? 'tf-graph-edge--selected' : '';
  const hoveredClass = hovered ? 'tf-graph-edge--hovered' : '';
  const animatedClass = animated ? 'tf-graph-edge--animated' : '';

  return (
    <g
      className={`tf-graph-edge ${typeClass} ${selectedClass} ${hoveredClass} ${animatedClass} ${className}`}
      data-edge-id={edge.id}
      data-edge-type={edge.type}
      data-testid={`graph-edge-${edge.id}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      style={{ cursor: 'pointer', ...style }}
      {...rest}
    >
      {/* Invisible wider hit area */}
      <path
        d={buildPath()}
        fill="none"
        stroke="transparent"
        strokeWidth={Math.max(10, strokeWidth * 3)}
        style={{ pointerEvents: 'stroke' }}
      />

      {/* Visible edge path */}
      <path
        d={buildPath()}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        style={
          animated
            ? {
                filter: `drop-shadow(0 0 4px ${strokeColor})`,
              }
            : undefined
        }
      />

      {/* Arrowhead marker */}
      <defs>
        <marker
          id={`arrow-${edge.id}`}
          viewBox="0 0 10 10"
          refX={10}
          refY={5}
          markerWidth={6}
          markerHeight={6}
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
        </marker>
      </defs>
      <path
        d={buildPath()}
        fill="none"
        stroke="transparent"
        strokeWidth={strokeWidth}
        markerEnd={`url(#arrow-${edge.id})`}
      />

      {/* Label */}
      {edge.label && (
        <foreignObject
          x={(sourcePos.x + targetPos.x) / 2 - 40}
          y={(sourcePos.y + targetPos.y) / 2 - 12}
          width={80}
          height={24}
        >
          <div className="tf-graph-edge__label">
            {renderLabel ? renderLabel(edge) : edge.label}
          </div>
        </foreignObject>
      )}

      {/* Badge */}
      {edge.badge && (
        <g className="tf-graph-edge__badge">
          <circle
            cx={(sourcePos.x + targetPos.x) / 2}
            cy={(sourcePos.y + targetPos.y) / 2 - 20}
            r={8}
            fill="#d9534f"
          />
          <text
            x={(sourcePos.x + targetPos.x) / 2}
            y={(sourcePos.y + targetPos.y) / 2 - 16}
            textAnchor="middle"
            fill="#fff"
            fontSize={10}
          >
            {edge.badge}
          </text>
        </g>
      )}

      {/* Waypoints */}
      {edge.waypoints?.map((wp) => (
        <circle
          key={wp.id}
          cx={wp.position.x}
          cy={wp.position.y}
          r={4}
          className="tf-graph-edge__waypoint"
          fill={strokeColor}
          style={{ cursor: 'move' }}
        />
      ))}
    </g>
  );
};

GraphEdge.displayName = 'GraphEdge';

export default GraphEdge;
