import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for AnomalyDetector component.
 *
 * @public
 */
export interface AnomalyDetectorProps {
  data: number[];
  threshold?: number;
  method?: 'zscore' | 'iqr' | 'threshold';
  onAnomalyDetected?: (indices: number[]) => void;
  className?: string;
}

/**
 * Anomaly detection indicator highlighting statistically anomalous data points.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <AnomalyDetector />
 * ```
 */
const AnomalyDetector: React.FC<AnomalyDetectorProps> = ({
  data, threshold, method, onAnomalyDetected, className
}) => {
  const anomalies = useMemo(() => {
    if (method === 'threshold' && threshold !== undefined) {
      return data.map((v, i) => Math.abs(v) > threshold ? i : -1).filter((i) => i >= 0);
    }
    if (method === 'zscore') {
      const mean = data.reduce((s, v) => s + v, 0) / data.length;
      const std = Math.sqrt(data.reduce((s, v) => s + (v - mean) ** 2, 0) / data.length);
      return data.map((v, i) => Math.abs((v - mean) / std) > (threshold || 2) ? i : -1).filter((i) => i >= 0);
    }
    return [];
  }, [data, threshold, method]);

  useEffect(() => {
    onAnomalyDetected?.(anomalies);
  }, [anomalies, onAnomalyDetected]);

  return (
    <div className={`tf-anomaly-detector ${className || ''}`}>
      <div className="tf-anomaly-detector__summary">
        <span className="tf-anomaly-detector__count">{anomalies.length}</span>
        <span className="tf-anomaly-detector__label">anomalies detected</span>
      </div>
      <div className="tf-anomaly-detector__points">
        {data.map((v, i) => (
          <span key={i} className={`tf-anomaly-detector__point ${anomalies.includes(i) ? 'tf-anomaly-detector__point--anomaly' : ''}`}>
            {v.toFixed(1)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnomalyDetector;
