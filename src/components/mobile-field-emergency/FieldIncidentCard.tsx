import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldIncidentCard.
 */
export interface FieldIncidentCardProps {
  /** Incident ID. */
  incidentId: string;
  /** Title. */
  title: string;
  /** Incident type. */
  type: string;
  /** Severity. */
  severity: 'critical' | 'high' | 'medium' | 'low' | 'informational';
  /** Status. */
  status?: 'open' | 'in-progress' | 'resolved' | 'closed';
  /** Location. */
  location?: string;
  /** Reporter. */
  reporter?: string;
  /** Reported at. */
  reportedAt?: string;
  /** Assigned to. */
  assignedTo?: string;
  /** Press handler. */
  onPress?: (incidentId: string) => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldIncidentCard — incident card.
 *
 * Compact incident summary card for list views.
 * Severity colour stripe on the left for rapid visual triage.
 * Status badge indicates incident lifecycle state.
 * Tap to view full incident detail.
 */
export const FieldIncidentCard: React.FC<FieldIncidentCardProps> = ({
  incidentId,
  title,
  type,
  severity,
  status = 'open',
  location,
  reporter,
  reportedAt,
  assignedTo,
  onPress,
  className = '',
  testId,
}) => {
  const severityClass = `tf-incident-card--severity-${severity}`;
  const statusClass = `tf-incident-card--status-${status}`;

  return (
    <article
      data-testid={testId}
      data-incident-id={incidentId}
      data-severity={severity}
      className={['tf-incident-card', severityClass, statusClass, className].join(' ')}
      role="button"
      tabIndex={0}
      onClick={() => onPress?.(incidentId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPress?.(incidentId);
        }
      }}
    >
      {/* Severity stripe */}
      <div className="tf-incident-card__stripe" aria-hidden="true" />

      {/* Content */}
      <div className="tf-incident-card__content">
        {/* Header */}
        <div className="tf-incident-card__header">
          <span className={`tf-incident-card__badge tf-incident-card__badge--${severity}`}>
            {severity}
          </span>
          <span className="tf-incident-card__type">{type}</span>
          {status && (
            <span className={`tf-incident-card__status tf-incident-card__status--${status}`}>
              {status}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="tf-incident-card__title">{title}</h4>

        {/* Meta */}
        <div className="tf-incident-card__meta">
          {location && (
            <span className="tf-incident-card__location">📍 {location}</span>
          )}
          {reporter && (
            <span className="tf-incident-card__reporter">{reporter}</span>
          )}
          {reportedAt && (
            <time dateTime={reportedAt}>{reportedAt}</time>
          )}
          {assignedTo && (
            <span className="tf-incident-card__assigned">
              → {assignedTo}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

FieldIncidentCard.displayName = 'FieldIncidentCard';

export default FieldIncidentCard;
