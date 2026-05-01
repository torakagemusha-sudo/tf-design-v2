/**
 * @fileoverview GraphEdgeSignal — Signal/event edge for event-driven flows.
 * Represents an asynchronous signal or event triggering a downstream node.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeSignal — Signal/event edge.
 *
 * An animated edge representing an asynchronous event or signal
 * flowing between nodes in an event-driven architecture.
 */
export const GraphEdgeSignal: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphEdge
      className={`tf-graph-edge-signal ${className}`}
      animated={props.animated ?? true}
      edge={{
        ...props.edge,
        color: props.edge.color ?? '#f39c12',
      }}
      {...props}
    />
  );
};

GraphEdgeSignal.displayName = 'GraphEdgeSignal';
export default GraphEdgeSignal;
