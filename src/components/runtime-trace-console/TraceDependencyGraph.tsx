/**
 * @fileoverview TraceDependencyGraph — Trace dependency map visualization.
 * Shows relationships between trace spans/services as a directed graph.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceDependencyGraph
 */

import React, { useMemo } from "react";
import type { BaseComponentProps, TraceSpan } from "./types";

/** Props for TraceDependencyGraph. */
export interface TraceDependencyGraphProps extends BaseComponentProps {
  /** Spans to derive dependencies from. */
  spans: TraceSpan[];
  /** Width in pixels. */
  width?: number;
  /** Height in pixels. */
  height?: number;
  /** Callback on service click. */
  onServiceClick?: (service: string) => void;
}

/** Service node in the dependency graph. */
interface ServiceNode {
  name: string;
  x: number;
  y: number;
  totalDuration: number;
  spanCount: number;
  errorCount: number;
}

/** Dependency edge between services. */
interface DependencyEdge {
  from: string;
  to: string;
  count: number;
}

/**
 * TraceDependencyGraph — Service dependency map.
 *
 * Derives service-to-service dependencies from span parent-child relationships.
 *
 * @example
 * ```tsx
 * <TraceDependencyGraph
 *   spans={traceSpans}
 *   width={600}
 *   height={400}
 * />
 * ```
 */
export const TraceDependencyGraph: React.FC<TraceDependencyGraphProps> = ({
  spans,
  width = 600,
  height = 400,
  onServiceClick,
  className = "",
  "data-testid": dataTestId = "trace-dependency-graph",
}) => {
  const { nodes, edges } = useMemo(() => {
    const serviceMap = new Map<string, ServiceNode>();
    const edgeMap = new Map<string, DependencyEdge>();
    const spanMap = new Map(spans.map((s) => [s.id, s]));

    // Build service nodes
    for (const span of spans) {
      const existing = serviceMap.get(span.service);
      if (existing) {
        existing.totalDuration += span.durationMs;
        existing.spanCount += 1;
        if (span.status === "error") existing.errorCount += 1;
      } else {
        serviceMap.set(span.service, {
          name: span.service,
          x: 0,
          y: 0,
          totalDuration: span.durationMs,
          spanCount: 1,
          errorCount: span.status === "error" ? 1 : 0,
        });
      }

      // Build edges from parent-child
      if (span.parentId) {
        const parent = spanMap.get(span.parentId);
        if (parent && parent.service !== span.service) {
          const edgeKey = `${parent.service}>${span.service}`;
          const existing = edgeMap.get(edgeKey);
          if (existing) {
            existing.count += 1;
          } else {
            edgeMap.set(edgeKey, {
              from: parent.service,
              to: span.service,
              count: 1,
            });
          }
        }
      }
    }

    // Layout nodes in a circle
    const nodes = Array.from(serviceMap.values());
    const radius = Math.min(width, height) / 3;
    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < nodes.length; i++) {
      const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
      nodes[i].x = cx + radius * Math.cos(angle);
      nodes[i].y = cy + radius * Math.sin(angle);
    }

    return {
      nodes,
      edges: Array.from(edgeMap.values()),
    };
  }, [spans, width, height]);

  return (
    <div
      className={`tf-trace-dependency-graph ${className}`}
      data-testid={dataTestId}
    >
      <svg width={width} height={height}>
        {/* Edges */}
        {edges.map((edge, i) => {
          const fromNode = nodes.find((n) => n.name === edge.from);
          const toNode = nodes.find((n) => n.name === edge.to);
          if (!fromNode || !toNode) return null;
          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="rgba(6,182,212,0.4)"
              strokeWidth={Math.min(edge.count, 4)}
              markerEnd="url(#arrowhead)"
            />
          );
        })}

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth={8}
            markerHeight={6}
            refX={20}
            refY={3}
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="rgba(6,182,212,0.6)" />
          </marker>
        </defs>

        {/* Nodes */}
        {nodes.map((node) => (
          <g
            key={node.name}
            className="tf-trace-dependency-graph__node"
            onClick={() => onServiceClick?.(node.name)}
            style={{ cursor: onServiceClick ? "pointer" : "default" }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={Math.max(20, Math.min(node.spanCount * 5, 50))}
              fill={node.errorCount > 0 ? "rgba(239,68,68,0.3)" : "rgba(6,182,212,0.2)"}
              stroke={node.errorCount > 0 ? "#ef4444" : "#06b6d4"}
              strokeWidth={1.5}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fill="#e2e8f0"
            >
              {node.name.length > 10
                ? `${node.name.slice(0, 10)}...`
                : node.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

TraceDependencyGraph.displayName = "TraceDependencyGraph";

export default TraceDependencyGraph;
