/**
 * ============================================================================
 * Torafirma Design System — AIBiasDetector
 * ============================================================================
 * AI-Assisted Studio component — AI BiasDetector.
 *
 * @module   ai-studio/AIBiasDetector
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { BiasDetectionResult } from './types';

/** Props for the AIBiasDetector component */
export interface AIBiasDetectorProps {
  results: BiasDetectionResult[];
  onReRun: () => void;
  onMitigate: (dimension: string) => void;
}

/**
 * AIBiasDetector
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIBiasDetector: React.FC<AIBiasDetectorProps> = ({
  results,
  onReRun,
  onMitigate,
}) => {
  const hasBias = results.some((r) => r.score > 0.5);

  return (
    <div className={`tf-ai-bias-detector tf-ai-bias-detector--${hasBias ? 'biased' : 'fair'}`}>
      <div className="tf-ai-bias-detector__header">
        <h4 className="tf-ai-bias-detector__title">Bias Detection</h4>
        <span className="tf-ai-bias-detector__summary">
          {hasBias ? '⚠ Bias detected' : '✓ No significant bias detected'}
        </span>
      </div>
      <div className="tf-ai-bias-detector__results">
        {results.map((result) => (
          <div
            key={result.dimension}
            className={`tf-ai-bias-detector__result tf-ai-bias-detector__result--${result.score > 0.5 ? 'biased' : 'fair'}`}
          >
            <div className="tf-ai-bias-detector__dimension">
              <span className="tf-ai-bias-detector__name">{result.dimension}</span>
              <span className="tf-ai-bias-detector__score">
                Risk: {(result.score * 100).toFixed(1)}%
              </span>
            </div>
            <div className="tf-ai-bias-detector__bar">
              <div
                className="tf-ai-bias-detector__fill"
                style={{ width: `${result.score * 100}%` }}
                role="progressbar"
                aria-valuenow={result.score}
                aria-valuemin={0}
                aria-valuemax={1}
              />
            </div>
            {result.findings.length > 0 && (
              <ul className="tf-ai-bias-detector__findings">
                {result.findings.map((finding, i) => (
                  <li key={i} className="tf-ai-bias-detector__finding">{finding}</li>
                ))}
              </ul>
            )}
            {result.recommendations.length > 0 && (
              <div className="tf-ai-bias-detector__recommendations">
                {result.recommendations.map((rec, i) => (
                  <span key={i} className="tf-ai-bias-detector__rec">{rec}</span>
                ))}
              </div>
            )}
            {result.score > 0.5 && (
              <button
                className="tf-ai-bias-detector__mitigate"
                onClick={() => onMitigate(result.dimension)}
                type="button"
              >
                Mitigate
              </button>
            )}
          </div>
        ))}
      </div>
      <button className="tf-ai-bias-detector__rerun" onClick={onReRun} type="button">
        Re-run Detection
      </button>
    </div>
  );
};

export default AIBiasDetector;
