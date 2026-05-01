/**
 * @fileoverview GraphNodeNotify — Notification node for alerts and messages.
 * Sends notifications via various channels (email, SMS, push, webhook).
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeNotify — Notification node.
 *
 * Dispatches notifications through configured channels to
 * alert users or systems of workflow events.
 */
export const GraphNodeNotify: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  const channel = props.node.data?.channel as string | undefined;

  return (
    <GraphNode className={`tf-graph-node-notify ${className}`} {...props}>
      <div className="tf-graph-node-notify__bell">
        <span className="tf-graph-node-notify__icon">{props.node.icon || '🔔'}</span>
        {channel && <span className="tf-graph-node-notify__channel">{channel}</span>}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeNotify.displayName = 'GraphNodeNotify';
export default GraphNodeNotify;
