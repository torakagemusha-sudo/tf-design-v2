/**
 * ============================================================
 * CpuUsage — Torafirma Design System
 * ============================================================
 *
 * CPU usage display. Shows overall CPU percentage with per-core
 * breakdown and system/user split.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the CpuUsage component.
 */
export interface CpuUsageProps {
  /** Overall CPU usage percentage. */
  overallPercent: number;
  /** User CPU time percentage. */
  userPercent?: number;
  /** System CPU time percentage. */
  systemPercent?: number;
  /** Per-core usage percentages. */
  cores?: number[];
  /** Number of cores (if not providing per-core data). */
  coreCount?: number;
  /** Label. */
  label?: string;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * CpuUsage renders a CPU usage display.
 *
 * @example
 * ```tsx
 * <CpuUsage overallPercent={45.2} userPercent={30.1} systemPercent={15.1} cores={[20, 40, 60, 80]} />
 * ```
 */
export const CpuUsage: React.FC<CpuUsageProps> = ({
  overallPercent,
  userPercent,
  systemPercent,
  cores,
  coreCount,
  label = 'CPU',
  size = 'md',
  className = '',
  testId,
}) => {
  const clampedPercent = Math.max(0, Math.min(100, overallPercent));
  const variant = clampedPercent >= 90 ? 'danger' : clampedPercent >= 70 ? 'warning' : 'run';

  return (
    <div
      className={`tf-cpu-usage tf-cpu-usage--${variant} tf-cpu-usage--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label}: ${clampedPercent.toFixed(1)}%`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedPercent}
    >
      <div className="tf-cpu-usage__header">
        <span className="tf-cpu-usage__label">{label}</span>
        <span className={`tf-cpu-usage__value tf-cpu-usage__value--${variant}`}>
          {clampedPercent.toFixed(1)}%
        </span>
      </div>
      <div className="tf-cpu-usage__bar">
        <div
          className={`tf-cpu-usage__fill tf-cpu-usage__fill--${variant}`}
          style={{ width: `${clampedPercent}%` }}
          aria-hidden="true"
        />
      </div>
      {(userPercent !== undefined || systemPercent !== undefined) && (
        <div className="tf-cpu-usage__breakdown">
          {userPercent !== undefined && <span className="tf-cpu-usage__user">User: {userPercent.toFixed(1)}%</span>}
          {systemPercent !== undefined && <span className="tf-cpu-usage__system">Sys: {systemPercent.toFixed(1)}%</span>}
        </div>
      )}
      {cores && cores.length > 0 && (
        <div className="tf-cpu-usage__cores">
          {cores.map((core, index) => (
            <div key={index} className="tf-cpu-usage__core">
              <div className="tf-cpu-usage__core-bar">
                <div
                  className="tf-cpu-usage__core-fill"
                  style={{ height: `${core}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className="tf-cpu-usage__core-label">{index}</span>
            </div>
          ))}
        </div>
      )}
      {coreCount !== undefined && !cores && (
        <span className="tf-cpu-usage__core-count">{coreCount} cores</span>
      )}
    </div>
  );
};

CpuUsage.displayName = 'CpuUsage';

export default CpuUsage;
