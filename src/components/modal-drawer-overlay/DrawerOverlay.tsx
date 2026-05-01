import React from 'react';
import { cn } from '@/utils/cn';

/**
 * DrawerOverlay — the backdrop layer behind a drawer panel.
 * Provides the semi-transparent overlay that obscures page content.
 *
 * @example
 * ```tsx
 * <DrawerOverlay isVisible onClick={handleClose} />
 * ```
 */
export interface DrawerOverlayProps {
  /** Whether the overlay is visible. */
  isVisible: boolean;
  /** Click handler for overlay dismissal. */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Background opacity. */
  opacity?: 'low' | 'medium' | 'high';
  /** Whether to apply backdrop blur. */
  blur?: boolean;
  /** Z-index override. */
  zIndex?: number;
  /** Additional class names. */
  className?: string;
  /** Child content — typically the drawer panel. */
  children?: React.ReactNode;
}

const opacityMap: Record<string, string> = {
  low: 'bg-black/40',
  medium: 'bg-black/70',
  high: 'bg-black/85',
};

export const DrawerOverlay: React.FC<DrawerOverlayProps> = ({
  isVisible,
  onClick,
  opacity = 'medium',
  blur = true,
  zIndex,
  className,
  children,
}) => {
  if (!isVisible) return null;

  return (
    <div
      role="presentation"
      onClick={onClick}
      className={cn(
        'tf-drawer-overlay',
        'fixed inset-0',
        opacityMap[opacity],
        blur && 'backdrop-blur-sm',
        'transition-opacity duration-300',
        className
      )}
      style={{ zIndex }}
      data-testid="drawer-overlay"
    >
      {children}
    </div>
  );
};

export default DrawerOverlay;
