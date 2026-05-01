/**
 * @fileoverview GraphNodeTransform — Data transform node for ETL/mapping operations.
 * Transforms data from one format or structure to another.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeTransform — Data transform node.
 *
 * Applies data transformations: mapping, filtering, aggregation,
 * or format conversion as part of an ETL pipeline.
 */
export const GraphNodeTransform: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-transform ${className}`} {...props}>
      <div className="tf-graph-node-transform__mapping">
        <span className="tf-graph-node-transform__icon">{props.node.icon || '⇄'}</span>
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeTransform.displayName = 'GraphNodeTransform';
export default GraphNodeTransform;
