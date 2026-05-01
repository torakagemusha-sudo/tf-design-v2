/**
 * @fileoverview GraphNodeCondition — Condition node for if/then/else branching.
 * Evaluates a condition expression and routes flow accordingly.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeCondition — Condition node.
 *
 * Evaluates a boolean or multi-case condition expression and
 * routes the flow to the matching branch.
 */
export const GraphNodeCondition: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-condition ${className}`} {...props}>
      <div className="tf-graph-node-condition__branch">
        <span className="tf-graph-node-condition__icon">{props.node.icon || '?'}</span>
        {props.node.data?.expression && (
          <span className="tf-graph-node-condition__expr">
            {String(props.node.data.expression)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeCondition.displayName = 'GraphNodeCondition';
export default GraphNodeCondition;
