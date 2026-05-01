/**
 * @fileoverview GraphNodeQuery — Database query node for executing SQL/NoSQL queries.
 * Performs read operations against configured data sources.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeQuery — Database query node.
 *
 * Executes a database query (SQL, NoSQL, GraphQL) against a
 * configured datasource and returns the results.
 */
export const GraphNodeQuery: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-query ${className}`} {...props}>
      <div className="tf-graph-node-query__statement">
        <span className="tf-graph-node-query__icon">{props.node.icon || '🔍'}</span>
        {props.node.data?.datasource && (
          <span className="tf-graph-node-query__ds">
            {String(props.node.data.datasource)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeQuery.displayName = 'GraphNodeQuery';
export default GraphNodeQuery;
