import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for GaugeLabel component.
 *
 * @public
 */
export interface GaugeLabelProps {
  angle: number;
  radius: number;
  text: string;
  fontSize?: number;
  color?: string;
  className?: string;
}

/**
 * Label positioned on a gauge arc displaying tick values or zone descriptions.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <GaugeLabel />
 * ```
 */
const GaugeLabel: React.FC<GaugeLabelProps> = ({
  angle, radius, text, fontSize, color, className
}) => {
  const rad = (angle - 90) * Math.PI / 180;
  const x = 50 + radius * Math.cos(rad);
  const y = 50 + radius * Math.sin(rad);

  return (
    <text
      x={x} y={y}
      className={`tf-gauge-label ${className || ''}`}
      style={{ fill: color || '#94a3b8', fontSize: fontSize || 10 }}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {text}
    </text>
  );
};

export default GaugeLabel;
