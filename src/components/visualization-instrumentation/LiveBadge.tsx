import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for LiveBadge component.
 *
 * @public
 */
export interface LiveBadgeProps {
  label?: string;
  pulse?: boolean;
  color?: string;
  className?: string;
}

/**
 * Animated badge indicating live or actively updating data stream.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <LiveBadge />
 * ```
 */
const LiveBadge: React.FC<LiveBadgeProps> = ({
  label, pulse, color, className
}) => {
  return (
    <span className={`tf-live-badge ${pulse ? 'tf-live-badge--pulse' : ''} ${className || ''}`}>
      <span className="tf-live-badge__dot" style={{ backgroundColor: color || '#22c55e' }} />
      <span className="tf-live-badge__text">{label || 'LIVE'}</span>
    </span>
  );
};

export default LiveBadge;
