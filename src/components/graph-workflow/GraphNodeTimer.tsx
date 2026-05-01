/**
 * @fileoverview GraphNodeTimer — Timer/delay node for time-based execution.
 * Introduces a pause, delay, or scheduled wait in the workflow.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeTimer — Timer/delay node.
 *
 * Introduces a time-based delay, sleep, or scheduled execution point.
 * Rendered with a clock icon to indicate temporal behavior.
 */
export const GraphNodeTimer: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode
      className={`tf-graph-node-timer ${className}`}
      {...props}
    >
      <div className="tf-graph-node-timer__clock">
        <span className="tf-graph-node-timer__icon">{props.node.icon || '◷'}</span>
        {props.node.data?.duration && (
          <span className="tf-graph-node-timer__duration">
            {String(props.node.data.duration)}ms
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeTimer.displayName = 'GraphNodeTimer';
export default GraphNodeTimer;
