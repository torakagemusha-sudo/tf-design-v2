/**
 * @fileoverview GraphEdgeAssociation — Association edge for loose couplings.
 * Represents a non-execution relationship such as annotation or weak reference.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeAssociation — Association edge.
 *
 * A loosely-coupled edge without execution semantics. Used for
 * annotations, documentation links, or weak references between nodes.
 */
export const GraphEdgeAssociation: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphEdge
      className={`tf-graph-edge-association ${className}`}
      edge={{
        ...props.edge,
        style: props.edge.style ?? 'dotted',
        thickness: props.edge.thickness ?? 1,
        color: props.edge.color ?? '#95a5a6',
      }}
      {...props}
    />
  );
};

GraphEdgeAssociation.displayName = 'GraphEdgeAssociation';
export default GraphEdgeAssociation;
