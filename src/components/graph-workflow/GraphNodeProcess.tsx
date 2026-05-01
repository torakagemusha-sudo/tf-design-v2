/**
 * @fileoverview GraphNodeProcess — Process/action node representing a computational step.
 * The standard workhorse node for transforms, operations, and business logic.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeProcess — Process/action node.
 *
 * Represents a step that performs work: data transformation, calculation,
 * business logic execution. Rendered as a rounded rectangle with a gear icon.
 */
export const GraphNodeProcess: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode
      className={`tf-graph-node-process ${className}`}
      {...props}
    >
      <div className="tf-graph-node-process__bar" />
      {props.children}
    </GraphNode>
  );
};

GraphNodeProcess.displayName = 'GraphNodeProcess';
export default GraphNodeProcess;
