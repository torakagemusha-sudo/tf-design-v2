/**
 * @fileoverview GraphNodeCompensate — Compensation/rollback node for Saga patterns.
 * Executes compensating actions to undo previously completed steps.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeCompensate — Compensation node.
 *
 * Executes a compensating (rollback) action as part of a Saga or
 * long-running transaction pattern. Triggered when a downstream step fails.
 */
export const GraphNodeCompensate: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-compensate ${className}`} {...props}>
      <div className="tf-graph-node-compensate__rollback">
        <span className="tf-graph-node-compensate__icon">{props.node.icon || '↶'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeCompensate.displayName = 'GraphNodeCompensate';
export default GraphNodeCompensate;
