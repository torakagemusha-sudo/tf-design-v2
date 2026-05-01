import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for DataAgeIndicator component.
 *
 * @public
 */
export interface DataAgeIndicatorProps {
  timestamp: number;
  maxAge?: number;
  formatter?: (age: number) => string;
  className?: string;
}

/**
 * Indicator showing how fresh or stale the displayed data is.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <DataAgeIndicator />
 * ```
 */
const DataAgeIndicator: React.FC<DataAgeIndicatorProps> = ({
  timestamp, maxAge?, formatter?, className?
}}) => {
  const age = Date.now() - timestamp;
  const max = maxAge || 300000;
  const status = age < max * 0.3 ? 'fresh' : age < max * 0.7 ? 'aging' : 'stale';

  return (
    <span className={`tf-data-age-indicator tf-data-age-indicator--${status} ${className || ''}`}>
      <span className="tf-data-age-indicator__dot" />
      <span className="tf-data-age-indicator__text">
        {formatter ? formatter(age) : age < 60000 ? `${Math.floor(age / 1000)}s ago` : `${Math.floor(age / 60000)}m ago`}
      </span>
    </span>
  );
};

export default DataAgeIndicator;
