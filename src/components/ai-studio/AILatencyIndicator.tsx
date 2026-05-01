/**
 * ============================================================================
 * Torafirma Design System — AILatencyIndicator
 * ============================================================================
 * AI-Assisted Studio component — AI LatencyIndicator.
 *
 * @module   ai-studio/AILatencyIndicator
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AILatencyIndicator component */
export interface AILatencyIndicatorProps {
  latencyMs: number;
  showValue?: boolean;
}

/**
 * AILatencyIndicator
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AILatencyIndicator: React.FC<AILatencyIndicatorProps> = ({
  latencyMs,
  showValue,
}) => {
  const seconds = (latencyMs / 1000).toFixed(2);
  const level = latencyMs < 500 ? 'fast' : latencyMs < 2000 ? 'normal' : 'slow';

  return (
    <div className={`tf-ai-latency-indicator tf-ai-latency-indicator--${level}`} title={`Response time: ${seconds}s`}>
      <span className="tf-ai-latency-indicator__dot" aria-hidden="true" />
      {showValue && <span className="tf-ai-latency-indicator__value">{seconds}s</span>}
    </div>
  );
};

export default AILatencyIndicator;
