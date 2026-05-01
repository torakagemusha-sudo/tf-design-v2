/**
 * @fileoverview GraphEdgeDefault — Default edge with standard styling.
 * The standard connection type for most node-to-node links.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeDefault — Default edge.
 *
 * A standard solid edge used for default node-to-node connections.
 * No special semantics — just a directed link between two nodes.
 */
export const GraphEdgeDefault: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return <GraphEdge className={`tf-graph-edge-default ${className}`} {...props} />;
};

GraphEdgeDefault.displayName = 'GraphEdgeDefault';
export default GraphEdgeDefault;
