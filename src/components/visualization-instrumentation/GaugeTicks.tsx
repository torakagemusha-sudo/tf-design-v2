import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for GaugeTicks component.
 *
 * @public
 */
export interface GaugeTicksProps {
  count: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  majorInterval?: number;
  tickLength?: number;
  className?: string;
}

/**
 * Tick marks arranged around a gauge arc with major and minor tick variants.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <GaugeTicks />
 * ```
 */
const GaugeTicks: React.FC<GaugeTicksProps> = ({
  count, radius, startAngle, endAngle, majorInterval?, tickLength?, className?
}}) => {
  const ticks = [...Array(count)].map((_, i) => {
    const angle = startAngle + (i / (count - 1)) * (endAngle - startAngle);
    const isMajor = majorInterval ? i % majorInterval === 0 : false;
    const len = isMajor ? (tickLength || 8) : (tickLength || 4);
    const rad = (angle - 90) * Math.PI / 180;
    const x1 = 50 + (radius - len) * Math.cos(rad);
    const y1 = 50 + (radius - len) * Math.sin(rad);
    const x2 = 50 + radius * Math.cos(rad);
    const y2 = 50 + radius * Math.sin(rad);
    return { x1, y1, x2, y2, isMajor, angle };
  });

  return (
    <g className={`tf-gauge-ticks ${className || ''}`}>
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} className={`tf-gauge-ticks__tick ${t.isMajor ? 'tf-gauge-ticks__tick--major' : ''}`} />
      ))}
    </g>
  );
};

export default GaugeTicks;
