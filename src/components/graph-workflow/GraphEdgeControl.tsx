/**
 * @fileoverview GraphEdgeControl — Control flow edge for execution ordering.
 * Defines the sequence of execution between workflow steps.
 */

import React from 'react';
import { GraphEdge } from './GraphEdge';
import type { GraphEdgeProps } from './GraphEdge';

/**
 * GraphEdgeControl — Control flow edge.
 *
 * The standard execution-order edge that defines which node runs
 * after another. This is the default control flow semantic.
 */
export const GraphEdgeControl: React.FC<GraphEdgeProps> = ({
  className = '',
  ...props
}) => {
  return (
    <GraphEdge
      className={`tf-graph-edge-control ${className}`}
      edge={{
        ...props.edge,
        style: props.edge.style ?? 'solid',
        thickness: props.edge.thickness ?? 2,
        color: props.edge.color ?? '#ecf0f1',
      }}
      {...props}
    />
  );
};

GraphEdgeControl.displayName = 'GraphEdgeControl';
export default GraphEdgeControl;
