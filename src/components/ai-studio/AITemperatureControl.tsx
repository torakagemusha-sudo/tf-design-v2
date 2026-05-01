/**
 * ============================================================================
 * Torafirma Design System — AITemperatureControl
 * ============================================================================
 * AI-Assisted Studio component — AI TemperatureControl.
 *
 * @module   ai-studio/AITemperatureControl
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AITemperatureControl component */
export interface AITemperatureControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

/**
 * AITemperatureControl
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AITemperatureControl: React.FC<AITemperatureControlProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  disabled,
}) => {
  const minVal = min ?? 0;
  const maxVal = max ?? 2;

  return (
    <div className="tf-ai-temperature-control">
      <div className="tf-ai-temperature-control__header">
        <label className="tf-ai-temperature-control__label" htmlFor="ai-temperature">
          Temperature
        </label>
        <span className="tf-ai-temperature-control__value">{value.toFixed(2)}</span>
      </div>
      <input
        id="ai-temperature"
        type="range"
        className="tf-ai-temperature-control__slider"
        min={minVal}
        max={maxVal}
        step={step || 0.1}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        aria-valuemin={minVal}
        aria-valuemax={maxVal}
        aria-valuenow={value}
      />
      <div className="tf-ai-temperature-control__labels">
        <span className="tf-ai-temperature-control__label-min">Focused</span>
        <span className="tf-ai-temperature-control__label-max">Creative</span>
      </div>
    </div>
  );
};

export default AITemperatureControl;
