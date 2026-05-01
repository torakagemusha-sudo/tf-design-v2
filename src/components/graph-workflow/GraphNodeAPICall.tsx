/**
 * @fileoverview GraphNodeAPICall — API call node for REST/GraphQL endpoints.
 * Makes HTTP requests to external APIs with configurable method and headers.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeAPICall — API call node.
 *
 * Makes HTTP requests to REST, GraphQL, or SOAP endpoints.
 * Displays the HTTP method and endpoint path.
 */
export const GraphNodeAPICall: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  const method = props.node.data?.method as string | undefined;
  const path = props.node.data?.path as string | undefined;

  return (
    <GraphNode className={`tf-graph-node-api-call ${className}`} {...props}>
      <div className="tf-graph-node-api-call__request">
        {method && (
          <span className={`tf-graph-node-api-call__method tf-graph-node-api-call__method--${method.toLowerCase()}`}>
            {method}
          </span>
        )}
        {path && <span className="tf-graph-node-api-call__path">{path}</span>}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeAPICall.displayName = 'GraphNodeAPICall';
export default GraphNodeAPICall;
