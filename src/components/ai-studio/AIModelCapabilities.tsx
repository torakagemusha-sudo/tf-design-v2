/**
 * ============================================================================
 * Torafirma Design System — AIModelCapabilities
 * ============================================================================
 * AI-Assisted Studio component — AI ModelCapabilities.
 *
 * @module   ai-studio/AIModelCapabilities
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { ModelCapability } from './types';

/** Props for the AIModelCapabilities component */
export interface AIModelCapabilitiesProps {
  capabilities: ModelCapability[];
  showUnsupported?: boolean;
}

/**
 * AIModelCapabilities
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIModelCapabilities: React.FC<AIModelCapabilitiesProps> = ({
  capabilities,
  showUnsupported,
}) => {
  const filtered = showUnsupported ? capabilities : capabilities.filter((c) => c.isSupported);

  return (
    <div className="tf-ai-model-capabilities">
      <h5 className="tf-ai-model-capabilities__title">Capabilities</h5>
      <div className="tf-ai-model-capabilities__list">
        {filtered.map((cap) => (
          <span
            key={cap.name}
            className={`tf-ai-model-capabilities__item tf-ai-model-capabilities__item--${cap.isSupported ? 'supported' : 'unsupported'}`}
            title={cap.description}
          >
            <span className="tf-ai-model-capabilities__icon" aria-hidden="true">
              {cap.isSupported ? '✓' : '✕'}
            </span>
            {cap.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AIModelCapabilities;
