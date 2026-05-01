import React from 'react';
import { cn } from '@/utils/cn';
import { RecoveryOption } from './FaultModal';

/**
 * FaultModalRecovery — renders a set of recovery action buttons
 * for resolving a system fault.
 *
 * @example
 * ```tsx
 * <FaultModalRecovery
 *   options={[
 *     { label: 'Retry Connection', action: retry, primary: true },
 *     { label: 'Use Fallback', action: fallback },
 *   ]}
 * />
 * ```
 */
export interface FaultModalRecoveryProps {
  /** Recovery action options. */
  options: RecoveryOption[];
  /** Additional class names. */
  className?: string;
}

export const FaultModalRecovery: React.FC<FaultModalRecoveryProps> = ({
  options,
  className,
}) => {
  if (options.length === 0) return null;

  return (
    <div
      className={cn(
        'tf-fault-modal-recovery',
        'mt-4 rounded border border-steel-700/50 p-3',
        className
      )}
      data-testid="fault-modal-recovery"
    >
      <span className="tf-fault-modal-recovery__label block text-xs font-semibold uppercase tracking-wider text-steel-500 mb-2">
        Recovery Options
      </span>
      <div className="tf-fault-modal-recovery__actions flex flex-wrap gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={opt.action}
            className={cn(
              'tf-fault-modal-recovery__option rounded px-3 py-1.5 text-xs font-medium',
              'border transition-colors duration-150',
              opt.primary
                ? 'bg-sky-500/15 text-sky-400 border-sky-600/30 hover:bg-sky-500/25'
                : 'bg-steel-800/50 text-steel-300 border-steel-700 hover:bg-steel-700/50'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FaultModalRecovery;
