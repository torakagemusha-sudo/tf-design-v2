/**
 * @fileoverview GraphNodeBatch — Batch processing node for bulk operations.
 * Processes items in batches for efficiency and resource management.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeBatch — Batch processing node.
 *
 * Groups items into batches and processes them together. Shows
 * the configured batch size if available.
 */
export const GraphNodeBatch: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  const batchSize = props.node.data?.batchSize as number | undefined;

  return (
    <GraphNode className={`tf-graph-node-batch ${className}`} {...props}>
      <div className="tf-graph-node-batch__stack">
        <span className="tf-graph-node-batch__icon">{props.node.icon || '▦'}</span>
        {batchSize && (
          <span className="tf-graph-node-batch__size">n={batchSize}</span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeBatch.displayName = 'GraphNodeBatch';
export default GraphNodeBatch;
