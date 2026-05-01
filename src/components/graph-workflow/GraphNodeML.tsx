/**
 * @fileoverview GraphNodeML — Machine learning node for ML inference/training.
 * Executes ML model inference or training pipelines.
 */

import React from 'react';
import { GraphNode } from './GraphNode';
import type { GraphNodeProps } from './GraphNode';

/**
 * GraphNodeML — Machine learning node.
 *
 * Executes ML model inference, training, or feature engineering.
 * Shows the model name and version if configured.
 */
export const GraphNodeML: React.FC<GraphNodeProps> = ({
  className = '',
  ...props
}) => {
  const modelName = props.node.data?.modelName as string | undefined;

  return (
    <GraphNode className={`tf-graph-node-ml ${className}`} {...props}>
      <div className="tf-graph-node-ml__brain">
        <span className="tf-graph-node-ml__icon">{props.node.icon || '🧠'}</span>
        {modelName && <span className="tf-graph-node-ml__model">{modelName}</span>}
      </div>
      {props.children}
    </GraphNode>
  );
};

GraphNodeML.displayName = 'GraphNodeML';
export default GraphNodeML;
