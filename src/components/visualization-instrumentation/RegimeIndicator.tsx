import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { RegimeState } from './types';

/**
 * Props for RegimeIndicator component.
 *
 * @public
 */
export interface RegimeIndicatorProps {
  regime: RegimeState;
  showMetadata?: boolean;
  showConfidence?: boolean;
  className?: string;
}

/**
 * Displays the currently active operational regime with visual state indicators and metadata.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <RegimeIndicator />
 * ```
 */
const RegimeIndicator: React.FC<RegimeIndicatorProps> = ({
  regime, showMetadata?, showConfidence?, className?
}}) => {
  return (
    <div className={`tf-regime-indicator tf-regime-indicator--${regime.type} ${className || ''}`}>
      <div className="tf-regime-indicator__header">
        <span className={`tf-regime-indicator__badge tf-regime-indicator__badge--${regime.type}`}>{regime.label}</span>
        {regime.since && <span className="tf-regime-indicator__since">Since {new Date(regime.since).toLocaleString()}</span>}
      </div>
      {showConfidence && regime.confidence !== undefined && (
        <div className="tf-regime-indicator__confidence">
          <div className="tf-regime-indicator__confidence-bar" style={{ width: `${regime.confidence * 100}%` }} />
          <span className="tf-regime-indicator__confidence-label">{Math.round(regime.confidence * 100)}% confidence</span>
        </div>
      )}
      {showMetadata && regime.metadata && (
        <dl className="tf-regime-indicator__metadata">
          {Object.entries(regime.metadata).map(([key, value]) => (
            <div key={key} className="tf-regime-indicator__meta-row">
              <dt className="tf-regime-indicator__meta-key">{key}</dt>
              <dd className="tf-regime-indicator__meta-value">{String(value)}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
};

export default RegimeIndicator;
