import React from 'react';
import { cn } from '@/utils/cn';

/**
 * InfoModalContent — styled content wrapper for informational modals.
 * Provides consistent typography and spacing for help text and announcements.
 *
 * @example
 * ```tsx
 * <InfoModalContent>
 *   <p>The system will be down for maintenance tonight...</p>
 * </InfoModalContent>
 * ```
 */
export interface InfoModalContentProps {
  /** Content rendered inside. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to center-align the content. */
  centered?: boolean;
  /** Whether to render in a compact mode. */
  compact?: boolean;
}

export const InfoModalContent: React.FC<InfoModalContentProps> = ({
  children,
  className,
  centered = false,
  compact = false,
}) => {
  return (
    <div
      className={cn(
        'tf-info-modal-content',
        'text-sm text-steel-200 leading-relaxed',
        centered && 'text-center',
        compact ? 'space-y-2' : 'space-y-3',
        className
      )}
      data-testid="info-modal-content"
    >
      {children}
    </div>
  );
};

export default InfoModalContent;
