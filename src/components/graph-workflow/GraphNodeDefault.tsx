/**
 * @fileoverview GraphNodeDefault — Default rectangular node for general-purpose use.
 * The standard node type with label, icon, and status indicator.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeDefault — Default rectangular node.
 *
 * A general-purpose node rendered as a rounded rectangle. Used when no
 * specific semantic node type applies.
 */
export const GraphNodeDefault: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode
      className={`tf-graph-node-default ${className}`}
      {...props}
    >
      {props.children}
    </GraphNode>
  );
};

GraphNodeDefault.displayName = 'GraphNodeDefault';
export default GraphNodeDefault;
