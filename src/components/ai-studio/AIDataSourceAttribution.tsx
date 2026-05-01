/**
 * ============================================================================
 * Torafirma Design System — AIDataSourceAttribution
 * ============================================================================
 * AI-Assisted Studio component — AI DataSourceAttribution.
 *
 * @module   ai-studio/AIDataSourceAttribution
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { DataSourceAttribution } from './types';

/** Props for the AIDataSourceAttribution component */
export interface AIDataSourceAttributionProps {
  sources: DataSourceAttribution[];
  totalExamples?: number;
  showPercentages?: boolean;
}

/**
 * AIDataSourceAttribution
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIDataSourceAttribution: React.FC<AIDataSourceAttributionProps> = ({
  sources,
  totalExamples,
  showPercentages,
}) => {
  return (
    <div className="tf-ai-data-source-attribution">
      <h4 className="tf-ai-data-source-attribution__title">Data Sources</h4>
      {totalExamples !== undefined && (
        <span className="tf-ai-data-source-attribution__total">
          {totalExamples.toLocaleString()} total examples
        </span>
      )}
      <div className="tf-ai-data-source-attribution__list">
        {sources.map((source) => (
          <div key={source.id} className="tf-ai-data-source-attribution__item">
            <div className="tf-ai-data-source-attribution__info">
              <span className="tf-ai-data-source-attribution__name">{source.name}</span>
              {source.license && (
                <span className="tf-ai-data-source-attribution__license">{source.license}</span>
              )}
            </div>
            <p className="tf-ai-data-source-attribution__desc">{source.description}</p>
            {showPercentages && source.usagePercent !== undefined && (
              <div className="tf-ai-data-source-attribution__usage">
                <div className="tf-ai-data-source-attribution__bar">
                  <div
                    className="tf-ai-data-source-attribution__fill"
                    style={{ width: `${source.usagePercent}%` }}
                    role="progressbar"
                    aria-valuenow={source.usagePercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <span className="tf-ai-data-source-attribution__percent">{source.usagePercent.toFixed(1)}%</span>
              </div>
            )}
            {source.url && (
              <a
                className="tf-ai-data-source-attribution__link"
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIDataSourceAttribution;
