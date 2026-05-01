import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { WaterfallBar } from './types';

/**
 * Props for WaterfallBar component.
 *
 * @public
 */
export interface WaterfallBarProps {
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  showValue?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Individual bar in a waterfall chart representing a value change.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <WaterfallBar />
 * ```
 */
const WaterfallBar: React.FC<WaterfallBarProps> = ({
  value, x, y, width, height, color?, showValue?, onClick?, className?
}}) => {
  return (
    <g className={`tf-waterfall-bar ${className || ''}`} onClick={onClick}>
      <rect x={x} y={y} width={width} height={height} className={`tf-waterfall-bar__rect ${value >= 0 ? 'tf-waterfall-bar__rect--positive' : 'tf-waterfall-bar__rect--negative'}`} style={{ fill: color || (value >= 0 ? '#22c55e' : '#ef4444') }} />
      {showValue && <text x={x + width / 2} y={y - 5} className="tf-waterfall-bar__value" textAnchor="middle">{value >= 0 ? '+' : ''}{value.toFixed(1)}</text>}
    </g>
  );
};

export default WaterfallBar;
