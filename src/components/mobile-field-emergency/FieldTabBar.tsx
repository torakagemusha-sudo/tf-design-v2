import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldTabBar.
 */
export interface FieldTabBarProps {
  /** Composed FieldTabItem children. */
  children: React.ReactNode;
  /** Active tab index. */
  activeIndex?: number;
  /** Sticky bottom bar. */
  sticky?: boolean;
  /** Variant. */
  variant?: 'default' | 'pills' | 'underlined';
  /** Background variant. */
  background?: 'solid' | 'translucent';
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldTabBar — mobile tab bar.
 *
 * Bottom-anchored tab bar for primary navigation between field screens.
 * Sticky mode keeps tabs visible at all times.
 * Supports default (icon + label), pills, and underlined variants.
 * Translucent background for modern glassmorphism aesthetic.
 */
export const FieldTabBar: React.FC<FieldTabBarProps> = ({
  children,
  activeIndex = 0,
  sticky = true,
  variant = 'default',
  background = 'solid',
  className = '',
  testId,
}) => {
  const stickyClass = sticky ? 'tf-tab-bar--sticky' : '';
  const variantClass = `tf-tab-bar--${variant}`;
  const bgClass = `tf-tab-bar--bg-${background}`;

  return (
    <nav
      data-testid={testId}
      data-active-index={activeIndex}
      className={[
        'tf-tab-bar',
        stickyClass,
        variantClass,
        bgClass,
        className,
      ].join(' ')}
      role="tablist"
      aria-label="Field navigation"
    >
      <div className="tf-tab-bar__inner">{children}</div>
    </nav>
  );
};

FieldTabBar.displayName = 'FieldTabBar';

export default FieldTabBar;
