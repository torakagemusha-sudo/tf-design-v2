/**
 * @fileoverview GraphNodeInput — Input node for receiving external data or triggers.
 * Marks an entry point for data flowing into the graph from external sources.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeInput — Input data node.
 *
 * Represents a point where external data enters the workflow.
 * Often connected to triggers, file uploads, or API inputs.
 */
export const GraphNodeInput: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode
      className={`tf-graph-node-input ${className}`}
      {...props}
    >
      <div className="tf-graph-node-input__arrow">
        <span className="tf-graph-node-input__icon">{props.node.icon || '↓'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeInput.displayName = 'GraphNodeInput';
export default GraphNodeInput;
