import React from 'react';
import { cn } from '@/utils/cn';

/**
 * InfoModalIcon — renders a themed informational icon with
 * background circle for visual emphasis in info modals.
 *
 * @example
 * ```tsx
 * <InfoModalIcon variant="sky" size="lg" />
 * ```
 */
export interface InfoModalIconProps {
  /** Visual variant controlling color scheme. */
  variant?: 'sky' | 'amber' | 'emerald' | 'neutral';
  /** Size of the icon container. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names. */
  className?: string;
  /** Custom icon SVG content. */
  children?: React.ReactNode;
}

const variantClasses: Record<string, { container: string; icon: string }> = {
  sky: { container: 'bg-sky-500/15', icon: 'text-sky-500' },
  amber: { container: 'bg-amber-500/15', icon: 'text-amber-500' },
  emerald: { container: 'bg-emerald-500/15', icon: 'text-emerald-500' },
  neutral: { container: 'bg-steel-700', icon: 'text-steel-300' },
};

const sizeClasses: Record<string, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
};

const iconSizes: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 28,
};

export const InfoModalIcon: React.FC<InfoModalIconProps> = ({
  variant = 'sky',
  size = 'md',
  className,
  children,
}) => {
  const v = variantClasses[variant];
  const s = sizeClasses[size];
  const iconSize = iconSizes[size];

  return (
    <span
      className={cn(
        'tf-info-modal-icon',
        'inline-flex items-center justify-center rounded-full',
        v.container,
        s,
        className
      )}
      data-testid="info-modal-icon"
    >
      {children ?? (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          className={v.icon}
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
};

export default InfoModalIcon;
