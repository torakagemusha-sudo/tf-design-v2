/**
 * @fileoverview GraphNodeAlert — Alert node for raising operational alerts.
 * Triggers PagerDuty, OpsGenie, or custom alert channels.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeAlert — Alert node.
 *
 * Raises operational alerts through configured channels such
 * as PagerDuty, OpsGenie, Slack, or custom webhooks.
 */
export const GraphNodeAlert: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-alert ${className}`} {...props}>
      <div className="tf-graph-node-alert__siren">
        <span className="tf-graph-node-alert__icon">{props.node.icon || '🚨'}</span>
        {props.node.data?.severity && (
          <span className={`tf-graph-node-alert__severity tf-graph-node-alert__severity--${String(props.node.data.severity)}`}>
            {String(props.node.data.severity)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeAlert.displayName = 'GraphNodeAlert';
export default GraphNodeAlert;
