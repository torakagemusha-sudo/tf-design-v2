/**
 * @fileoverview GraphEdgeParallel — Parallel flow edge for forked branches.
 * Represents one of multiple concurrent execution paths.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeParallel — Parallel flow edge.
 *
 * An edge representing one branch of a parallel fork. Styled
 * to visually group with sibling parallel edges.
 */
export const GraphEdgeParallel: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphEdge
      className={`tf-graph-edge-parallel ${className}`}
      edge={{
        ...props.edge,
        style: props.edge.style ?? 'solid',
        thickness: props.edge.thickness ?? 2,
      }}
      {...props}
    />
  );
};

GraphEdgeParallel.displayName = 'GraphEdgeParallel';
export default GraphEdgeParallel;
