/**
 * @fileoverview GraphNodeMessage — Message node for sending or receiving messages.
 * Handles message passing between workflow steps or external systems.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeMessage — Message node.
 *
 * Represents a message send, receive, or transform step in a
 * message-oriented workflow or integration flow.
 */
export const GraphNodeMessage: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-message ${className}`} {...props}>
      <div className="tf-graph-node-message__envelope">
        <span className="tf-graph-node-message__icon">{props.node.icon || '✉'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeMessage.displayName = 'GraphNodeMessage';
export default GraphNodeMessage;
