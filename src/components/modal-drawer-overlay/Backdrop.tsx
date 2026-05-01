import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Backdrop — a generic semi-transparent overlay layer.
 * Used behind modals, drawers, and other overlay components.
 *
 * @example
 * ```tsx
 * <Backdrop isVisible onClick={handleClose} opacity="high" blur />
 * ```
 */
export interface BackdropProps {
  /** Whether the backdrop is visible. */
  isVisible: boolean;
  /** Click handler for overlay dismissal. */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Background opacity level. */
  opacity?: 'low' | 'medium' | 'high';
  /** Whether to apply backdrop blur. */
  blur?: boolean;
  /** Z-index override. */
  zIndex?: number;
  /** Additional class names. */
  className?: string;
  /** ARIA label. */
  ariaLabel?: string;
}

const opacityMap: Record<string, string> = {
  low: 'bg-black/40',
  medium: 'bg-black/70',
  high: 'bg-black/85',
};

export const Backdrop: React.FC<BackdropProps> = ({
  isVisible,
  onClick,
  opacity = 'medium',
  blur = true,
  zIndex,
  className,
  ariaLabel = 'Close',
}) => {
  if (!isVisible) return null;

  return (
    <div
      role="presentation"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        'tf-backdrop',
        'fixed inset-0',
        opacityMap[opacity],
        blur && 'backdrop-blur-sm',
        'transition-opacity duration-300',
        className
      )}
      style={{ zIndex }}
      data-testid="backdrop"
    />
  );
};

export default Backdrop;
