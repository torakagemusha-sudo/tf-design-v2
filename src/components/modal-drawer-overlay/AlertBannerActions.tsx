import React from 'react';
import { cn } from '@/utils/cn';

/**
 * AlertBannerAction — a single action button for the alert banner.
 */
export interface AlertBannerAction {
  /** Button label. */
  label: string;
  /** Click handler. */
  onClick: () => void;
  /** Whether this is the primary action. */
  primary?: boolean;
}

/**
 * AlertBannerActions — renders action buttons within an alert banner.
 *
 * @example
 * ```tsx
 * <AlertBannerActions
 *   actions={[
 *     { label: 'Learn More', onClick: openDocs },
 *     { label: 'Dismiss', onClick: dismiss },
 *   ]}
 * />
 * ```
 */
export interface AlertBannerActionsProps {
  /** Array of action buttons. */
  actions: AlertBannerAction[];
  /** Additional class names. */
  className?: string;
}

export const AlertBannerActions: React.FC<AlertBannerActionsProps> = ({
  actions,
  className,
}) => {
  return (
    <div
      className={cn(
        'tf-alert-banner-actions flex items-center gap-3 ml-auto',
        className
      )}
      data-testid="alert-banner-actions"
    >
      {actions.map((action, idx) => (
        <button
          key={idx}
          type="button"
          onClick={action.onClick}
          className={cn(
            'tf-alert-banner-actions__button text-xs font-medium underline transition-colors',
            action.primary
              ? 'text-white hover:text-steel-200'
              : 'text-steel-400 hover:text-white'
          )}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default AlertBannerActions;
