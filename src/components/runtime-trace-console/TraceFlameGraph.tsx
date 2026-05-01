/**
 * @fileoverview TraceFlameGraph — Flame graph visualization.
 * Shows hierarchical time-based call stacks as colored horizontal bars.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceFlameGraph
 */

import React, { useMemo, useState } from "react";
import type { BaseComponentProps, FlameNode } from "./types";

/** Props for TraceFlameGraph. */
export interface TraceFlameGraphProps extends BaseComponentProps {
  /** Root flame node. */
  root: FlameNode;
  /** Total width in pixels. */
  width?: number;
  /** Bar height in pixels. */
  barHeight?: number;
  /** Callback when a node is clicked. */
  onNodeClick?: (node: FlameNode) => void;
  /** Callback when a node is hovered. */
  onNodeHover?: (node: FlameNode | null) => void;
}

/**
 * TraceFlameGraph — Flame graph for trace visualization.
 *
 * Displays hierarchical timing data as stacked horizontal bars.
 *
 * @example
 * ```tsx
 * <TraceFlameGraph
 *   root={flameRoot}
 *   width={800}
 *   onNodeClick={(n) => inspectNode(n)}
 * />
 * ```
 */
export const TraceFlameGraph: React.FC<TraceFlameGraphProps> = ({
  root,
  width = 800,
  barHeight = 20,
  onNodeClick,
  onNodeHover,
  className = "",
  "data-testid": dataTestId = "trace-flame-graph",
}) => {
  const [hoveredNode, setHoveredNode] = useState<FlameNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const maxValue = root.value;

  const renderNode = (
    node: FlameNode,
    depth: number,
    offset: number
  ): React.ReactNode[] => {
    const nodeWidth = (node.value / maxValue) * width;
    const x = (offset / maxValue) * width;
    const y = depth * (barHeight + 1);

    const result: React.ReactNode[] = [
      <TraceFlameBar
        key={node.id}
        node={node}
        x={x}
        y={y}
        width={Math.max(nodeWidth, 1)}
        height={barHeight}
        onClick={() => onNodeClick?.(node)}
        onMouseEnter={(e) => {
          setHoveredNode(node);
          setTooltipPos({ x: e.clientX, y: e.clientY });
          onNodeHover?.(node);
        }}
        onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => {
          setHoveredNode(null);
          onNodeHover?.(null);
        }}
      />,
    ];

    if (node.children) {
      let childOffset = offset;
      for (const child of node.children) {
        result.push(...renderNode(child, depth + 1, childOffset));
        childOffset += child.value;
      }
    }

    return result;
  };

  const nodes = useMemo(() => renderNode(root, 0, 0), [root, maxValue, width, barHeight]);

  const maxDepth = useMemo(() => {
    const getDepth = (n: FlameNode): number =>
      1 +
      (n.children?.length
        ? Math.max(...n.children.map(getDepth))
        : 0);
    return getDepth(root);
  }, [root]);

  return (
    <div
      className={`tf-trace-flame-graph ${className}`}
      data-testid={dataTestId}
    >
      <svg
        className="tf-trace-flame-graph__svg"
        width={width}
        height={maxDepth * (barHeight + 1)}
      >
        {nodes}
      </svg>
      {hoveredNode && (
        <TraceFlameTooltip
          node={hoveredNode}
          x={tooltipPos.x}
          y={tooltipPos.y}
        />
      )}
    </div>
  );
};

TraceFlameGraph.displayName = "TraceFlameGraph";

export default TraceFlameGraph;
