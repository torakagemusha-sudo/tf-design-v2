/**
 * @fileoverview GraphEdgeMerge — Merge flow edge for joining parallel branches.
 * Represents a branch feeding into a join/merge synchronization node.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeMerge — Merge flow edge.
 *
 * An edge representing one of multiple parallel branches converging
 * into a join node. Styled to indicate convergence.
 */
export const GraphEdgeMerge: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphEdge
      className={`tf-graph-edge-merge ${className}`}
      edge={{
        ...props.edge,
        style: props.edge.style ?? 'solid',
      }}
      {...props}
    />
  );
};

GraphEdgeMerge.displayName = 'GraphEdgeMerge';
export default GraphEdgeMerge;
