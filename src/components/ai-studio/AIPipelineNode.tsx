/**
 * ============================================================================
 * Torafirma Design System — AIPipelineNode
 * ============================================================================
 * AI-Assisted Studio component — AI PipelineNode.
 *
 * @module   ai-studio/AIPipelineNode
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { PipelineNode } from './types';

/** Props for the AIPipelineNode component */
export interface AIPipelineNodeProps {
  node: PipelineNode;
  onRemove: () => void;
  onUpdate: (config: Record<string, unknown>) => void;
}

/**
 * AIPipelineNode
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIPipelineNode: React.FC<AIPipelineNodeProps> = ({
  node,
  onRemove,
  onUpdate,
}) => {
  const statusIcon = {
    idle: '◆',
    running: '⟳',
    completed: '✓',
    error: '✕',
  };

  return (
    <div
      className={`tf-ai-pipeline-node tf-ai-pipeline-node--${node.type} tf-ai-pipeline-node--${node.status}`}
      style={{ left: node.position.x, top: node.position.y }}
      role="button"
      tabIndex={0}
    >
      <div className="tf-ai-pipeline-node__header">
        <span className="tf-ai-pipeline-node__status" aria-hidden="true">
          {statusIcon[node.status]}
        </span>
        <span className="tf-ai-pipeline-node__label">{node.label}</span>
        <button className="tf-ai-pipeline-node__remove" onClick={onRemove} type="button" aria-label="Remove node">
          ×
        </button>
      </div>
      <div className="tf-ai-pipeline-node__type">{node.type}</div>
      {Object.keys(node.config).length > 0 && (
        <div className="tf-ai-pipeline-node__config">
          {Object.entries(node.config).slice(0, 3).map(([key, val]) => (
            <span key={key} className="tf-ai-pipeline-node__param">
              {key}: {String(val).slice(0, 20)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIPipelineNode;
