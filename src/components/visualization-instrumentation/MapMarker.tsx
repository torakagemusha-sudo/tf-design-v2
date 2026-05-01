import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { GeoPoint } from './types';

/**
 * Props for MapMarker component.
 *
 * @public
 */
export interface MapMarkerProps {
  id: string;
  position: GeoPoint;
  label?: string;
  status?: 'normal' | 'warning' | 'critical' | 'info';
  icon?: React.ReactNode;
  popup?: React.ReactNode;
  onClick?: (id: string) => void;
  draggable?: boolean;
  className?: string;
}

/**
 * Individual data marker displayed on a map overlay with status and popup content.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MapMarker />
 * ```
 */
const MapMarker: React.FC<MapMarkerProps> = ({
  id, position, label?, status?, icon?, popup?, onClick?, draggable?, className?
}}) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`tf-map-marker tf-map-marker--${status || 'normal'} ${className || ''}`}
      onClick={() => { onClick?.(id); setShowPopup(!showPopup); }}
      role="button"
      aria-label={`Marker ${label || id}`}
    >
      <div className="tf-map-marker__pin">
        {icon || <span className="tf-map-marker__default-icon" />}
      </div>
      {label && <span className="tf-map-marker__label">{label}</span>}
      {popup && showPopup && (
        <div className="tf-map-marker__popup">
          {popup}
        </div>
      )}
    </div>
  );
};

export default MapMarker;
