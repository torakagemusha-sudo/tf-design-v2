/**
 * @fileoverview GraphEdgeConditional — Conditional flow edge with label.
 * Represents a conditional branch with the condition expression as a label.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeConditional — Conditional flow edge.
 *
 * A dashed edge representing a conditional branch. The condition
 * expression is displayed as the edge label (e.g., "true", "false", "x > 5").
 */
export const GraphEdgeConditional: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphEdge
      className={`tf-graph-edge-conditional ${className}`}
      edge={{
        ...props.edge,
        style: props.edge.style ?? 'dashed',
      }}
      {...props}
    />
  );
};

GraphEdgeConditional.displayName = 'GraphEdgeConditional';
export default GraphEdgeConditional;
