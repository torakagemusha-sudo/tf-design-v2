import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Audit log entry for authority escalation.
 */
export interface AuditEntry {
  /** Timestamp of the event. */
  timestamp: string;
  /** Event description. */
  event: string;
  /** User identifier. */
  userId?: string;
  /** Status of the event. */
  status?: 'success' | 'failure' | 'pending';
}

/**
 * AuthorityModalAudit — renders an audit trail section for authority
 * escalation dialogs, showing recent access attempts.
 *
 * @example
 * ```tsx
 * <AuthorityModalAudit entries={[
 *   { timestamp: '08:32:00', event: 'Escalation granted', status: 'success', userId: 'op-001' },
 * ]} />
 * ```
 */
export interface AuthorityModalAuditProps {
  /** Array of audit entries. */
  entries: AuditEntry[];
  /** Additional class names. */
  className?: string;
  /** Maximum number of entries to show. */
  maxEntries?: number;
}

const statusIcon: Record<string, string> = {
  success: 'text-emerald-500',
  failure: 'text-red-500',
  pending: 'text-amber-500',
};

export const AuthorityModalAudit: React.FC<AuthorityModalAuditProps> = ({
  entries,
  className,
  maxEntries = 5,
}) => {
  const display = entries.slice(0, maxEntries);

  return (
    <div
      className={cn(
        'tf-authority-modal-audit',
        'rounded border border-steel-700/50 bg-steel-950/30',
        className
      )}
      data-testid="authority-modal-audit"
    >
      <div className="tf-authority-modal-audit__header px-3 py-2 border-b border-steel-700/50">
        <span className="text-xs font-semibold uppercase tracking-wider text-steel-500">
          Audit Trail
        </span>
      </div>
      {display.length === 0 ? (
        <p className="px-3 py-3 text-xs text-steel-500 italic">No recent events</p>
      ) : (
        <ul className="divide-y divide-steel-800/50">
          {display.map((entry, idx) => (
            <li
              key={idx}
              className="tf-authority-modal-audit__entry flex items-center gap-2 px-3 py-2"
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full shrink-0',
                  statusIcon[entry.status ?? 'pending']
                )}
              />
              <span className="text-xs text-steel-500 w-16 shrink-0 font-mono">
                {entry.timestamp}
              </span>
              <span className="text-xs text-steel-300 flex-1 min-w-0 truncate">
                {entry.event}
              </span>
              {entry.userId && (
                <span className="text-xs text-steel-500 font-mono shrink-0">
                  {entry.userId}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthorityModalAudit;
