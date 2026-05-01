/**
 * @fileoverview GraphEdgeError — Error flow edge for exception paths.
 * Represents the flow taken when an upstream node throws an error.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeError — Error flow edge.
 *
 * A red dotted edge representing an exception or error path.
 * Connects a node to its error handler.
 */
export const GraphEdgeError: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphEdge
      className={`tf-graph-edge-error ${className}`}
      edge={{
        ...props.edge,
        style: props.edge.style ?? 'dotted',
        color: props.edge.color ?? '#e74c3c',
      }}
      {...props}
    />
  );
};

GraphEdgeError.displayName = 'GraphEdgeError';
export default GraphEdgeError;
