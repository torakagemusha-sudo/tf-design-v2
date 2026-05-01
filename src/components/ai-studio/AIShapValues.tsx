/**
 * ============================================================================
 * Torafirma Design System — AIShapValues
 * ============================================================================
 * AI-Assisted Studio component — AI ShapValues.
 *
 * @module   ai-studio/AIShapValues
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIShapValues component */
export interface AIShapValuesProps {
  features: { name: string; value: number; baseValue: number; shapValue: number }[];
  baseValue: number;
  maxDisplay?: number;
}

/**
 * AIShapValues
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIShapValues: React.FC<AIShapValuesProps> = ({
  features,
  baseValue,
  maxDisplay,
}) => {
  const sorted = [...features].sort((a, b) => Math.abs(b.shapValue) - Math.abs(a.shapValue));
  const display = maxDisplay ? sorted.slice(0, maxDisplay) : sorted;
  const maxVal = Math.max(...display.map((f) => Math.abs(f.shapValue)));

  return (
    <div className="tf-ai-shap-values">
      <div className="tf-ai-shap-values__header">
        <h4 className="tf-ai-shap-values__title">SHAP Values</h4>
        <span className="tf-ai-shap-values__base">Base: {baseValue.toFixed(3)}</span>
      </div>
      <div className="tf-ai-shap-values__chart">
        {display.map((feature) => (
          <div key={feature.name} className="tf-ai-shap-values__row">
            <span className="tf-ai-shap-values__name">{feature.name}</span>
            <div className="tf-ai-shap-values__bar">
              <div
                className={`tf-ai-shap-values__fill tf-ai-shap-values__fill--${feature.shapValue >= 0 ? 'positive' : 'negative'}`}
                style={{
                  width: `${(Math.abs(feature.shapValue) / maxVal) * 100}%`,
                  marginLeft: feature.shapValue < 0 ? 'auto' : undefined,
                }}
              />
            </div>
            <span className={`tf-ai-shap-values__value tf-ai-shap-values__value--${feature.shapValue >= 0 ? 'positive' : 'negative'}`}>
              {feature.shapValue >= 0 ? '+' : ''}{feature.shapValue.toFixed(3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIShapValues;
