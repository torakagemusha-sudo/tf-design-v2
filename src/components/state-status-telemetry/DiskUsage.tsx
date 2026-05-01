/**
 * ============================================================
 * DiskUsage — Torafirma Design System
 * ============================================================
 *
 * Disk usage display. Shows used/total disk space with
 * percentage bar and mount point information.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the DiskUsage component.
 */
export interface DiskUsageProps {
  /** Used disk space in gigabytes. */
  usedGb: number;
  /** Total disk space in gigabytes. */
  totalGb: number;
  /** Mount point or drive label. */
  mountPoint?: string;
  /** Filesystem type. */
  filesystem?: string;
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
 * DiskUsage renders a disk usage display.
 *
 * @example
 * ```tsx
 * <DiskUsage usedGb={450} totalGb={1000} mountPoint="/data" filesystem="ext4" label="Data Volume" />
 * ```
 */
export const DiskUsage: React.FC<DiskUsageProps> = ({
  usedGb,
  totalGb,
  mountPoint,
  filesystem,
  label = 'Disk',
  size = 'md',
  className = '',
  testId,
}) => {
  const percent = Math.min(100, (usedGb / totalGb) * 100);
  const variant = percent >= 95 ? 'danger' : percent >= 85 ? 'warning' : 'run';
  const freeGb = totalGb - usedGb;

  return (
    <div
      className={`tf-disk-usage tf-disk-usage--${variant} tf-disk-usage--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label}: ${usedGb.toFixed(1)} GB used of ${totalGb.toFixed(1)} GB`}
      aria-valuemin={0}
      aria-valuemax={totalGb}
      aria-valuenow={usedGb}
    >
      <div className="tf-disk-usage__header">
        <span className="tf-disk-usage__label">{label}</span>
        {mountPoint && <span className="tf-disk-usage__mount">{mountPoint}</span>}
      </div>
      <div className="tf-disk-usage__values">
        <span className="tf-disk-usage__used">{usedGb.toFixed(1)} GB used</span>
        <span className="tf-disk-usage__free">{freeGb.toFixed(1)} GB free</span>
        <span className="tf-disk-usage__percent">{percent.toFixed(1)}%</span>
      </div>
      <div className="tf-disk-usage__bar">
        <div
          className={`tf-disk-usage__fill tf-disk-usage__fill--${variant}`}
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
      </div>
      {filesystem && <span className="tf-disk-usage__fs">{filesystem}</span>}
    </div>
  );
};

DiskUsage.displayName = 'DiskUsage';

export default DiskUsage;
