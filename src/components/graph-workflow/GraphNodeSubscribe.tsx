/**
 * @fileoverview GraphNodeSubscribe — Subscribe node for pub/sub or event streaming.
 * Subscribes to a topic, stream, or event channel to receive messages.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeSubscribe — Subscribe node.
 *
 * Subscribes to a pub/sub topic, event stream, or message
 * channel to receive incoming events continuously.
 */
export const GraphNodeSubscribe: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-subscribe ${className}`} {...props}>
      <div className="tf-graph-node-subscribe__receive">
        <span className="tf-graph-node-subscribe__icon">{props.node.icon || '📻'}</span>
        {props.node.data?.topic && (
          <span className="tf-graph-node-subscribe__topic">
            {String(props.node.data.topic)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeSubscribe.displayName = 'GraphNodeSubscribe';
export default GraphNodeSubscribe;
