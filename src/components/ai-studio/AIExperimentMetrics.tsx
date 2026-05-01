/**
 * ============================================================================
 * Torafirma Design System — AIExperimentMetrics
 * ============================================================================
 * AI-Assisted Studio component — AI ExperimentMetrics.
 *
 * @module   ai-studio/AIExperimentMetrics
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { ExperimentMetric } from './types';

/** Props for the AIExperimentMetrics component */
export interface AIExperimentMetricsProps {
  metrics: ExperimentMetric[];
}

/**
 * AIExperimentMetrics
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIExperimentMetrics: React.FC<AIExperimentMetricsProps> = ({
  metrics,
}) => {
  return (
    <div className="tf-ai-experiment-metrics">
      {metrics.map((metric) => (
        <div key={metric.name} className={`tf-ai-experiment-metrics__item tf-ai-experiment-metrics__item--${metric.trend || 'stable'}`}>
          <span className="tf-ai-experiment-metrics__name">{metric.name}</span>
          <span className="tf-ai-experiment-metrics__value">
            {metric.value.toFixed(2)}
            {metric.unit && <span className="tf-ai-experiment-metrics__unit">{metric.unit}</span>}
          </span>
          {metric.trend && (
            <span className="tf-ai-experiment-metrics__trend" aria-hidden="true">
              {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default AIExperimentMetrics;
