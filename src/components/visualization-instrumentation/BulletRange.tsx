import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { BulletRange } from './types';

/**
 * Props for BulletRange component.
 *
 * @public
 */
export interface BulletRangeProps {
  min: number;
  max: number;
  maxValue: number;
  qualitative: 'poor' | 'satisfactory' | 'good';
  className?: string;
}

/**
 * Qualitative range band on a bullet chart (poor, satisfactory, good).
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BulletRange />
 * ```
 */
const BulletRange: React.FC<BulletRangeProps> = ({
  min, max, maxValue, qualitative, className
}) => {
  const left = (min / maxValue) * 100;
  const width = ((max - min) / maxValue) * 100;

  return (
    <div
      className={`tf-bullet-range tf-bullet-range--${qualitative} ${className || ''}`}
      style={{ left: `${left}%`, width: `${width}%` }}
    />
  );
};

export default BulletRange;
