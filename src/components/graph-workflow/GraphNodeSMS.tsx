/**
 * @fileoverview GraphNodeSMS — SMS node for sending text messages.
 * Dispatches SMS via Twilio, AWS SNS, or other SMS gateways.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeSMS — SMS node.
 *
 * Sends text messages via SMS gateways. Displays the provider
 * name and template reference if configured.
 */
export const GraphNodeSMS: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-sms ${className}`} {...props}>
      <div className="tf-graph-node-sms__message">
        <span className="tf-graph-node-sms__icon">{props.node.icon || '📱'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeSMS.displayName = 'GraphNodeSMS';
export default GraphNodeSMS;
