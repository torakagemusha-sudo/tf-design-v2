/**
 * ============================================================================
 * Torafirma Design System — AIPipelineEdge
 * ============================================================================
 * AI-Assisted Studio component — AI PipelineEdge.
 *
 * @module   ai-studio/AIPipelineEdge
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { PipelineEdge } from './types';

/** Props for the AIPipelineEdge component */
export interface AIPipelineEdgeProps {
  edge: PipelineEdge;
  onRemove: () => void;
}

/**
 * AIPipelineEdge
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIPipelineEdge: React.FC<AIPipelineEdgeProps> = ({
  edge,
  onRemove,
}) => {
  return (
    <div className="tf-ai-pipeline-edge">
      <svg className="tf-ai-pipeline-edge__svg">
        <line className="tf-ai-pipeline-edge__line" />
      </svg>
      {edge.label && (
        <span className="tf-ai-pipeline-edge__label">{edge.label}</span>
      )}
      {edge.condition && (
        <span className="tf-ai-pipeline-edge__condition">[{edge.condition}]</span>
      )}
      <button className="tf-ai-pipeline-edge__remove" onClick={onRemove} type="button" aria-label="Remove edge">
        ×
      </button>
    </div>
  );
};

export default AIPipelineEdge;
