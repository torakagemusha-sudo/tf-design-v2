import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for CorrelationCell component.
 *
 * @public
 */
export interface CorrelationCellProps {
  value: number;
  variableX: string;
  variableY: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Individual cell in a correlation matrix with color-coded coefficient.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <CorrelationCell />
 * ```
 */
const CorrelationCell: React.FC<CorrelationCellProps> = ({
  value, variableX, variableY, onClick?, className?
}}) => {
  const getColor = () => {
    if (value > 0) return `rgba(14, 165, 233, ${Math.abs(value)})`;
    if (value < 0) return `rgba(239, 68, 68, ${Math.abs(value)})`;
    return '#334155';
  };

  return (
    <div
      className={`tf-correlation-cell ${className || ''}`}
      style={{ backgroundColor: getColor() }}
      onClick={onClick}
      title={`${variableX} vs ${variableY}: ${value.toFixed(3)}`}
    >
      {value.toFixed(2)}
    </div>
  );
};

export default CorrelationCell;
