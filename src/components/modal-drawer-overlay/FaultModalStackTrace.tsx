import React, { useState } from 'react';
import { cn } from '@/utils/cn';

/**
 * FaultModalStackTrace — renders a collapsible stack trace display
 * for debugging system faults. Click to expand/collapse.
 *
 * @example
 * ```tsx
 * <FaultModalStackTrace trace={error.stack} />
 * ```
 */
export interface FaultModalStackTraceProps {
  /** Stack trace string to display. */
  trace: string;
  /** Additional class names. */
  className?: string;
  /** Whether to start expanded. */
  defaultExpanded?: boolean;
  /** Maximum height when collapsed. */
  collapsedHeight?: number;
}

export const FaultModalStackTrace: React.FC<FaultModalStackTraceProps> = ({
  trace,
  className,
  defaultExpanded = false,
  collapsedHeight = 120,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const lines = trace.split('\n').filter(Boolean);

  return (
    <div
      className={cn('tf-fault-modal-stack-trace mt-4', className)}
      data-testid="fault-modal-stack-trace"
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className={cn(
          'tf-fault-modal-stack-trace__toggle',
          'flex items-center gap-1.5 text-xs font-medium text-steel-400 hover:text-steel-200',
          'transition-colors duration-150 mb-1.5'
        )}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={cn('transition-transform duration-150', expanded && 'rotate-90')}
        >
          <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Stack Trace ({lines.length} frames)
      </button>
      <pre
        className={cn(
          'tf-fault-modal-stack-trace__code',
          'rounded border border-steel-800 bg-steel-950 p-3',
          'text-xs font-mono text-steel-400 leading-relaxed overflow-x-auto',
          'transition-[max-height] duration-300',
          !expanded && 'overflow-y-hidden'
        )}
        style={{ maxHeight: expanded ? '24rem' : collapsedHeight }}
      >
        {lines.map((line, i) => (
          <div key={i} className="tf-fault-modal-stack-trace__line">
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default FaultModalStackTrace;
