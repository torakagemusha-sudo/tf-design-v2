import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for DialPointer component.
 *
 * @public
 */
export interface DialPointerProps {
  angle: number;
  length?: number;
  color?: string;
  width?: number;
  className?: string;
}

/**
 * Pointer indicator for rotary dial controls showing current position.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <DialPointer />
 * ```
 */
const DialPointer: React.FC<DialPointerProps> = ({
  angle, length?, color?, width?, className?
}}) => {
  const rad = (angle - 90) * Math.PI / 180;
  const x2 = 50 + (length || 35) * Math.cos(rad);
  const y2 = 50 + (length || 35) * Math.sin(rad);

  return (
    <line x1={50} y1={50} x2={x2} y2={y2} className={`tf-dial-pointer ${className || ''}`} style={{ stroke: color || '#e2e8f0', strokeWidth: width || 3, strokeLinecap: 'round' }} />
  );
};

export default DialPointer;
