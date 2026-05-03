import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for TrendArrow component.
 *
 * @public
 */
export interface TrendArrowProps {
  direction: 'up' | 'down' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

/**
 * Up, down, or flat trend arrow indicator with color coding.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <TrendArrow />
 * ```
 */
const TrendArrow: React.FC<TrendArrowProps> = ({
  direction, size, color, className
}) => {
  const arrowMap = { up: '&#9650;', down: '&#9660;', flat: '&#9644;' };

  return (
    <span className={`tf-trend-arrow tf-trend-arrow--${direction} tf-trend-arrow--${size || 'md'} ${className || ''}`} style={{ color: color || undefined }}>
      {arrowMap[direction]}
    </span>
  );
};

export default TrendArrow;
