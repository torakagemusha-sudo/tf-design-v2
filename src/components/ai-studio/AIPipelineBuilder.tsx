/**
 * ============================================================================
 * Torafirma Design System — AIPipelineBuilder
 * ============================================================================
 * AI-Assisted Studio component — AI PipelineBuilder.
 *
 * @module   ai-studio/AIPipelineBuilder
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { PipelineNode, PipelineEdge } from './types';
import AIPipelineEdge from './AIPipelineEdge';
import AIPipelineNode from './AIPipelineNode';
import AIPipelineToolbar from './AIPipelineToolbar';

/** Props for the AIPipelineBuilder component */
export interface AIPipelineBuilderProps {
  nodes: PipelineNode[];
  edges: PipelineEdge[];
  onNodeAdd: (node: PipelineNode) => void;
  onNodeRemove: (id: string) => void;
  onEdgeAdd: (edge: PipelineEdge) => void;
  onEdgeRemove: (id: string) => void;
  onNodeUpdate: (id: string, config: Record<string, unknown>) => void;
  onRun: () => void;
  isRunning?: boolean;
}

/**
 * AIPipelineBuilder
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIPipelineBuilder: React.FC<AIPipelineBuilderProps> = ({
  nodes,
  edges,
  onNodeAdd,
  onNodeRemove,
  onEdgeAdd,
  onEdgeRemove,
  onNodeUpdate,
  onRun,
  isRunning,
}) => {
  return (
    <div className="tf-ai-pipeline-builder">
      <div className="tf-ai-pipeline-builder__header">
        <h4 className="tf-ai-pipeline-builder__title">AI Pipeline</h4>
        <AIPipelineToolbar
          onAddNode={onNodeAdd}
          onRun={onRun}
          isRunning={isRunning}
        />
      </div>
      <div className="tf-ai-pipeline-builder__canvas">
        {nodes.map((node) => (
          <AIPipelineNode
            key={node.id}
            node={node}
            onRemove={() => onNodeRemove(node.id)}
            onUpdate={(config) => onNodeUpdate(node.id, config)}
          />
        ))}
        {edges.map((edge) => (
          <AIPipelineEdge
            key={edge.id}
            edge={edge}
            onRemove={() => onEdgeRemove(edge.id)}
          />
        ))}
      </div>
      <div className="tf-ai-pipeline-builder__status">
        <span className="tf-ai-pipeline-builder__count">{nodes.length} nodes, {edges.length} edges</span>
      </div>
    </div>
  );
};

export default AIPipelineBuilder;
