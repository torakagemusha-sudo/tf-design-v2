import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for BulletBar component.
 *
 * @public
 */
export interface BulletBarProps {
  value: number;
  maxValue: number;
  width?: number;
  color?: string;
  className?: string;
}

/**
 * Primary measure bar in a bullet chart.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BulletBar />
 * ```
 */
const BulletBar: React.FC<BulletBarProps> = ({
  value, maxValue, width, color, className
}) => {
  const w = width || 100;
  const pct = Math.min(100, (value / maxValue) * 100);

  return (
    <div className={`tf-bullet-bar ${className || ''}`} style={{ width: w }}>
      <div className="tf-bullet-bar__track">
        <div className="tf-bullet-bar__fill" style={{ width: `${pct}%`, backgroundColor: color || '#0ea5e9' }} />
      </div>
      <span className="tf-bullet-bar__value">{value.toFixed(1)}</span>
    </div>
  );
};

export default BulletBar;
