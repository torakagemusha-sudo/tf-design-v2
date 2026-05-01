import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for RealtimeIndicator component.
 *
 * @public
 */
export interface RealtimeIndicatorProps {
  status: 'connected' | 'disconnected' | 'reconnecting' | 'error';
  lastUpdate?: number;
  latency?: number;
  className?: string;
}

/**
 * Visual indicator showing real-time data stream status with pulse animation.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <RealtimeIndicator />
 * ```
 */
const RealtimeIndicator: React.FC<RealtimeIndicatorProps> = ({
  status, lastUpdate?, latency?, className?
}}) => {
  return (
    <div className={`tf-realtime-indicator tf-realtime-indicator--${status} ${className || ''}`}>
      <span className="tf-realtime-indicator__dot" />
      <span className="tf-realtime-indicator__status">
        {status === 'connected' ? 'Live' : status === 'disconnected' ? 'Offline' : status === 'reconnecting' ? 'Reconnecting...' : 'Error'}
      </span>
      {lastUpdate && (
        <span className="tf-realtime-indicator__last">{new Date(lastUpdate).toLocaleTimeString()}</span>
      )}
      {latency !== undefined && (
        <span className="tf-realtime-indicator__latency">{latency}ms</span>
      )}
    </div>
  );
};

export default RealtimeIndicator;
