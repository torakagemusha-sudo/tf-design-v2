import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for KPICard component.
 *
 * @public
 */
export interface KPICardProps {
  title: string;
  value: number | string;
  target?: number;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: number;
  status?: 'on-track' | 'at-risk' | 'off-track' | 'exceeded';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Key performance indicator card with value, target, trend, and supporting context.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <KPICard />
 * ```
 */
const KPICard: React.FC<KPICardProps> = ({
  title, value, target?, unit?, trend?, trendValue?, status?, icon?, children?, className?
}}) => {
  return (
    <div className={`tf-kpi-card tf-kpi-card--${status || 'on-track'} ${className || ''}`}>
      <div className="tf-kpi-card__header">
        {icon && <span className="tf-kpi-card__icon">{icon}</span>}
        <span className="tf-kpi-card__title">{title}</span>
        <TrendArrow direction={trend || 'flat'} />
      </div>
      <div className="tf-kpi-card__body">
        <span className="tf-kpi-card__value">{typeof value === 'number' ? value.toLocaleString() : value}</span>
        {unit && <span className="tf-kpi-card__unit">{unit}</span>}
      </div>
      {target !== undefined && (
        <div className="tf-kpi-card__target">
          <div className="tf-kpi-card__target-bar">
            <div className="tf-kpi-card__target-fill" style={{ width: `${Math.min(100, (typeof value === 'number' ? value : 0) / target * 100)}%` }} />
          </div>
          <span className="tf-kpi-card__target-label">Target: {target.toLocaleString()} {unit}</span>
        </div>
      )}
      {trendValue !== undefined && (
        <span className="tf-kpi-card__trend">{trend === 'up' ? '+' : ''}{trendValue.toFixed(1)}%</span>
      )}
      {children && <div className="tf-kpi-card__footer">{children}</div>}
    </div>
  );
};

export default KPICard;
