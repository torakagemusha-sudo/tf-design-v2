import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for BulletMarker component.
 *
 * @public
 */
export interface BulletMarkerProps {
  target: number;
  maxValue: number;
  className?: string;
}

/**
 * Comparative marker (target indicator) on a bullet chart.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BulletMarker />
 * ```
 */
const BulletMarker: React.FC<BulletMarkerProps> = ({
  target, maxValue, className
}) => {
  const pct = (target / maxValue) * 100;

  return (
    <div className={`tf-bullet-marker ${className || ''}`} style={{ left: `${pct}%` }}>
      <div className="tf-bullet-marker__line" />
      <span className="tf-bullet-marker__label">{target.toFixed(1)}</span>
    </div>
  );
};

export default BulletMarker;
