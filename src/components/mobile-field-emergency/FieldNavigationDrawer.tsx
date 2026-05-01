import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldNavigationDrawer.
 */
export interface FieldNavigationDrawerProps {
  /** Whether drawer is open. */
  isOpen: boolean;
  /** Drawer title / user name. */
  title?: string;
  /** Subtitle / role. */
  subtitle?: string;
  /** Composed nav items. */
  children: React.ReactNode;
  /** Close handler (backdrop or swipe). */
  onClose: () => void;
  /** Which side the drawer opens from. */
  side?: 'left' | 'right';
  /** Drawer width class. */
  width?: 'narrow' | 'default' | 'wide';
  /** Swipe to dismiss. */
  swipeToDismiss?: boolean;
  /** Footer content (e.g., logout). */
  footer?: React.ReactNode;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldNavigationDrawer — mobile nav drawer.
 *
 * Slides in from left (default) or right with a dark backdrop overlay.
 * Swipe-to-dismiss for natural mobile interaction.
 * Supports user profile header in the drawer top section.
 */
export const FieldNavigationDrawer: React.FC<FieldNavigationDrawerProps> = ({
  isOpen,
  title,
  subtitle,
  children,
  onClose,
  side = 'left',
  width = 'default',
  swipeToDismiss = true,
  footer,
  className = '',
  testId,
}) => {
  if (!isOpen) return null;

  const sideClass = `tf-nav-drawer--${side}`;
  const widthClass = `tf-nav-drawer--${width}`;
  const swipeClass = swipeToDismiss ? 'tf-nav-drawer--swipe' : '';

  return (
    <div
      data-testid={testId}
      className={['tf-nav-drawer', sideClass, widthClass, swipeClass, className].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation drawer"
    >
      {/* Backdrop */}
      <div
        className="tf-nav-drawer__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="tf-nav-drawer__panel">
        {/* Profile header */}
        {(title || subtitle) && (
          <div className="tf-nav-drawer__profile">
            <div className="tf-nav-drawer__avatar" aria-hidden="true">
              {title ? title.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="tf-nav-drawer__profile-text">
              {title && (
                <span className="tf-nav-drawer__name">{title}</span>
              )}
              {subtitle && (
                <span className="tf-nav-drawer__role">{subtitle}</span>
              )}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="tf-nav-drawer__divider" aria-hidden="true" />

        {/* Navigation items */}
        <nav className="tf-nav-drawer__nav" role="navigation" aria-label="Field navigation">
          <ul className="tf-nav-drawer__list" role="list">
            {children}
          </ul>
        </nav>

        {/* Footer */}
        {footer && (
          <div className="tf-nav-drawer__footer">{footer}</div>
        )}
      </div>
    </div>
  );
};

FieldNavigationDrawer.displayName = 'FieldNavigationDrawer';

export default FieldNavigationDrawer;
