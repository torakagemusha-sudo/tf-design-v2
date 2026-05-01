/**
 * @fileoverview GraphNodeManual — Manual task node requiring human intervention.
 * Pauses workflow execution until a user performs an action.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeManual — Manual task node.
 *
 * Represents a human task or approval step that blocks workflow
 * progression until explicitly completed by a user.
 */
export const GraphNodeManual: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-manual ${className}`} {...props}>
      <div className="tf-graph-node-manual__hand">
        <span className="tf-graph-node-manual__icon">{props.node.icon || '✋'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeManual.displayName = 'GraphNodeManual';
export default GraphNodeManual;
