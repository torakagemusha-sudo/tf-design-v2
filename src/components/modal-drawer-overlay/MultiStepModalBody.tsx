import React from 'react';
import { cn } from '@/utils/cn';

/**
 * MultiStepModalBody — content area for the current wizard step.
 * Wraps the active step content with consistent padding and scroll handling.
 *
 * @example
 * ```tsx
 * <MultiStepModalBody>
 *   {steps.map((Step, i) => currentStep === i && <Step key={i} />)}
 * </MultiStepModalBody>
 * ```
 */
export interface MultiStepModalBodyProps {
  /** Content for the current step. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether the body is scrollable. */
  scrollable?: boolean;
}

export const MultiStepModalBody: React.FC<MultiStepModalBodyProps> = ({
  children,
  className,
  scrollable = true,
}) => {
  return (
    <div
      className={cn(
        'tf-multi-step-modal-body',
        'px-5 py-5 flex-1',
        scrollable && 'overflow-y-auto',
        className
      )}
      data-testid="multi-step-modal-body"
    >
      {children}
    </div>
  );
};

export default MultiStepModalBody;
