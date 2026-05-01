import React from 'react';
import { cn } from '@/utils/cn';

/**
 * FaultModalError — renders a structured error detail block within a fault modal.
 * Displays error code, message, severity badge, and origin.
 *
 * @example
 * ```tsx
 * <FaultModalError
 *   code="NET_001"
 *   message="Unable to reach upstream service"
 *   severity="critical"
 *   origin="network-layer"
 * />
 * ```
 */
export interface FaultModalErrorProps {
  /** Error code identifier. */
  code?: string;
  /** Human-readable error message. */
  message: string;
  /** Fault severity level. */
  severity?: 'critical' | 'error' | 'warning';
  /** Origin module or service. */
  origin?: string;
  /** Additional class names. */
  className?: string;
}

const severityClasses: Record<string, { badge: string; border: string }> = {
  critical: { badge: 'bg-red-500/15 text-red-400 border-red-600/30', border: 'border-red-800/50' },
  error: { badge: 'bg-orange-500/15 text-orange-400 border-orange-600/30', border: 'border-orange-800/50' },
  warning: { badge: 'bg-amber-500/15 text-amber-400 border-amber-600/30', border: 'border-amber-800/50' },
};

export const FaultModalError: React.FC<FaultModalErrorProps> = ({
  code,
  message,
  severity = 'error',
  origin,
  className,
}) => {
  const styles = severityClasses[severity];

  return (
    <div
      className={cn(
        'tf-fault-modal-error',
        'rounded border p-4',
        styles.border,
        'bg-steel-950/50',
        className
      )}
      data-testid="fault-modal-error"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        {code && (
          <span
            className={cn(
              'tf-fault-modal-error__code',
              'inline-flex rounded px-2 py-0.5 text-xs font-mono font-semibold border',
              styles.badge
            )}
          >
            {code}
          </span>
        )}
        <span
          className={cn(
            'tf-fault-modal-error__severity',
            'inline-flex rounded px-2 py-0.5 text-xs font-medium border capitalize',
            styles.badge
          )}
        >
          {severity}
        </span>
      </div>
      <p className="tf-fault-modal-error__message text-sm text-steel-100 leading-relaxed">
        {message}
      </p>
      {origin && (
        <p className="tf-fault-modal-error__origin mt-2 text-xs text-steel-500">
          Origin: <span className="font-mono">{origin}</span>
        </p>
      )}
    </div>
  );
};

export default FaultModalError;
