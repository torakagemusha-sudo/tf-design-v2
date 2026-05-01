/**
 * @fileoverview GraphNodeParallel — Parallel/fork node splitting execution into concurrent branches.
 * Spawns multiple parallel execution paths from a single incoming flow.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeParallel — Parallel/fork node.
 *
 * Splits a single execution flow into multiple concurrent branches.
 * Rendered with a fork icon and often shows the number of parallel paths.
 */
export const GraphNodeParallel: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  const branchCount =
    typeof props.node.data?.branches === 'number'
      ? (props.node.data.branches as number)
      : 2;

  return (
    <GraphNode
      className={`tf-graph-node-parallel ${className}`}
      {...props}
    >
      <div className="tf-graph-node-parallel__fork">
        <span className="tf-graph-node-parallel__icon">{props.node.icon || '⫚'}</span>
        <span className="tf-graph-node-parallel__count">×{branchCount}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeParallel.displayName = 'GraphNodeParallel';
export default GraphNodeParallel;
