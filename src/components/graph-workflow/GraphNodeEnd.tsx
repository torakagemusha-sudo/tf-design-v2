/**
 * @fileoverview GraphNodeEnd — Terminal/exit node marking flow termination.
 * Rendered with a red accent to signal the end of a process path.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeEnd — Terminal/exit node.
 *
 * Marks the termination point of a workflow. Rendered with a red
 * color accent and often a stop-icon to indicate flow completion.
 */
export const GraphNodeEnd: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode
      className={`tf-graph-node-end ${className}`}
      {...props}
    >
      <div className="tf-graph-node-end__indicator">
        <span className="tf-graph-node-end__icon">
          {props.node.icon || '■'}
        </span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeEnd.displayName = 'GraphNodeEnd';
export default GraphNodeEnd;
