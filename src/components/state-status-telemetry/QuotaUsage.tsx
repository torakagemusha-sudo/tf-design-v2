/**
 * ============================================================
 * QuotaUsage — Torafirma Design System
 * ============================================================
 *
 * Resource quota display. Shows current usage against quota
 * limits with multiple resource types (CPU, memory, storage).
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Individual quota resource.
 */
export interface QuotaResource {
  /** Resource name. */
  name: string;
  /** Current usage. */
  used: number;
  /** Quota limit. */
  limit: number;
  /** Unit (cores, GB, etc.). */
  unit?: string;
}

/**
 * Props for the QuotaUsage component.
 */
export interface QuotaUsageProps {
  /** Quota resources to display. */
  resources: QuotaResource[];
  /** Quota scope or namespace. */
  scope?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * QuotaUsage renders a resource quota display.
 *
 * @example
 * ```tsx
 * <QuotaUsage
 *   resources={[
 *     { name: 'CPU', used: 4.5, limit: 8, unit: 'cores' },
 *     { name: 'Memory', used: 12, limit: 32, unit: 'GB' },
 *     { name: 'Storage', used: 100, limit: 500, unit: 'GB' },
 *   ]}
 *   scope="production"
 * />
 * ```
 */
export const QuotaUsage: React.FC<QuotaUsageProps> = ({
  resources,
  scope,
  className = '',
  testId,
}) => {
  return (
    <div
      className={`tf-quota-usage ${className}`}
      data-testid={testId}
      role="region"
      aria-label={`Resource quota${scope ? ` for ${scope}` : ''}`}
    >
      {scope && <span className="tf-quota-usage__scope">{scope}</span>}
      <div className="tf-quota-usage__resources">
        {resources.map((res) => {
          const percent = res.limit > 0 ? (res.used / res.limit) * 100 : 0;
          const variant = percent >= 95 ? 'danger' : percent >= 80 ? 'warning' : 'run';

          return (
            <div key={res.name} className={`tf-quota-usage__resource tf-quota-usage__resource--${variant}`}>
              <div className="tf-quota-usage__header">
                <span className="tf-quota-usage__name">{res.name}</span>
                <span className="tf-quota-usage__value">
                  {res.used} / {res.limit} {res.unit || ''}
                </span>
              </div>
              <div className="tf-quota-usage__bar">
                <div
                  className={`tf-quota-usage__fill tf-quota-usage__fill--${variant}`}
                  style={{ width: `${Math.min(100, percent)}%` }}
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

QuotaUsage.displayName = 'QuotaUsage';

export default QuotaUsage;
