/**
 * @fileoverview GraphNodeJoin — Join/merge node synchronizing concurrent branches.
 * Waits for all parallel branches to complete before continuing.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeJoin — Join/merge node.
 *
 * Synchronizes multiple parallel execution branches, waiting for
 * all (or a configured subset) to complete before proceeding.
 */
export const GraphNodeJoin: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-join ${className}`} {...props}>
      <div className="tf-graph-node-join__merge">
        <span className="tf-graph-node-join__icon">{props.node.icon || '∩'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeJoin.displayName = 'GraphNodeJoin';
export default GraphNodeJoin;
