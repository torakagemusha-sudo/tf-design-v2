/**
 * @fileoverview GraphNodeSubgraph — Subgraph/sub-flow node referencing another workflow.
 * Embeds a nested workflow as a single compound node.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeSubgraph — Subgraph/sub-flow node.
 *
 * Represents a nested or referenced sub-workflow. Double-clicking
 * typically navigates into the subgraph canvas.
 */
export const GraphNodeSubgraph: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-subgraph ${className}`} {...props}>
      <div className="tf-graph-node-subgraph__nested">
        <span className="tf-graph-node-subgraph__icon">{props.node.icon || '▣'}</span>
        <span className="tf-graph-node-subgraph__label">{props.node.label}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeSubgraph.displayName = 'GraphNodeSubgraph';
export default GraphNodeSubgraph;
