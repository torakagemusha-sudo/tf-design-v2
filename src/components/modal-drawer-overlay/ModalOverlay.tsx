import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Backdrop overlay for modal dialogs. Renders a semi-transparent
 * dark layer with optional blur. Used standalone or within Modal.
 *
 * @example
 * ```tsx
 * <ModalOverlay isVisible onClick={handleClose} blur="sm" />
 * ```
 */
export interface ModalOverlayProps {
  /** Whether the overlay is visible. */
  isVisible: boolean;
  /** Click handler — typically triggers modal close. */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Backdrop blur intensity. */
  blur?: 'none' | 'sm' | 'md' | 'lg';
  /** Background opacity level. */
  opacity?: 'low' | 'medium' | 'high';
  /** Z-index override. */
  zIndex?: number;
  /** Additional class names. */
  className?: string;
  /** ARIA label for the overlay. */
  ariaLabel?: string;
  /** Child content — typically the modal panel. */
  children?: React.ReactNode;
}

const blurMap: Record<string, string> = {
  none: 'backdrop-blur-none',
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
};

const opacityMap: Record<string, string> = {
  low: 'bg-black/40',
  medium: 'bg-black/70',
  high: 'bg-black/85',
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  isVisible,
  onClick,
  blur = 'sm',
  opacity = 'medium',
  zIndex,
  className,
  ariaLabel = 'Close modal',
  children,
}) => {
  if (!isVisible) return null;

  return (
    <div
      role="presentation"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        'tf-modal-overlay',
        'fixed inset-0 flex items-center justify-center p-4',
        blurMap[blur],
        opacityMap[opacity],
        'transition-opacity duration-200',
        className
      )}
      style={{ zIndex }}
      data-testid="modal-overlay"
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
