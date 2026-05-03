import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { MapLegendItem } from './types';

/**
 * Props for MapLegend component.
 *
 * @public
 */
export interface MapLegendProps {
  items: MapLegendItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

/**
 * Legend for map overlay layers explaining symbols, colors, and data representations.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MapLegend />
 * ```
 */
const MapLegend: React.FC<MapLegendProps> = ({
  items, collapsible, defaultCollapsed, className
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed || false);

  return (
    <div className={`tf-map-legend ${collapsed ? 'tf-map-legend--collapsed' : ''} ${className || ''}`}>
      {collapsible && (
        <button className="tf-map-legend__toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? 'Show Legend' : 'Hide Legend'}
        </button>
      )}
      {!collapsed && (
        <div className="tf-map-legend__items">
          {items.map((item, i) => (
            <div key={i} className="tf-map-legend__item">
              <span className="tf-map-legend__symbol" style={{ backgroundColor: item.color }}>{item.symbol}</span>
              <span className="tf-map-legend__label">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapLegend;
