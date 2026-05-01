import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for ForecastLine component.
 *
 * @public
 */
export interface ForecastLineProps {
  historical: number[];
  forecast: number[];
  timestamps?: number[];
  confidence?: [number, number][];
  color?: string;
  className?: string;
}

/**
 * Forecast projection line extending historical data into the future.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ForecastLine />
 * ```
 */
const ForecastLine: React.FC<ForecastLineProps> = ({
  historical, forecast, timestamps?, confidence?, color?, className?
}}) => {
  const allData = [...historical, ...forecast];
  const maxVal = Math.max(...allData);
  const minVal = Math.min(...allData);
  const range = maxVal - minVal || 1;

  return (
    <div className={`tf-forecast-line ${className || ''}`}>
      <svg className="tf-forecast-line__svg" viewBox="0 0 600 200">
        <line x1={(historical.length / allData.length) * 600} y1={0} x2={(historical.length / allData.length) * 600} y2={200} className="tf-forecast-line__divider" />
        <polyline
          fill="none"
          points={historical.map((v, i) => `${(i / allData.length) * 600},${200 - ((v - minVal) / range) * 200}`).join(' ')}
          className="tf-forecast-line__historical"
          style={{ stroke: color || '#0ea5e9' }}
        />
        <polyline
          fill="none"
          points={forecast.map((v, i) => `${((historical.length + i) / allData.length) * 600},${200 - ((v - minVal) / range) * 200}`).join(' ')}
          className="tf-forecast-line__projection"
          style={{ stroke: color || '#0ea5e9', strokeDasharray: '4,4' }}
        />
      </svg>
    </div>
  );
};

export default ForecastLine;
