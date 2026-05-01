/**
 * @fileoverview GraphNodeWebhook — Webhook node for receiving HTTP callbacks.
 * Listens for incoming webhook payloads from external services.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeWebhook — Webhook node.
 *
 * Configures an HTTP endpoint that listens for incoming webhook
 * callbacks from external services and platforms.
 */
export const GraphNodeWebhook: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-webhook ${className}`} {...props}>
      <div className="tf-graph-node-webhook__hook">
        <span className="tf-graph-node-webhook__icon">{props.node.icon || '⚓'}</span>
        {props.node.data?.path && (
          <span className="tf-graph-node-webhook__path">
            {String(props.node.data.path)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeWebhook.displayName = 'GraphNodeWebhook';
export default GraphNodeWebhook;
