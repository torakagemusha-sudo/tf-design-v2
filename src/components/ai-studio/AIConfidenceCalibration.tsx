/**
 * ============================================================================
 * Torafirma Design System — AIConfidenceCalibration
 * ============================================================================
 * AI-Assisted Studio component — AI ConfidenceCalibration.
 *
 * @module   ai-studio/AIConfidenceCalibration
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIConfidenceCalibration component */
export interface AIConfidenceCalibrationProps {
  bins: { minConfidence: number; maxConfidence: number; accuracy: number; count: number }[];
  eceScore: number;
}

/**
 * AIConfidenceCalibration
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIConfidenceCalibration: React.FC<AIConfidenceCalibrationProps> = ({
  bins,
  eceScore,
}) => {
  return (
    <div className="tf-ai-confidence-calibration">
      <div className="tf-ai-confidence-calibration__header">
        <h4 className="tf-ai-confidence-calibration__title">Calibration</h4>
        <span className="tf-ai-confidence-calibration__ece" title="Expected Calibration Error">
          ECE: {eceScore.toFixed(4)}
        </span>
      </div>
      <div className="tf-ai-confidence-calibration__chart">
        <div className="tf-ai-confidence-calibration__ideal" />
        {bins.map((bin, i) => (
          <div key={i} className="tf-ai-confidence-calibration__bin">
            <div className="tf-ai-confidence-calibration__bar-group">
              <div
                className="tf-ai-confidence-calibration__accuracy"
                style={{ height: `${bin.accuracy * 100}%` }}
                title={`Accuracy: ${(bin.accuracy * 100).toFixed(1)}%`}
              />
              <div
                className="tf-ai-confidence-calibration__confidence"
                style={{ height: `${((bin.minConfidence + bin.maxConfidence) / 2) * 100}%` }}
                title={`Avg Confidence: ${(((bin.minConfidence + bin.maxConfidence) / 2) * 100).toFixed(1)}%`}
              />
            </div>
            <span className="tf-ai-confidence-calibration__range">
              {(bin.minConfidence * 100).toFixed(0)}-{(bin.maxConfidence * 100).toFixed(0)}%
            </span>
            <span className="tf-ai-confidence-calibration__count">n={bin.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIConfidenceCalibration;
