import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { MapMarkerData } from './types';

/**
 * Props for MapCluster component.
 *
 * @public
 */
export interface MapClusterProps {
  count: number;
  position: GeoPoint;
  markers: MapMarkerData[];
  onExpand?: () => void;
  onClick?: () => void;
  maxZoom?: number;
  className?: string;
}

/**
 * Clustered map markers that aggregate nearby points into a single clickable group.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MapCluster />
 * ```
 */
const MapCluster: React.FC<MapClusterProps> = ({
  count, position, markers, onExpand?, onClick?, maxZoom?, className?
}}) => {
  const getClusterSize = () => {
    if (count < 10) return 'sm';
    if (count < 100) return 'md';
    return 'lg';
  };

  return (
    <div
      className={`tf-map-cluster tf-map-cluster--${getClusterSize()} ${className || ''}`}
      onClick={onClick}
      role="button"
    >
      <div className="tf-map-cluster__ring" />
      <div className="tf-map-cluster__center">
        <span className="tf-map-cluster__count">{count}</span>
      </div>
      {onExpand && (
        <button className="tf-map-cluster__expand" onClick={(e) => { e.stopPropagation(); onExpand(); }}>
          +
        </button>
      )}
    </div>
  );
};

export default MapCluster;
