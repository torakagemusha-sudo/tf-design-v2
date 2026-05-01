/**
 * @fileoverview GraphNodeLoop — Loop/iterate node for repeated execution.
 * Iterates over a collection or repeats while a condition holds.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeLoop — Loop/iterate node.
 *
 * Represents a loop construct: for-each, while, or repeat-until.
 * Shows the iteration type and item name if configured.
 */
export const GraphNodeLoop: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  const loopType = props.node.data?.loopType as string | undefined;

  return (
    <GraphNode className={`tf-graph-node-loop ${className}`} {...props}>
      <div className="tf-graph-node-loop__cycle">
        <span className="tf-graph-node-loop__icon">{props.node.icon || '⟳'}</span>
        {loopType && <span className="tf-graph-node-loop__type">{loopType}</span>}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeLoop.displayName = 'GraphNodeLoop';
export default GraphNodeLoop;
