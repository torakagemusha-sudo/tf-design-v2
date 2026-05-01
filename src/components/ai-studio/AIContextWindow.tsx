/**
 * ============================================================================
 * Torafirma Design System — AIContextWindow
 * ============================================================================
 * AI-Assisted Studio component — AI ContextWindow.
 *
 * @module   ai-studio/AIContextWindow
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIContextWindow component */
export interface AIContextWindowProps {
  used: number;
  total: number;
  showPercentage?: boolean;
  warningThreshold?: number;
}

/**
 * AIContextWindow
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIContextWindow: React.FC<AIContextWindowProps> = ({
  used,
  total,
  showPercentage,
  warningThreshold,
}) => {
  const percentage = Math.round((used / total) * 100);
  const isWarning = percentage >= (warningThreshold || 80);

  return (
    <div className={`tf-ai-context-window${isWarning ? ' tf-ai-context-window--warning' : ''}`}>
      <div className="tf-ai-context-window__header">
        <span className="tf-ai-context-window__label">Context Window</span>
        <span className="tf-ai-context-window__usage">
          {used.toLocaleString()} / {total.toLocaleString()}
          {showPercentage && ` (${percentage}%)`}
        </span>
      </div>
      <div className="tf-ai-context-window__bar">
        <div
          className="tf-ai-context-window__fill"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={used}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`Context window usage: ${percentage}%`}
        />
      </div>
    </div>
  );
};

export default AIContextWindow;
