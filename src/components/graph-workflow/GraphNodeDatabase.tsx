/**
 * @fileoverview GraphNodeDatabase — Database node for data persistence operations.
 * CRUD operations against relational or NoSQL databases.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeDatabase — Database node.
 *
 * Represents a database interaction: create, read, update, delete.
 * Shows the table/collection name if configured.
 */
export const GraphNodeDatabase: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-database ${className}`} {...props}>
      <div className="tf-graph-node-database__cylinder">
        <span className="tf-graph-node-database__icon">{props.node.icon || '🗃'}</span>
        {props.node.data?.table && (
          <span className="tf-graph-node-database__table">
            {String(props.node.data.table)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeDatabase.displayName = 'GraphNodeDatabase';
export default GraphNodeDatabase;
