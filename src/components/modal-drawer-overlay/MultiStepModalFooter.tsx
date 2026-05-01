import React from 'react';
import { cn } from '@/utils/cn';
import { useMultiStep } from './MultiStepModal';

/**
 * MultiStepModalFooter — navigation footer for wizard step progression.
 * Provides Back, Next, and Complete buttons with step state awareness.
 *
 * @example
 * ```tsx
 * <MultiStepModalFooter onComplete={handleDeploy} />
 * ```
 */
export interface MultiStepModalFooterProps {
  /** Callback when wizard is completed (last step). */
  onComplete?: () => void;
  /** Whether completion is processing. */
  isCompleting?: boolean;
  /** Additional class names. */
  className?: string;
  /** Custom labels. */
  labels?: {
    back?: string;
    next?: string;
    complete?: string;
  };
}

export const MultiStepModalFooter: React.FC<MultiStepModalFooterProps> = ({
  onComplete,
  isCompleting,
  className,
  labels = {},
}) => {
  const {
    isFirstStep,
    isLastStep,
    canComplete,
    nextStep,
    prevStep,
  } = useMultiStep();

  const { back = 'Back', next = 'Next', complete = 'Complete' } = labels;

  return (
    <div
      className={cn(
        'tf-multi-step-modal-footer',
        'flex items-center justify-between gap-3 px-5 py-4 border-t border-steel-700',
        className
      )}
      data-testid="multi-step-modal-footer"
    >
      <button
        type="button"
        onClick={prevStep}
        disabled={isFirstStep}
        className={cn(
          'tf-multi-step-modal-footer__back rounded px-3 py-1.5 text-sm font-medium',
          'border border-steel-600 text-steel-300',
          'hover:bg-steel-800 hover:text-white',
          'disabled:opacity-50 disabled:pointer-events-none',
          'transition-colors duration-150'
        )}
      >
        {back}
      </button>

      <span className="text-xs text-steel-500" />

      {isLastStep ? (
        <button
          type="button"
          onClick={onComplete}
          disabled={!canComplete || isCompleting}
          className={cn(
            'tf-multi-step-modal-footer__complete rounded px-3 py-1.5 text-sm font-medium',
            'bg-amber-500 text-steel-950 hover:bg-amber-400',
            'disabled:opacity-50 disabled:pointer-events-none',
            'transition-colors duration-150'
          )}
        >
          {isCompleting ? 'Processing...' : complete}
        </button>
      ) : (
        <button
          type="button"
          onClick={nextStep}
          disabled={!canComplete}
          className={cn(
            'tf-multi-step-modal-footer__next rounded px-3 py-1.5 text-sm font-medium',
            'bg-steel-200 text-steel-950 hover:bg-white',
            'disabled:opacity-50 disabled:pointer-events-none',
            'transition-colors duration-150'
          )}
        >
          {next}
        </button>
      )}
    </div>
  );
};

export default MultiStepModalFooter;
