import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { FunnelStage } from './types';

/**
 * Props for FunnelStage component.
 *
 * @public
 */
export interface FunnelStageProps {
  label: string;
  value: number;
  color?: string;
  conversionRate?: number;
  className?: string;
}

/**
 * Individual stage within a funnel chart.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <FunnelStage />
 * ```
 */
const FunnelStage: React.FC<FunnelStageProps> = ({
  label, value, color, conversionRate, className
}) => {
  return (
    <div className={`tf-funnel-stage ${className || ''}`}>
      <span className="tf-funnel-stage__label">{label}</span>
      <span className="tf-funnel-stage__value">{value.toLocaleString()}</span>
      {conversionRate !== undefined && <span className="tf-funnel-stage__rate">{conversionRate.toFixed(1)}%</span>}
      <div className="tf-funnel-stage__bar" style={{ width: `${Math.min(100, (value / 1000) * 100)}%`, backgroundColor: color || '#0ea5e9' }} />
    </div>
  );
};

export default FunnelStage;
