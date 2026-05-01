/**
 * @fileoverview GraphNodeFile — File operation node for filesystem I/O.
 * Reads, writes, or transforms files on local or remote storage.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeFile — File operation node.
 *
 * Performs file system operations: read, write, copy, move, delete.
 * Shows the file path pattern if configured.
 */
export const GraphNodeFile: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphNode className={`tf-graph-node-file ${className}`} {...props}>
      <div className="tf-graph-node-file__document">
        <span className="tf-graph-node-file__icon">{props.node.icon || '📄'}</span>
        {props.node.data?.operation && (
          <span className="tf-graph-node-file__op">
            {String(props.node.data.operation)}
          </span>
        )}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeFile.displayName = 'GraphNodeFile';
export default GraphNodeFile;
