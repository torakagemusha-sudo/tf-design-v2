import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the ActionDivider component.
 * Semantic divider between command groups.
 */
export interface ActionDividerProps extends TorafirmaComponentBaseProps {
  /** Optional label text for the divider */
  label?: string;
  /** Visual variant of the divider */
  variant?: 'solid' | 'dashed' | 'labeled';
}

/**
 * ActionDivider — semantic divider between command groups.
 *
 * Renders a horizontal rule or labeled separator between
 * command groups. When labeled, displays the group name
 * inline with the divider line. Supports solid and dashed
 * visual styles.
 *
 * @example
 * ```tsx
 * <ActionDivider label="Destructive Actions" variant="labeled" />
 * <ActionDivider variant="solid" />
 * ```
 */
const ActionDivider: React.FC<ActionDividerProps> = ({
  label,
  variant = 'solid',
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  if (variant === 'labeled' && label) {
    return (
      <div
        className={`tf-action-divider tf-action-divider--labeled ${className}`}
        role="separator"
        data-testid={testId}
        {...rest}
      >
        <span className="tf-action-divider__line tf-action-divider__line--left" aria-hidden="true" />
        <span className="tf-action-divider__label">{label}</span>
        <span className="tf-action-divider__line tf-action-divider__line--right" aria-hidden="true" />
      </div>
    );
  }

  return (
    <hr
      className={`tf-action-divider tf-action-divider--${variant} ${className}`}
      data-testid={testId}
      {...rest}
    />
  );
};

export default ActionDivider;
