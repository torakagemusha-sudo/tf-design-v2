/**
 * @fileoverview GraphNodeError — Error handler node for exception handling paths.
 * Catches and processes errors from connected upstream nodes.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeError — Error handler node.
 *
 * Defines an error handling path in the workflow. Connected via
 * error-flow edges to nodes whose exceptions it should handle.
 */
export const GraphNodeError: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-error ${className}`} {...props}>
      <div className="tf-graph-node-error__shield">
        <span className="tf-graph-node-error__icon">{props.node.icon || '⚠'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeError.displayName = 'GraphNodeError';
export default GraphNodeError;
