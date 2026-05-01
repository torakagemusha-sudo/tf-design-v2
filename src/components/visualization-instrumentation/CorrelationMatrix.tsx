import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for CorrelationMatrix component.
 *
 * @public
 */
export interface CorrelationMatrixProps {
  variables: string[];
  matrix: number[][];
  onCellClick?: (i: number, j: number, value: number) => void;
  className?: string;
}

/**
 * Correlation heatmap matrix showing pairwise correlation coefficients between variables.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <CorrelationMatrix />
 * ```
 */
const CorrelationMatrix: React.FC<CorrelationMatrixProps> = ({
  variables, matrix, onCellClick?, className?
}}) => {
  const getColor = (v: number) => {
    if (v > 0) return `rgba(14, 165, 233, ${Math.abs(v)})`;
    if (v < 0) return `rgba(239, 68, 68, ${Math.abs(v)})`;
    return '#334155';
  };

  return (
    <div className={`tf-correlation-matrix ${className || ''}`}>
      <div className="tf-correlation-matrix__header">
        {variables.map((v, i) => <span key={i} className="tf-correlation-matrix__col-label">{v}</span>)}
      </div>
      {matrix.map((row, i) => (
        <div key={i} className="tf-correlation-matrix__row">
          <span className="tf-correlation-matrix__row-label">{variables[i]}</span>
          {row.map((cell, j) => (
            <div key={j} className="tf-correlation-matrix__cell" style={{ backgroundColor: getColor(cell) }} onClick={() => onCellClick?.(i, j, cell)}>
              {cell.toFixed(2)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CorrelationMatrix;
