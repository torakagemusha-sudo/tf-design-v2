/**
 * ============================================================
 * MaintenanceWindowBadge — Torafirma Design System
 * ============================================================
 *
 * Maintenance mode indicator badge. Shows whether the system
 * is in a maintenance window with start/end times.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Maintenance states.
 */
export type MaintenanceState = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

/**
 * Props for the MaintenanceWindowBadge component.
 */
export interface MaintenanceWindowBadgeProps {
  /** Current maintenance state. */
  state: MaintenanceState;
  /** Maintenance window title. */
  title?: string;
  /** Scheduled start time. */
  scheduledStart?: string;
  /** Scheduled end time. */
  scheduledEnd?: string;
  /** Time remaining. */
  timeRemaining?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const maintenanceMeta: Record<MaintenanceState, { label: string; variant: string }> = {
  scheduled: { label: 'MAINTENANCE SCHEDULED', variant: 'warning' },
  in_progress: { label: 'UNDER MAINTENANCE', variant: 'inspect' },
  completed: { label: 'MAINTENANCE COMPLETE', variant: 'run' },
  cancelled: { label: 'MAINTENANCE CANCELLED', variant: 'neutral' },
};

/**
 * MaintenanceWindowBadge renders a maintenance window indicator.
 *
 * @example
 * ```tsx
 * <MaintenanceWindowBadge state="in_progress" title="Database Upgrade" scheduledStart="02:00" scheduledEnd="04:00" timeRemaining="1h 30m" />
 * ```
 */
export const MaintenanceWindowBadge: React.FC<MaintenanceWindowBadgeProps> = ({
  state,
  title,
  scheduledStart,
  scheduledEnd,
  timeRemaining,
  className = '',
  testId,
}) => {
  const meta = maintenanceMeta[state];

  return (
    <div
      className={`tf-maintenance-window-badge tf-maintenance-window-badge--${meta.variant} tf-maintenance-window-badge--${state} ${className}`}
      data-testid={testId}
      data-maintenance-state={state}
      role="status"
      aria-label={meta.label}
    >
      <span className="tf-maintenance-window-badge__icon" aria-hidden="true">&#x1F527;</span>
      <span className="tf-maintenance-window-badge__label">{meta.label}</span>
      {title && <span className="tf-maintenance-window-badge__title">{title}</span>}
      <div className="tf-maintenance-window-badge__window">
        {scheduledStart && <span className="tf-maintenance-window-badge__start">{scheduledStart}</span>}
        {scheduledEnd && <span className="tf-maintenance-window-badge__end">{scheduledEnd}</span>}
      </div>
      {timeRemaining && <span className="tf-maintenance-window-badge__remaining">{timeRemaining}</span>}
    </div>
  );
};

MaintenanceWindowBadge.displayName = 'MaintenanceWindowBadge';

export default MaintenanceWindowBadge;
