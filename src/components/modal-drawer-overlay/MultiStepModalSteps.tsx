import React from 'react';
import { cn } from '@/utils/cn';

/**
 * MultiStepModalSteps — renders the step indicator bar for a wizard.
 * Shows step numbers/names with active/completed/pending states.
 *
 * @example
 * ```tsx
 * <MultiStepModalSteps
 *   steps={['Configure', 'Review', 'Deploy']}
 *   currentStep={1}
 *   onStepClick={goToStep}
 * />
 * ```
 */
export interface MultiStepModalStepsProps {
  /** Step titles. */
  steps: string[];
  /** Current active step index. */
  currentStep: number;
  /** Callback when a step is clicked (optional navigation). */
  onStepClick?: (step: number) => void;
  /** Additional class names. */
  className?: string;
  /** Whether steps are clickable to navigate. */
  clickable?: boolean;
}

export const MultiStepModalSteps: React.FC<MultiStepModalStepsProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
  clickable = false,
}) => {
  return (
    <div
      className={cn(
        'tf-multi-step-modal-steps',
        'flex items-center gap-1 px-5 py-3 border-b border-steel-700/50 bg-steel-950/30',
        className
      )}
      data-testid="multi-step-modal-steps"
    >
      {steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep;
        const isPending = idx > currentStep;

        return (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <div
                className={cn(
                  'tf-multi-step-modal-steps__connector flex-1 h-px',
                  isCompleted ? 'bg-amber-500' : 'bg-steel-700'
                )}
              />
            )}
            <button
              type="button"
              onClick={() => clickable && onStepClick?.(idx)}
              disabled={!clickable || isPending}
              className={cn(
                'tf-multi-step-modal-steps__step flex items-center gap-1.5 shrink-0',
                'text-xs font-medium transition-colors duration-150',
                clickable && !isPending && 'cursor-pointer',
                !clickable && 'cursor-default',
                isPending && 'cursor-not-allowed',
                isActive && 'text-amber-400',
                isCompleted && 'text-steel-200',
                isPending && 'text-steel-600'
              )}
            >
              <span
                className={cn(
                  'tf-multi-step-modal-steps__number inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold',
                  isActive && 'bg-amber-500 text-steel-950',
                  isCompleted && 'bg-steel-600 text-steel-100',
                  isPending && 'bg-steel-800 text-steel-500'
                )}
              >
                {isCompleted ? (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  idx + 1
                )}
              </span>
              <span className="hidden sm:inline">{step}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MultiStepModalSteps;
