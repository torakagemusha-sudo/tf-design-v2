import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for DialLabel component.
 *
 * @public
 */
export interface DialLabelProps {
  text: string;
  position?: 'top' | 'bottom';
  className?: string;
}

/**
 * Label positioned around a dial face for units or descriptions.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <DialLabel />
 * ```
 */
const DialLabel: React.FC<DialLabelProps> = ({
  text, position?, className?
}}) => {
  return (
    <text
      x={50} y={position === 'top' ? 25 : 80}
      className={`tf-dial-label ${className || ''}`}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {text}
    </text>
  );
};

export default DialLabel;
