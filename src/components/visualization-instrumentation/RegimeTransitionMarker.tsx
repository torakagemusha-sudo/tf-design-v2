import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { RegimePeriod } from './types';

/**
 * Props for RegimeTransitionMarker component.
 *
 * @public
 */
export interface RegimeTransitionMarkerProps {
  timestamp: number;
  fromRegime: string;
  toRegime: string;
  reason?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Visual marker indicating a regime change event on a chart or timeline.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <RegimeTransitionMarker />
 * ```
 */
const RegimeTransitionMarker: React.FC<RegimeTransitionMarkerProps> = ({
  timestamp, fromRegime, toRegime, reason, onClick, className
}) => {
  return (
    <div className={`tf-regime-transition-marker ${className || ''}`} onClick={onClick}>
      <div className="tf-regime-transition-marker__line" />
      <div className="tf-regime-transition-marker__badge">
        <span className="tf-regime-transition-marker__from">{fromRegime}</span>
        <span className="tf-regime-transition-marker__arrow">&#8594;</span>
        <span className="tf-regime-transition-marker__to">{toRegime}</span>
      </div>
      <span className="tf-regime-transition-marker__time">{new Date(timestamp).toLocaleTimeString()}</span>
      {reason && <span className="tf-regime-transition-marker__reason">{reason}</span>}
    </div>
  );
};

export default RegimeTransitionMarker;
