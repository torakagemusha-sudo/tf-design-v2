import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A single audit event entry.
 */
export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target?: string;
  result: 'success' | 'failure' | 'blocked' | 'override';
  traceId?: string;
  details?: string;
}

/**
 * Props for the CommandAuditTrail component.
 * Inline audit trail for a command.
 */
export interface CommandAuditTrailProps extends TorafirmaComponentBaseProps {
  /** Array of audit events */
  events: AuditEvent[];
  /** Callback fired when the full audit log is requested */
  onViewFull: () => void;
}

/**
 * CommandAuditTrail — inline audit trail for a command.
 *
 * Renders a chronological list of audit events for a specific
 * command. Each event shows the actor, action, result, and
 * timestamp. Supports expansion to the full audit log view.
 *
 * @example
 * ```tsx
 * <CommandAuditTrail
 *   events={[
 *     { id: 'e1', timestamp: '2024-01-01T10:00:00Z', actor: 'operator-1', action: 'Stage deployment', result: 'success', traceId: 't-001' },
 *   ]}
 *   onViewFull={() => console.log('View full audit')}
 * />
 * ```
 */
const CommandAuditTrail: React.FC<CommandAuditTrailProps> = ({
  events,
  onViewFull,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  if (events.length === 0) {
    return (
      <div
        className={`tf-command-audit-trail tf-command-audit-trail--empty ${className}`}
        data-testid={testId}
        {...rest}
      >
        <span className="tf-command-audit-trail__empty-text">No audit events.</span>
      </div>
    );
  }

  return (
    <div className={`tf-command-audit-trail ${className}`} data-testid={testId} {...rest}>
      <div className="tf-command-audit-trail__header">
        <span className="tf-command-audit-trail__title">Audit Trail</span>
        <span className="tf-command-audit-trail__count">{events.length} events</span>
        <button
          type="button"
          className="tf-command-audit-trail__view-full"
          onClick={onViewFull}
        >
          View full log
        </button>
      </div>
      <ol className="tf-command-audit-trail__list">
        {events.map((event) => (
          <li key={event.id} className={`tf-command-audit-trail__event tf-command-audit-trail__event--${event.result}`}>
            <time className="tf-command-audit-trail__timestamp" dateTime={event.timestamp}>
              {new Date(event.timestamp).toLocaleString()}
            </time>
            <span className="tf-command-audit-trail__actor">{event.actor}</span>
            <span className="tf-command-audit-trail__action">{event.action}</span>
            {event.target && (
              <span className="tf-command-audit-trail__target">{event.target}</span>
            )}
            <span className={`tf-command-audit-trail__result tf-command-audit-trail__result--${event.result}`}>
              {event.result.toUpperCase()}
            </span>
            {event.traceId && (
              <span className="tf-command-audit-trail__trace">{event.traceId}</span>
            )}
            {event.details && (
              <p className="tf-command-audit-trail__details">{event.details}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CommandAuditTrail;
