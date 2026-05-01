/**
 * @fileoverview GraphNodeRule — Business rule node for rule engine execution.
 * Evaluates business rules against the current context/data.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeRule — Business rule node.
 *
 * Executes business rules from a rule engine (Drools, DMN, etc.)
 * against the current workflow context and data objects.
 */
export const GraphNodeRule: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-rule ${className}`} {...props}>
      <div className="tf-graph-node-rule__scale">
        <span className="tf-graph-node-rule__icon">{props.node.icon || '⚖'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeRule.displayName = 'GraphNodeRule';
export default GraphNodeRule;
