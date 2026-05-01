import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for MapTooltip component.
 *
 * @public
 */
export interface MapTooltipProps {
  content: React.ReactNode;
  visible: boolean;
  x: number;
  y: number;
  title?: string;
  className?: string;
}

/**
 * Tooltip displayed when hovering over map markers and regions with contextual data.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MapTooltip />
 * ```
 */
const MapTooltip: React.FC<MapTooltipProps> = ({
  content, visible, x, y, title?, className?
}}) => {
  if (!visible) return null;

  return (
    <div className={`tf-map-tooltip ${className || ''}`} style={{ left: x, top: y }}>
      {title && <div className="tf-map-tooltip__title">{title}</div>}
      <div className="tf-map-tooltip__content">{content}</div>
    </div>
  );
};

export default MapTooltip;
