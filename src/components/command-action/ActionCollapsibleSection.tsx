import React, { useState } from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the ActionCollapsibleSection component.
 * Collapsible section for action details.
 */
export interface ActionCollapsibleSectionProps extends TorafirmaComponentBaseProps {
  /** Section title */
  title: string;
  /** Section content */
  children: React.ReactNode;
  /** Whether the section is open by default */
  defaultOpen?: boolean;
  /** Optional badge count to display */
  badgeCount?: number;
}

/**
 * ActionCollapsibleSection — collapsible section for action details.
 *
 * Renders a collapsible panel that can be expanded or collapsed
 * to show or hide detailed action information. Supports an
 * optional badge count indicating the number of items within.
 *
 * @example
 * ```tsx
 * <ActionCollapsibleSection title="Advanced Options" defaultOpen={false} badgeCount={3}>
 *   <div>Additional configuration fields...</div>
 * </ActionCollapsibleSection>
 * ```
 */
const ActionCollapsibleSection: React.FC<ActionCollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = true,
  badgeCount,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`tf-action-collapsible-section ${open ? 'tf-action-collapsible-section--open' : 'tf-action-collapsible-section--closed'} ${className}`}
      data-testid={testId}
      {...rest}
    >
      <button
        type="button"
        className="tf-action-collapsible-section__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="tf-action-collapsible-section__title">{title}</span>
        {badgeCount !== undefined && (
          <span className="tf-action-collapsible-section__badge">{badgeCount}</span>
        )}
        <span className="tf-action-collapsible-section__toggle" aria-hidden="true">
          {open ? '&#9660;' : '&#9654;'}
        </span>
      </button>
      {open && (
        <div className="tf-action-collapsible-section__content">
          {children}
        </div>
      )}
    </div>
  );
};

export default ActionCollapsibleSection;
