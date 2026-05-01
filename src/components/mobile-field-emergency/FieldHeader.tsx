import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldHeader.
 */
export interface FieldHeaderProps {
  /** Composed children (back, title, actions). */
  children?: React.ReactNode;
  /** Sticky header mode. */
  sticky?: boolean;
  /** Background variant. */
  variant?: 'default' | 'transparent' | 'governed';
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldHeader — mobile field header.
 *
 * Sticky top bar for mobile field screens.
 * Designed for one-handed operation with back button on the left,
 * title centred, and action buttons on the right.
 * Compact height (56 px) maximises viewport for content.
 */
export const FieldHeader: React.FC<FieldHeaderProps> = ({
  children,
  sticky = true,
  variant = 'default',
  className = '',
  testId,
}) => {
  const stickyClass = sticky ? 'tf-field-header--sticky' : '';
  const variantClass = `tf-field-header--${variant}`;

  return (
    <header
      data-testid={testId}
      className={[
        'tf-field-header',
        stickyClass,
        variantClass,
        className,
      ].join(' ')}
      role="banner"
    >
      <div className="tf-field-header__inner">{children}</div>
    </header>
  );
};

FieldHeader.displayName = 'FieldHeader';

export default FieldHeader;
