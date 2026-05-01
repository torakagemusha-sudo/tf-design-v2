/**
 * ============================================================================
 * Torafirma Design System — AIContextPriority
 * ============================================================================
 * AI-Assisted Studio component — AI ContextPriority.
 *
 * @module   ai-studio/AIContextPriority
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIContextPriority component */
export interface AIContextPriorityProps {
  priority: number;
  maxPriority?: number;
}

/**
 * AIContextPriority
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIContextPriority: React.FC<AIContextPriorityProps> = ({
  priority,
  maxPriority,
}) => {
  const max = maxPriority || 10;
  const level = priority >= max * 0.8 ? 'high' : priority >= max * 0.4 ? 'medium' : 'low';

  return (
    <span className={`tf-ai-context-priority tf-ai-context-priority--${level}`} title={`Priority: ${priority}/${max}`}>
      <span className="tf-ai-context-priority__bar" style={{ width: `${(priority / max) * 100}%` }} aria-hidden="true" />
    </span>
  );
};

export default AIContextPriority;
