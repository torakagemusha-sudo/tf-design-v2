/**
 * ============================================================================
 * Torafirma Design System — AIModelStatus
 * ============================================================================
 * AI-Assisted Studio component — AI ModelStatus.
 *
 * @module   ai-studio/AIModelStatus
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIModel } from './types';

/** Props for the AIModelStatus component */
export interface AIModelStatusProps {
  status: AIModel['status'];
  showLabel?: boolean;
}

/**
 * AIModelStatus
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIModelStatus: React.FC<AIModelStatusProps> = ({
  status,
  showLabel,
}) => {
  const config: Record<AIModel['status'], { color: string; label: string }> = {
    available: { color: '#10b981', label: 'Available' },
    unavailable: { color: '#ef4444', label: 'Unavailable' },
    degraded: { color: '#f59e0b', label: 'Degraded' },
    deprecated: { color: '#6b7280', label: 'Deprecated' },
  };
  const { color, label } = config[status];

  return (
    <span className={`tf-ai-model-status tf-ai-model-status--${status}`} title={label}>
      <span className="tf-ai-model-status__dot" style={{ backgroundColor: color }} aria-hidden="true" />
      {showLabel && <span className="tf-ai-model-status__label">{label}</span>}
    </span>
  );
};

export default AIModelStatus;
