import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { DataPoint } from './types';

/**
 * Props for TelemetryChartPan component.
 *
 * @public
 */
export interface TelemetryChartPanProps {
  offset: number;
  maxOffset: number;
  step?: number;
  onPan: (offset: number) => void;
  className?: string;
}

/**
 * Pan controls for navigating horizontally across telemetry chart data.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <TelemetryChartPan />
 * ```
 */
const TelemetryChartPan: React.FC<TelemetryChartPanProps> = ({
  offset, maxOffset, step?, onPan, className?
}}) => {
  return (
    <div className={`tf-telemetry-chart-pan ${className || ''}`}>
      <button
        onClick={() => onPan(Math.max(0, offset - (step || 50)))}
        disabled={offset <= 0}
        className="tf-telemetry-chart-pan__btn tf-telemetry-chart-pan__btn--left"
        aria-label="Pan left"
      >
        &#8592;
      </button>
      <div className="tf-telemetry-chart-pan__track">
        <div
          className="tf-telemetry-chart-pan__thumb"
          style={{ left: `${(offset / maxOffset) * 100}%` }}
        />
      </div>
      <button
        onClick={() => onPan(Math.min(maxOffset, offset + (step || 50)))}
        disabled={offset >= maxOffset}
        className="tf-telemetry-chart-pan__btn tf-telemetry-chart-pan__btn--right"
        aria-label="Pan right"
      >
        &#8594;
      </button>
      <span className="tf-telemetry-chart-pan__offset">{Math.round(offset)} px</span>
    </div>
  );
};

export default TelemetryChartPan;
