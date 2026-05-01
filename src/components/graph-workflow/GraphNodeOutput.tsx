/**
 * @fileoverview GraphNodeOutput — Output node for emitting results or data.
 * Marks an exit point where processed data leaves the graph.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeOutput — Output data node.
 *
 * Represents a point where processed data exits the workflow,
 * such as file writes, API responses, or published events.
 */
export const GraphNodeOutput: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode
      className={`tf-graph-node-output ${className}`}
      {...props}
    >
      <div className="tf-graph-node-output__arrow">
        <span className="tf-graph-node-output__icon">{props.node.icon || '↑'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeOutput.displayName = 'GraphNodeOutput';
export default GraphNodeOutput;
