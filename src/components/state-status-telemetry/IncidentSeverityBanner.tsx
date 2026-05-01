/**
 * ============================================================
 * IncidentSeverityBanner — Torafirma Design System
 * ============================================================
 *
 * Incident severity banner. Prominent display showing active
 * incident details with severity, title, and affected systems.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { FaultSeverity } from './FaultIndicator';

/**
 * Props for the IncidentSeverityBanner component.
 */
export interface IncidentSeverityBannerProps {
  /** Whether the banner is visible. */
  visible: boolean;
  /** Incident title. */
  title: string;
  /** Incident severity. */
  severity: FaultSeverity;
  /** Affected systems or components. */
  affectedSystems?: string[];
  /** Incident start time. */
  startedAt?: string;
  /** Incident ID. */
  incidentId?: string;
  /** Handler to view incident details. */
  onViewDetails?: () => void;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const severityMeta: Record<FaultSeverity, { label: string; variant: string }> = {
  critical: { label: 'CRITICAL INCIDENT', variant: 'danger' },
  major: { label: 'MAJOR INCIDENT', variant: 'danger' },
  minor: { label: 'MINOR INCIDENT', variant: 'warning' },
  warning: { label: 'INCIDENT', variant: 'warning' },
  info: { label: 'NOTICE', variant: 'neutral' },
};

/**
 * IncidentSeverityBanner renders a prominent incident display.
 *
 * @example
 * ```tsx
 * <IncidentSeverityBanner
 *   visible={true}
 *   title="Database replication lag"
 *   severity="major"
 *   affectedSystems={["Analytics", "Reporting"]}
 *   startedAt="2024-01-15T10:00:00Z"
 *   incidentId="INC-2024-0042"
 * />
 * ```
 */
export const IncidentSeverityBanner: React.FC<IncidentSeverityBannerProps> = ({
  visible,
  title,
  severity,
  affectedSystems,
  startedAt,
  incidentId,
  onViewDetails,
  className = '',
  testId,
}) => {
  if (!visible) return null;

  const meta = severityMeta[severity];

  return (
    <div
      className={`tf-incident-severity-banner tf-incident-severity-banner--${meta.variant} ${className}`}
      data-testid={testId}
      data-incident-id={incidentId}
      data-severity={severity}
      role="alert"
      aria-label={`${meta.label}: ${title}`}
    >
      <span className="tf-incident-severity-banner__icon" aria-hidden="true">&#x26A0;</span>
      <div className="tf-incident-severity-banner__content">
        <span className="tf-incident-severity-banner__severity">{meta.label}</span>
        {incidentId && <span className="tf-incident-severity-banner__id">{incidentId}</span>}
        <span className="tf-incident-severity-banner__title">{title}</span>
        {affectedSystems && affectedSystems.length > 0 && (
          <span className="tf-incident-severity-banner__affected">
            Affected: {affectedSystems.join(', ')}
          </span>
        )}
        {startedAt && <span className="tf-incident-severity-banner__time">Started: {startedAt}</span>}
      </div>
      {onViewDetails && (
        <button
          className="tf-incident-severity-banner__details-btn"
          onClick={onViewDetails}
          type="button"
        >
          Details
        </button>
      )}
    </div>
  );
};

IncidentSeverityBanner.displayName = 'IncidentSeverityBanner';

export default IncidentSeverityBanner;
