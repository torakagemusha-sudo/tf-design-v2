import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { WeightedGeoPoint } from './types';

/**
 * Props for MapHeatmapLayer component.
 *
 * @public
 */
export interface MapHeatmapLayerProps {
  points: WeightedGeoPoint[];
  radius?: number;
  blur?: number;
  maxIntensity?: number;
  gradient?: string[];
  opacity?: number;
  className?: string;
}

/**
 * Heatmap overlay layer for map visualizations showing intensity gradients over geographic areas.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MapHeatmapLayer />
 * ```
 */
const MapHeatmapLayer: React.FC<MapHeatmapLayerProps> = ({
  points, radius, blur, maxIntensity, gradient, opacity, className
}) => {
  return (
    <div className={`tf-map-heatmap-layer ${className || ''}`} style={{ opacity: opacity || 0.7 }}>
      <svg className="tf-map-heatmap-layer__svg" viewBox="0 0 800 600">
        <defs>
          <radialGradient id="heatmapGrad">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
          </radialGradient>
        </defs>
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={radius || 30}
            className="tf-map-heatmap-layer__point"
            fill="url(#heatmapGrad)"
            opacity={p.weight / (maxIntensity || 1)}
          />
        ))}
      </svg>
    </div>
  );
};

export default MapHeatmapLayer;
