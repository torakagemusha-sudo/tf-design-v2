import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for SampleSizeIndicator component.
 *
 * @public
 */
export interface SampleSizeIndicatorProps {
  current: number;
  recommended: number;
  minimum?: number;
  showBar?: boolean;
  className?: string;
}

/**
 * Statistical sample size indicator with adequacy visualization.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <SampleSizeIndicator />
 * ```
 */
const SampleSizeIndicator: React.FC<SampleSizeIndicatorProps> = ({
  current, recommended, minimum?, showBar?, className?
}}) => {
  const pct = Math.min(100, (current / recommended) * 100);
  const status = current >= recommended ? 'adequate' : current >= (minimum || recommended * 0.5) ? 'partial' : 'insufficient';

  return (
    <div className={`tf-sample-size-indicator tf-sample-size-indicator--${status} ${className || ''}`}>
      <span className="tf-sample-size-indicator__count">n={current.toLocaleString()}</span>
      {showBar && (
        <div className="tf-sample-size-indicator__bar">
          <div className="tf-sample-size-indicator__fill" style={{ width: `${pct}%` }} />
        </div>
      )}
      <span className="tf-sample-size-indicator__target">/ {recommended.toLocaleString()}</span>
    </div>
  );
};

export default SampleSizeIndicator;
