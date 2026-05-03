import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for DialScale component.
 *
 * @public
 */
export interface DialScaleProps {
  min: number;
  max: number;
  ticks: number;
  startAngle: number;
  endAngle: number;
  radius?: number;
  className?: string;
}

/**
 * Scale markings around a dial face with tick marks and numeric labels.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <DialScale />
 * ```
 */
const DialScale: React.FC<DialScaleProps> = ({
  min, max, ticks, startAngle, endAngle, radius, className
}) => {
  const tickArr = [...Array(ticks)].map((_, i) => {
    const angle = startAngle + (i / (ticks - 1)) * (endAngle - startAngle);
    const value = min + (i / (ticks - 1)) * (max - min);
    return { angle, value };
  });

  return (
    <g className={`tf-dial-scale ${className || ''}`}>
      {tickArr.map((t, i) => {
        const rad = (t.angle - 90) * Math.PI / 180;
        const r = radius || 42;
        const x1 = 50 + (r - 6) * Math.cos(rad);
        const y1 = 50 + (r - 6) * Math.sin(rad);
        const x2 = 50 + r * Math.cos(rad);
        const y2 = 50 + r * Math.sin(rad);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className="tf-dial-scale__tick" />
            <text x={50 + (r - 14) * Math.cos(rad)} y={50 + (r - 14) * Math.sin(rad)} className="tf-dial-scale__label" textAnchor="middle" dominantBaseline="middle">{Math.round(t.value)}</text>
          </g>
        );
      })}
    </g>
  );
};

export default DialScale;
