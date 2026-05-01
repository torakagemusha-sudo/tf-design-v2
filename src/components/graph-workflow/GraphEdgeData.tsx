/**
 * @fileoverview GraphEdgeData — Data flow edge showing data movement between nodes.
 * Represents the flow of data payloads between processing steps.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeData — Data flow edge.
 *
 * Represents the movement of data between nodes. Often annotated
 * with the data schema or payload type being transferred.
 */
export const GraphEdgeData: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphEdge
      className={`tf-graph-edge-data ${className}`}
      edge={{
        ...props.edge,
        style: props.edge.style ?? 'solid',
        color: props.edge.color ?? '#2ecc71',
      }}
      {...props}
    />
  );
};

GraphEdgeData.displayName = 'GraphEdgeData';
export default GraphEdgeData;
