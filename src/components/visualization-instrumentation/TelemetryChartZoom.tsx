import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { DataPoint } from './types';

/**
 * Props for TelemetryChartZoom component.
 *
 * @public
 */
export interface TelemetryChartZoomProps {
  level: number;
  minLevel?: number;
  maxLevel?: number;
  presets?: number[];
  onZoom: (level: number) => void;
  onReset?: () => void;
  className?: string;
}

/**
 * Zoom controls for telemetry chart with preset zoom levels and custom range input.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <TelemetryChartZoom />
 * ```
 */
const TelemetryChartZoom: React.FC<TelemetryChartZoomProps> = ({
  level, minLevel, maxLevel, presets, onZoom, onReset, className
}) => {
  return (
    <div className={`tf-telemetry-chart-zoom ${className || ''}`}>
      <div className="tf-telemetry-chart-zoom__controls">
        <button onClick={() => onZoom(Math.max(minLevel || 0.1, level - 0.25))} className="tf-telemetry-chart-zoom__btn tf-telemetry-chart-zoom__btn--out" aria-label="Zoom out">-</button>
        <span className="tf-telemetry-chart-zoom__level">{Math.round(level * 100)}%</span>
        <button onClick={() => onZoom(Math.min(maxLevel || 4, level + 0.25))} className="tf-telemetry-chart-zoom__btn tf-telemetry-chart-zoom__btn--in" aria-label="Zoom in">+</button>
      </div>
      {presets && (
        <div className="tf-telemetry-chart-zoom__presets">
          {presets.map((p) => (
            <button key={p} onClick={() => onZoom(p)} className={`tf-telemetry-chart-zoom__preset ${level === p ? 'tf-telemetry-chart-zoom__preset--active' : ''}`}>
              {Math.round(p * 100)}%
            </button>
          ))}
        </div>
      )}
      {onReset && (
        <button onClick={onReset} className="tf-telemetry-chart-zoom__reset">Reset</button>
      )}
    </div>
  );
};

export default TelemetryChartZoom;
