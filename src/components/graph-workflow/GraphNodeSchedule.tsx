/**
 * @fileoverview GraphNodeSchedule — Scheduled trigger node for cron/time-based execution.
 * Triggers workflow execution on a recurring schedule.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeSchedule — Scheduled trigger node.
 *
 * Triggers workflow execution based on a cron expression or
 * interval schedule. Shows the cron string if configured.
 */
export const GraphNodeSchedule: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-schedule ${className}`} {...props}>
      <div className="tf-graph-node-schedule__calendar">
        <span className="tf-graph-node-schedule__icon">{props.node.icon || '🕐'}</span>
        {props.node.data?.cron && (
          <span className="tf-graph-node-schedule__cron">
            {String(props.node.data.cron)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeSchedule.displayName = 'GraphNodeSchedule';
export default GraphNodeSchedule;
