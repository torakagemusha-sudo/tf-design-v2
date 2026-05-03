import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { TimeRange, RegimePeriod } from './types';

/**
 * Props for RegimeTimeline component.
 *
 * @public
 */
export interface RegimeTimelineProps {
  regimes: RegimePeriod[];
  timeRange: TimeRange;
  onSelectRegime?: (regime: RegimePeriod) => void;
  height?: number;
  className?: string;
}

/**
 * Horizontal timeline visualization showing regime history and transitions over time.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <RegimeTimeline />
 * ```
 */
const RegimeTimeline: React.FC<RegimeTimelineProps> = ({
  regimes, timeRange, onSelectRegime, height, className
}) => {
  const totalDuration = timeRange.end - timeRange.start;
  const h = height || 60;

  return (
    <div className={`tf-regime-timeline ${className || ''}`}>
      <svg className="tf-regime-timeline__svg" viewBox={`0 0 800 ${h}`}>
        {regimes.map((r, i) => {
          const x1 = ((r.start - timeRange.start) / totalDuration) * 800;
          const x2 = ((r.end - timeRange.start) / totalDuration) * 800;
          return (
            <g key={i} className={`tf-regime-timeline__segment tf-regime-timeline__segment--${r.type}`} onClick={() => onSelectRegime?.(r)}>
              <rect x={x1} y={0} width={x2 - x1} height={h} className="tf-regime-timeline__bar" />
              {x2 - x1 > 60 && <text x={(x1 + x2) / 2} y={h / 2 + 5} className="tf-regime-timeline__label">{r.label}</text>}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default RegimeTimeline;
