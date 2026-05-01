import React from 'react';
import { cn } from '@/utils/cn';

/**
 * LoadingModalMessage — renders a loading status message with
 * optional animated ellipsis for active loading states.
 *
 * @example
 * ```tsx
 * <LoadingModalMessage animate>Processing nodes</LoadingModalMessage>
 * ```
 */
export interface LoadingModalMessageProps {
  /** Message content. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to animate trailing ellipsis. */
  animate?: boolean;
  /** Whether to center-align the message. */
  centered?: boolean;
}

export const LoadingModalMessage: React.FC<LoadingModalMessageProps> = ({
  children,
  className,
  animate = true,
  centered = true,
}) => {
  return (
    <p
      className={cn(
        'tf-loading-modal-message',
        'text-sm text-steel-400',
        centered && 'text-center',
        className
      )}
      data-testid="loading-modal-message"
    >
      {children}
      {animate && (
        <span className="tf-loading-modal-message__ellipsis inline-block w-4">
          <span className="animate-pulse">...</span>
        </span>
      )}
    </p>
  );
};

export default LoadingModalMessage;
