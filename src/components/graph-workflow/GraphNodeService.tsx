/**
 * @fileoverview GraphNodeService — Service call node for external service invocation.
 * Makes HTTP/gRPC/microservice calls to external systems.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeService — Service call node.
 *
 * Represents an external service invocation via HTTP, gRPC, or
 * other protocols. Shows the service name and endpoint info.
 */
export const GraphNodeService: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-service ${className}`} {...props}>
      <div className="tf-graph-node-service__call">
        <span className="tf-graph-node-service__icon">{props.node.icon || '🔗'}</span>
        {props.node.data?.serviceName && (
          <span className="tf-graph-node-service__name">
            {String(props.node.data.serviceName)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeService.displayName = 'GraphNodeService';
export default GraphNodeService;
