import React from 'react';
import { cn } from '@/utils/cn';

/**
 * AuthorityModalHeader — a specialized header for authority escalation dialogs.
 * Displays the clearance level badge and shield icon.
 *
 * @example
 * ```tsx
 * <AuthorityModalHeader
 *   title="Escalation Required"
 *   clearanceLevel={3}
 *   operation="Delete workspace"
 * />
 * ```
 */
export interface AuthorityModalHeaderProps {
  /** Modal title. */
  title: string;
  /** Required authority/clearance level. */
  clearanceLevel: number;
  /** The operation being requested. */
  operation?: string;
  /** Additional class names. */
  className?: string;
  /** Optional onClose handler. */
  onClose?: () => void;
}

export const AuthorityModalHeader: React.FC<AuthorityModalHeaderProps> = ({
  title,
  clearanceLevel,
  operation,
  className,
  onClose,
}) => {
  return (
    <div
      className={cn(
        'tf-authority-modal-header',
        'px-5 py-4 border-b border-amber-700/40 bg-amber-950/10',
        className
      )}
      data-testid="authority-modal-header"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="tf-authority-modal-header__icon inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-amber-500">
              <path d="M12 15v3m-6 4h12a2 2 0 002-2v-6a2 2 0 00-.6-1.4l-8-8a2 2 0 00-2.8 0l-8 8A2 2 0 002 11v6a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h2 className="tf-authority-modal-header__title text-base font-semibold text-white">
              {title}
            </h2>
            {operation && (
              <p className="tf-authority-modal-header__operation text-xs text-steel-400 mt-0.5">
                Operation: <span className="text-steel-200">{operation}</span>
              </p>
            )}
          </div>
        </div>
        <span className="tf-authority-modal-header__badge inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-600/30">
          L{clearanceLevel}
        </span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded text-steel-400 hover:text-white hover:bg-steel-800 transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthorityModalHeader;
