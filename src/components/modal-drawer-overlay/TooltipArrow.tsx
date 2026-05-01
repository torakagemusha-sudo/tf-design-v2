import React from 'react';
import { cn } from '@/utils/cn';

/**
 * TooltipArrow — a small directional arrow pointing to the trigger element.
 * Positioned automatically based on tooltip placement.
 *
 * @example
 * ```tsx
 * <TooltipArrow placement="top" />
 * ```
 */
export interface TooltipArrowProps {
  /** Tooltip placement direction. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Additional class names. */
  className?: string;
  /** Arrow size in pixels. */
  size?: number;
}

export const TooltipArrow: React.FC<TooltipArrowProps> = ({
  placement = 'top',
  className,
  size = 6,
}) => {
  const offset = size;
  const transforms: Record<string, string> = {
    top: `translateX(-50%) translateY(${offset}px) rotate(180deg)`,
    bottom: `translateX(-50%) translateY(-${offset}px)`,
    left: `translateY(-50%) translateX(${offset}px) rotate(90deg)`,
    right: `translateY(-50%) translateX(-${offset}px) rotate(-90deg)`,
  };

  const positions: Record<string, string> = {
    top: 'bottom-0 left-1/2',
    bottom: 'top-0 left-1/2',
    left: 'right-0 top-1/2',
    right: 'left-0 top-1/2',
  };

  return (
    <span
      className={cn(
        'tf-tooltip-arrow absolute w-0 h-0 pointer-events-none',
        positions[placement],
        className
      )}
      style={{
        borderLeft: `${offset}px solid transparent`,
        borderRight: `${offset}px solid transparent`,
        borderTop: `${offset}px solid rgb(78 85 98)`,
        transform: transforms[placement],
      }}
      aria-hidden="true"
      data-testid="tooltip-arrow"
    />
  );
};

export default TooltipArrow;
