import React from 'react';
import { cn } from '@/utils/cn';

/**
 * InspectModalHeader — specialized header for inspect modals showing
 * entity type badge, identifier, and operational status.
 *
 * @example
 * ```tsx
 * <InspectModalHeader
 *   entityType="Node"
 *   entityId="node-47b3"
 *   status="active"
 *   onClose={close}
 * />
 * ```
 */
export interface InspectModalHeaderProps {
  /** Type of entity being inspected (e.g., "Node", "Task", "Config"). */
  entityType?: string;
  /** Entity identifier or name. */
  entityId?: string;
  /** Operational status of the entity. */
  status?: 'active' | 'inactive' | 'pending' | 'failed' | 'unknown';
  /** Additional metadata shown next to the badge. */
  meta?: string;
  /** Callback when close is clicked. */
  onClose?: () => void;
  /** Additional class names. */
  className?: string;
}

const statusDot: Record<string, string> = {
  active: 'bg-emerald-500',
  inactive: 'bg-steel-500',
  pending: 'bg-amber-500',
  failed: 'bg-red-500',
  unknown: 'bg-steel-600',
};

export const InspectModalHeader: React.FC<InspectModalHeaderProps> = ({
  entityType,
  entityId,
  status = 'unknown',
  meta,
  onClose,
  className,
}) => {
  return (
    <div
      className={cn(
        'tf-inspect-modal-header',
        'flex items-center justify-between gap-3 px-5 py-4 border-b border-steel-700',
        className
      )}
      data-testid="inspect-modal-header"
    >
      <div className="tf-inspect-modal-header__main flex items-center gap-3 min-w-0">
        {entityType && (
          <span className="tf-inspect-modal-header__badge inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium bg-steel-800 text-steel-300 border border-steel-700">
            <span
              className={cn(
                'tf-inspect-modal-header__status-dot h-1.5 w-1.5 rounded-full',
                statusDot[status]
              )}
            />
            {entityType}
          </span>
        )}
        {entityId && (
          <span className="tf-inspect-modal-header__id text-sm font-mono text-white truncate">
            {entityId}
          </span>
        )}
        {meta && (
          <span className="tf-inspect-modal-header__meta text-xs text-steel-500">
            {meta}
          </span>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'tf-inspect-modal-header__close',
            'inline-flex h-7 w-7 items-center justify-center rounded',
            'text-steel-400 hover:text-white hover:bg-steel-800',
            'transition-colors duration-150'
          )}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default InspectModalHeader;
