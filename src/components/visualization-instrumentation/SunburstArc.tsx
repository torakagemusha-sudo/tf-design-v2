import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { SunburstNode } from './types';

/**
 * Props for SunburstArc component.
 *
 * @public
 */
export interface SunburstArcProps {
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
  color: string;
  label?: string;
  cx?: number;
  cy?: number;
  className?: string;
}

/**
 * Individual arc segment in a sunburst chart.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <SunburstArc />
 * ```
 */
const SunburstArc: React.FC<SunburstArcProps> = ({
  startAngle, endAngle, innerRadius, outerRadius, color, label?, cx?, cy?, className?
}}) => {
  const cx0 = cx || 50;
  const cy0 = cy || 50;
  const sRad = (startAngle * Math.PI) / 180;
  const eRad = (endAngle * Math.PI) / 180;
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const x1 = cx0 + innerRadius * Math.cos(sRad);
  const y1 = cy0 + innerRadius * Math.sin(sRad);
  const x2 = cx0 + outerRadius * Math.cos(sRad);
  const y2 = cy0 + outerRadius * Math.sin(sRad);
  const x3 = cx0 + outerRadius * Math.cos(eRad);
  const y3 = cy0 + outerRadius * Math.sin(eRad);
  const x4 = cx0 + innerRadius * Math.cos(eRad);
  const y4 = cy0 + innerRadius * Math.sin(eRad);
  const d = `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}`;

  return (
    <path
      d={d}
      className={`tf-sunburst-arc ${className || ''}`}
      style={{ fill: color }}
    />
  );
};

export default SunburstArc;
