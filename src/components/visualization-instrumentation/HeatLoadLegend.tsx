import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for HeatLoadLegend component.
 *
 * @public
 */
export interface HeatLoadLegendProps {
  minValue: number;
  maxValue: number;
  colorScale?: string[];
  steps?: number;
  units?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Color gradient legend for heat load visualizations showing value-to-color mapping.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <HeatLoadLegend />
 * ```
 */
const HeatLoadLegend: React.FC<HeatLoadLegendProps> = ({
  minValue, maxValue, colorScale, steps, units, orientation, className
}) => {
  const stepsArr = [...Array(steps || 8)].map((_, i) => minValue + (i / ((steps || 8) - 1)) * (maxValue - minValue));
  const scale = colorScale || ['#0c4a6e', '#075985', '#0369a1', '#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'];

  return (
    <div className={`tf-heat-load-legend tf-heat-load-legend--${orientation || 'horizontal'} ${className || ''}`}>
      <span className="tf-heat-load-legend__min">{minValue.toFixed(1)} {units}</span>
      <div className="tf-heat-load-legend__gradient">
        {scale.map((color, i) => (
          <div key={i} className="tf-heat-load-legend__step" style={{ backgroundColor: color }} />
        ))}
      </div>
      <span className="tf-heat-load-legend__max">{maxValue.toFixed(1)} {units}</span>
    </div>
  );
};

export default HeatLoadLegend;
