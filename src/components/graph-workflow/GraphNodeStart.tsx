/**
 * @fileoverview GraphNodeStart — Start/entry node marking the flow origin.
 * Rendered with a distinctive green accent and circular or pill shape.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeStart — Start/entry node.
 *
 * Marks the beginning of a workflow or process flow. Rendered with a
 * green color accent and often a play-icon to indicate the entry point.
 */
export const GraphNodeStart: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode
      className={`tf-graph-node-start ${className}`}
      {...props}
    >
      <div className="tf-graph-node-start__indicator">
        <span className="tf-graph-node-start__icon">
          {props.node.icon || '▶'}
        </span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeStart.displayName = 'GraphNodeStart';
export default GraphNodeStart;
