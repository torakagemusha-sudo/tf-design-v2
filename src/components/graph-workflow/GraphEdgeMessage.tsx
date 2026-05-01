/**
 * @fileoverview GraphEdgeMessage — Message flow edge for message-passing patterns.
 * Represents data flowing as messages between nodes.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeMessage — Message flow edge.
 *
 * An edge representing message passing between workflow steps,
 * commonly used in message-oriented middleware patterns.
 */
export const GraphEdgeMessage: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphEdge
      className={`tf-graph-edge-message ${className}`}
      edge={{
        ...props.edge,
        style: props.edge.style ?? 'solid',
        color: props.edge.color ?? '#3498db',
      }}
      {...props}
    />
  );
};

GraphEdgeMessage.displayName = 'GraphEdgeMessage';
export default GraphEdgeMessage;
