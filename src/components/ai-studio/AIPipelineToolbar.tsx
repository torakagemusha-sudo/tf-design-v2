/**
 * ============================================================================
 * Torafirma Design System — AIPipelineToolbar
 * ============================================================================
 * AI-Assisted Studio component — AI PipelineToolbar.
 *
 * @module   ai-studio/AIPipelineToolbar
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { PipelineNode } from './types';

/** Props for the AIPipelineToolbar component */
export interface AIPipelineToolbarProps {
  onAddNode: (node: PipelineNode) => void;
  onRun: () => void;
  isRunning?: boolean;
}

/**
 * AIPipelineToolbar
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIPipelineToolbar: React.FC<AIPipelineToolbarProps> = ({
  onAddNode,
  onRun,
  isRunning,
}) => {
  const nodeTypes = ['prompt', 'model', 'filter', 'output', 'condition', 'transform'];

  return (
    <div className="tf-ai-pipeline-toolbar" role="toolbar" aria-label="Pipeline tools">
      <div className="tf-ai-pipeline-toolbar__add">
        {nodeTypes.map((type) => (
          <button
            key={type}
            className="tf-ai-pipeline-toolbar__add-btn"
            onClick={() =>
              onAddNode({
                id: `node-${Date.now()}`,
                type,
                label: type.charAt(0).toUpperCase() + type.slice(1),
                config: {},
                position: { x: 100, y: 100 },
                status: 'idle',
              })
            }
            type="button"
          >
            + {type}
          </button>
        ))}
      </div>
      <button
        className={`tf-ai-pipeline-toolbar__run${isRunning ? ' tf-ai-pipeline-toolbar__run--active' : ''}`}
        onClick={onRun}
        disabled={isRunning}
        type="button"
      >
        {isRunning ? '⏹ Stop' : '▶ Run'}
      </button>
    </div>
  );
};

export default AIPipelineToolbar;
