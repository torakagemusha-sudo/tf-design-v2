import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for RefreshPill component.
 *
 * @public
 */
export interface RefreshPillProps {
  interval: number;
  lastRefresh?: number;
  onRefresh?: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Auto-refresh status pill showing countdown or refresh action.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <RefreshPill />
 * ```
 */
const RefreshPill: React.FC<RefreshPillProps> = ({
  interval, lastRefresh, onRefresh, disabled, className
}) => {
  const [countdown, setCountdown] = useState(interval);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { onRefresh?.(); return interval; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [interval, onRefresh]);

  return (
    <button className={`tf-refresh-pill ${disabled ? 'tf-refresh-pill--disabled' : ''} ${className || ''}`} onClick={onRefresh} disabled={disabled}>
      <span className="tf-refresh-pill__icon">&#x21bb;</span>
      <span className="tf-refresh-pill__count">{countdown}s</span>
    </button>
  );
};

export default RefreshPill;
