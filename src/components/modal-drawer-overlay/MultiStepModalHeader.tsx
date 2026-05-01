import React from 'react';
import { cn } from '@/utils/cn';

/**
 * MultiStepModalHeader — the header section of a multi-step wizard modal.
 * Displays the wizard title and optional close button.
 *
 * @example
 * ```tsx
 * <MultiStepModalHeader title="Deployment Wizard" onClose={close} />
 * ```
 */
export interface MultiStepModalHeaderProps {
  /** Wizard title. */
  title: string;
  /** Optional close handler. */
  onClose?: () => void;
  /** Additional class names. */
  className?: string;
}

export const MultiStepModalHeader: React.FC<MultiStepModalHeaderProps> = ({
  title,
  onClose,
  className,
}) => {
  return (
    <div
      className={cn(
        'tf-multi-step-modal-header',
        'flex items-center justify-between gap-3 px-5 py-4 border-b border-steel-700',
        className
      )}
      data-testid="multi-step-modal-header"
    >
      <h2 className="tf-multi-step-modal-header__title text-base font-semibold text-white">
        {title}
      </h2>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-7 w-7 items-center justify-center rounded text-steel-400 hover:text-white hover:bg-steel-800 transition-colors"
          aria-label="Close wizard"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MultiStepModalHeader;
