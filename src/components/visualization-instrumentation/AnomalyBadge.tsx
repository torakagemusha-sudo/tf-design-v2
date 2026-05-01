import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for AnomalyBadge component.
 *
 * @public
 */
export interface AnomalyBadgeProps {
  severity: 'low' | 'medium' | 'high' | 'critical';
  count?: number;
  label?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Compact badge indicating anomalous status for a data point or metric.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <AnomalyBadge />
 * ```
 */
const AnomalyBadge: React.FC<AnomalyBadgeProps> = ({
  severity, count?, label?, onClick?, className?
}}) => {
  return (
    <span
      className={`tf-anomaly-badge tf-anomaly-badge--${severity} ${className || ''}`}
      onClick={onClick}
      role="status"
    >
      <span className="tf-anomaly-badge__icon">&#9888;</span>
      {label && <span className="tf-anomaly-badge__label">{label}</span>}
      {count !== undefined && <span className="tf-anomaly-badge__count">{count}</span>}
    </span>
  );
};

export default AnomalyBadge;
