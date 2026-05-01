import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldFooter.
 */
export interface FieldFooterProps {
  /** Composed children (primary + secondary actions). */
  children?: React.ReactNode;
  /** Sticky footer mode. */
  sticky?: boolean;
  /** Background variant. */
  variant?: 'default' | 'elevated' | 'transparent';
  /** Safe-area inset for notched devices. */
  safeAreaInset?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldFooter — mobile footer toolbar.
 *
 * Anchored at the bottom of the viewport.
 * Sticky mode ensures actions remain reachable during scroll.
 * Elevated variant adds a shadow for visual separation from content.
 * Safe-area inset respects device home indicators and notches.
 */
export const FieldFooter: React.FC<FieldFooterProps> = ({
  children,
  sticky = true,
  variant = 'elevated',
  safeAreaInset = true,
  className = '',
  testId,
}) => {
  const stickyClass = sticky ? 'tf-field-footer--sticky' : '';
  const variantClass = `tf-field-footer--${variant}`;
  const safeClass = safeAreaInset ? 'tf-field-footer--safe-area' : '';

  return (
    <footer
      data-testid={testId}
      className={[
        'tf-field-footer',
        stickyClass,
        variantClass,
        safeClass,
        className,
      ].join(' ')}
      role="contentinfo"
    >
      <div className="tf-field-footer__inner">{children}</div>
    </footer>
  );
};

FieldFooter.displayName = 'FieldFooter';

export default FieldFooter;
