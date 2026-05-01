/**
 * @fileoverview GraphNodeDecision — Decision/diamond-shaped branching node.
 * Used for conditional logic where the flow splits based on a boolean or multi-way decision.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeDecision — Decision/diamond node.
 *
 * Rendered as a diamond (rotated square) to represent a conditional
 * branch point. Typically has one input and multiple output paths
 * labeled with condition labels (true/false, yes/no).
 */
export const GraphNodeDecision: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  const width = props.node.size?.width ?? 140;
  const height = props.node.size?.height ?? 80;

  return (
    <GraphNode
      className={`tf-graph-node-decision ${className}`}
      {...props}
      node={{
        ...props.node,
        size: { width, height },
      }}
    >
      <div className="tf-graph-node-decision__diamond">
        <span className="tf-graph-node-decision__label">
          {props.node.label}
        </span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeDecision.displayName = 'GraphNodeDecision';
export default GraphNodeDecision;
