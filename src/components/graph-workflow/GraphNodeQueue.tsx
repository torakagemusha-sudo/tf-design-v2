/**
 * @fileoverview GraphNodeQueue — Queue node for message queue operations.
 * Publishes or consumes messages from a message broker queue.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeQueue — Queue node.
 *
 * Interacts with message queues (RabbitMQ, Kafka, SQS, etc.)
 * for publish, consume, or peek operations.
 */
export const GraphNodeQueue: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-queue ${className}`} {...props}>
      <div className="tf-graph-node-queue__messages">
        <span className="tf-graph-node-queue__icon">{props.node.icon || '≋'}</span>
        {props.node.data?.queueName && (
          <span className="tf-graph-node-queue__name">
            {String(props.node.data.queueName)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeQueue.displayName = 'GraphNodeQueue';
export default GraphNodeQueue;
