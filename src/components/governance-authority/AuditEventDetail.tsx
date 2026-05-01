/**
 * @fileoverview AuditEventDetail — Audit event detail view.
 *
 * Full detail panel for a selected audit event showing all fields,
 * nested details, and metadata.
 */

import React from "react";
import { AuditEvent, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface AuditEventDetailProps extends GovernanceComponentBaseProps {
  event: AuditEvent;
  onClose: () => void;
}

/**
 * AuditEventDetail renders the full detail view of a single audit event.
 */
const AuditEventDetail: React.FC<AuditEventDetailProps> = ({
  event,
  onClose,
  className = "",
  "data-testid": dataTestId = "audit-event-detail",
}) => (
  <aside
    className={`tf-audit-event-detail ${className}`.trim()}
    data-testid={dataTestId}
  >
    <header className="tf-audit-event-detail__header">
      <h4 className="tf-audit-event-detail__title">EVENT DETAIL</h4>
      <button
        type="button"
        className="tf-btn tf-btn--close"
        onClick={onClose}
        data-testid="audit-detail-close"
        aria-label="Close detail"
      >
        ✕
      </button>
    </header>
    <dl className="tf-audit-event-detail__fields">
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">ID</dt>
        <dd className="tf-audit-event-detail__value">{event.id}</dd>
      </div>
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">TIMESTAMP</dt>
        <dd className="tf-audit-event-detail__value">{event.timestamp}</dd>
      </div>
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">ACTOR</dt>
        <dd className="tf-audit-event-detail__value">
          {event.actor} ({event.actorRole})
        </dd>
      </div>
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">ACTION</dt>
        <dd className="tf-audit-event-detail__value">{event.action}</dd>
      </div>
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">TARGET</dt>
        <dd className="tf-audit-event-detail__value">
          {event.target} ({event.targetType})
        </dd>
      </div>
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">CATEGORY</dt>
        <dd className="tf-audit-event-detail__value">{event.category.toUpperCase()}</dd>
      </div>
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">SEVERITY</dt>
        <dd className="tf-audit-event-detail__value">{event.severity.toUpperCase()}</dd>
      </div>
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">AUTHORITY</dt>
        <dd className="tf-audit-event-detail__value">
          AUTH {event.authorityLevel} · {AUTHORITY_LEVELS[event.authorityLevel]}
        </dd>
      </div>
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">RESULT</dt>
        <dd className="tf-audit-event-detail__value">{event.result.toUpperCase()}</dd>
      </div>
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">MESSAGE</dt>
        <dd className="tf-audit-event-detail__value">{event.message}</dd>
      </div>
      <div className="tf-audit-event-detail__field">
        <dt className="tf-audit-event-detail__label">TRACE ID</dt>
        <dd className="tf-audit-event-detail__value">
          <code>{event.traceId}</code>
        </dd>
      </div>
      {event.ipAddress && (
        <div className="tf-audit-event-detail__field">
          <dt className="tf-audit-event-detail__label">IP ADDRESS</dt>
          <dd className="tf-audit-event-detail__value">{event.ipAddress}</dd>
        </div>
      )}
      {event.sessionId && (
        <div className="tf-audit-event-detail__field">
          <dt className="tf-audit-event-detail__label">SESSION</dt>
          <dd className="tf-audit-event-detail__value">{event.sessionId}</dd>
        </div>
      )}
    </dl>
    {event.details && Object.keys(event.details).length > 0 && (
      <div className="tf-audit-event-detail__extra">
        <span className="tf-audit-event-detail__extra-label">EXTRA DETAILS</span>
        <pre className="tf-audit-event-detail__extra-json">
          {JSON.stringify(event.details, null, 2)}
        </pre>
      </div>
    )}
  </aside>
);

AuditEventDetail.displayName = "AuditEventDetail";

export default AuditEventDetail;
