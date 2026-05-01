/**
 * @fileoverview GraphNodeData — Data store node representing a database, cache, or storage.
 * Rendered with a cylindrical database-icon shape to indicate data persistence.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeData — Data store node.
 *
 * Represents a data persistence layer: database, cache, file store,
 * or any data repository. Rendered with a cylinder/database icon accent.
 */
export const GraphNodeData: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode
      className={`tf-graph-node-data ${className}`}
      {...props}
    >
      <div className="tf-graph-node-data__cylinder">
        <span className="tf-graph-node-data__icon">
          {props.node.icon || '🗄'}
        </span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeData.displayName = 'GraphNodeData';
export default GraphNodeData;
