/**
 * @fileoverview GraphNodeCache — Cache node for read-through/write-through caching.
 * Interacts with a cache layer (Redis, Memcached, etc.).
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeCache — Cache node.
 *
 * Performs cache operations: get, set, invalidate, or read-through.
 * Shows the cache key pattern if configured.
 */
export const GraphNodeCache: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-cache ${className}`} {...props}>
      <div className="tf-graph-node-cache__store">
        <span className="tf-graph-node-cache__icon">{props.node.icon || '⚡'}</span>
        {props.node.data?.operation && (
          <span className="tf-graph-node-cache__op">
            {String(props.node.data.operation)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeCache.displayName = 'GraphNodeCache';
export default GraphNodeCache;
