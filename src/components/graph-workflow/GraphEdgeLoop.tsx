/**
 * @fileoverview GraphEdgeLoop — Loop-back edge for cyclic flows.
 * Represents a feedback loop returning to an earlier node.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeLoop — Loop-back edge.
 *
 * A curved edge that loops back to an upstream node, representing
 * iteration, retry, or feedback in the workflow.
 */
export const GraphEdgeLoop: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphEdge
      className={`tf-graph-edge-loop ${className}`}
      edge={{
        ...props.edge,
        curvature: props.edge.curvature ?? 0.3,
        style: props.edge.style ?? 'dashed',
      }}
      {...props}
    />
  );
};

GraphEdgeLoop.displayName = 'GraphEdgeLoop';
export default GraphEdgeLoop;
