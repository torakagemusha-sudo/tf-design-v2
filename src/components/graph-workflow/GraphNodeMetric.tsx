/**
 * @fileoverview GraphNodeMetric — Metric collection node for observability.
 * Records custom metrics, counters, or gauges during workflow execution.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeMetric — Metric collection node.
 *
 * Records custom metrics, counters, timers, or gauges for
 * observability and monitoring dashboards.
 */
export const GraphNodeMetric: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-metric ${className}`} {...props}>
      <div className="tf-graph-node-metric__chart">
        <span className="tf-graph-node-metric__icon">{props.node.icon || '📊'}</span>
        {props.node.data?.metricName && (
          <span className="tf-graph-node-metric__name">
            {String(props.node.data.metricName)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeMetric.displayName = 'GraphNodeMetric';
export default GraphNodeMetric;
