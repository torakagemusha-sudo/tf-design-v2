/**
 * ============================================================================
 * Torafirma Design System — SuggestionQueuePriority
 * ============================================================================
 * AI-Assisted Studio component — SuggestionQueuePriority.
 *
 * @module   ai-studio/SuggestionQueuePriority
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { SuggestionPriority } from './types';

/** Props for the SuggestionQueuePriority component */
export interface SuggestionQueuePriorityProps {
  priority: SuggestionPriority;
  showLabel?: boolean;
}

/**
 * SuggestionQueuePriority
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const SuggestionQueuePriority: React.FC<SuggestionQueuePriorityProps> = ({
  priority,
  showLabel,
}) => {
  const config: Record<SuggestionPriority, { color: string; label: string }> = {
    critical: { color: '#ef4444', label: 'Critical' },
    high: { color: '#f97316', label: 'High' },
    medium: { color: '#f59e0b', label: 'Medium' },
    low: { color: '#10b981', label: 'Low' },
  };
  const { color, label } = config[priority];

  return (
    <div className={`tf-suggestion-queue-priority tf-suggestion-queue-priority--${priority}`} title={label}>
      <span className="tf-suggestion-queue-priority__dot" style={{ backgroundColor: color }} aria-hidden="true" />
      {showLabel && <span className="tf-suggestion-queue-priority__label">{label}</span>}
    </div>
  );
};

export default SuggestionQueuePriority;
