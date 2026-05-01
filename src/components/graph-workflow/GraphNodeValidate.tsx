/**
 * @fileoverview GraphNodeValidate — Validation node for data/schema validation.
 * Validates input data against defined rules or schemas.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeValidate — Validation node.
 *
 * Validates data against schemas, business rules, or custom
 * validators. Routes to error path on validation failure.
 */
export const GraphNodeValidate: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-validate ${className}`} {...props}>
      <div className="tf-graph-node-validate__check">
        <span className="tf-graph-node-validate__icon">{props.node.icon || '✓'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeValidate.displayName = 'GraphNodeValidate';
export default GraphNodeValidate;
