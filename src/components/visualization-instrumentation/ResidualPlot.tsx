import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for ResidualPlot component.
 *
 * @public
 */
export interface ResidualPlotProps {
  predicted: number[];
  residuals: number[];
  width?: number;
  height?: number;
  showZeroLine?: boolean;
  className?: string;
}

/**
 * Residual analysis plot for evaluating model fit quality.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ResidualPlot />
 * ```
 */
const ResidualPlot: React.FC<ResidualPlotProps> = ({
  predicted, residuals, width, height, showZeroLine, className
}) => {
  const w = width || 400;
  const h = height || 300;
  const padding = 40;
  const minP = Math.min(...predicted);
  const maxP = Math.max(...predicted);
  const minR = Math.min(...residuals);
  const maxR = Math.max(...residuals);

  return (
    <div className={`tf-residual-plot ${className || ''}`}>
      <svg className="tf-residual-plot__svg" viewBox={`0 0 ${w} ${h}`}>
        {showZeroLine !== false && (
          <line x1={padding} y1={h / 2} x2={w - padding} y2={h / 2} className="tf-residual-plot__zero" />
        )}
        {predicted.map((p, i) => (
          <circle key={i} cx={padding + ((p - minP) / (maxP - minP || 1)) * (w - padding * 2)} cy={h / 2 - ((residuals[i] - minR) / (maxR - minR || 1) - 0.5) * (h - padding * 2)} r={3} className="tf-residual-plot__point" />
        ))}
      </svg>
    </div>
  );
};

export default ResidualPlot;
