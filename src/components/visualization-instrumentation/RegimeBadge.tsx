import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for RegimeBadge component.
 *
 * @public
 */
export interface RegimeBadgeProps {
  regime: string;
  type: 'normal' | 'warning' | 'critical' | 'standby' | 'maintenance';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

/**
 * Compact regime label badge for inline display within tables, cards, and lists.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <RegimeBadge />
 * ```
 */
const RegimeBadge: React.FC<RegimeBadgeProps> = ({
  regime, type, size?, pulse?, className?
}}) => {
  return (
    <span className={`tf-regime-badge tf-regime-badge--${type} tf-regime-badge--${size || 'md'} ${pulse ? 'tf-regime-badge--pulse' : ''} ${className || ''}`}>
      <span className="tf-regime-badge__dot" />
      <span className="tf-regime-badge__label">{regime}</span>
    </span>
  );
};

export default RegimeBadge;
