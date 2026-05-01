/**
 * @fileoverview GraphNodePublish — Publish event node for event bus/messaging.
 * Publishes events to a message bus, event grid, or pub/sub system.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodePublish — Publish event node.
 *
 * Publishes events to a message bus, event grid, or pub/sub
 * topic. Shows the topic/channel name if configured.
 */
export const GraphNodePublish: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-publish ${className}`} {...props}>
      <div className="tf-graph-node-publish__broadcast">
        <span className="tf-graph-node-publish__icon">{props.node.icon || '📡'}</span>
        {props.node.data?.topic && (
          <span className="tf-graph-node-publish__topic">
            {String(props.node.data.topic)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodePublish.displayName = 'GraphNodePublish';
export default GraphNodePublish;
