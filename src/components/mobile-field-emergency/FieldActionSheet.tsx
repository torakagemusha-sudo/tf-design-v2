import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldActionSheet.
 */
export interface FieldActionSheetProps {
  /** Controls visibility. */
  isOpen: boolean;
  /** Title displayed in the sheet header. */
  title?: string;
  /** Subtitle or description. */
  subtitle?: string;
  /** Action items as children. */
  children: React.ReactNode;
  /** Dismiss handler (backdrop tap). */
  onDismiss: () => void;
  /** Whether tapping the backdrop dismisses. */
  dismissible?: boolean;
  /** Height mode. */
  height?: 'auto' | 'half' | 'full';
  /** Test id. */
  testId?: string;
  /** Additional className. */
  className?: string;
}

/**
 * FieldActionSheet — bottom action sheet for mobile.
 *
 * Slides up from the bottom of the viewport with a dark backdrop overlay.
 * Provides a focused, touch-optimised menu for contextual actions.
 * Supports three height tiers: auto (content-fit), half (50% screen), full (100%).
 */
export const FieldActionSheet: React.FC<FieldActionSheetProps> = ({
  isOpen,
  title,
  subtitle,
  children,
  onDismiss,
  dismissible = true,
  height = 'auto',
  testId,
  className = '',
}) => {
  if (!isOpen) return null;

  const heightClass = `tf-action-sheet--${height}`;

  return (
    <div
      data-testid={testId}
      className={['tf-action-sheet', heightClass, className].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Action sheet'}
    >
      {/* Backdrop */}
      <div
        className="tf-action-sheet__backdrop"
        onClick={() => dismissible && onDismiss()}
        aria-hidden="true"
      />

      {/* Sheet panel */}
      <div className="tf-action-sheet__panel">
        {/* Drag handle */}
        <div className="tf-action-sheet__handle" aria-hidden="true" />

        {/* Header */}
        {(title || subtitle) && (
          <div className="tf-action-sheet__header">
            {title && (
              <h3 className="tf-action-sheet__title">{title}</h3>
            )}
            {subtitle && (
              <p className="tf-action-sheet__subtitle">{subtitle}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="tf-action-sheet__body" role="menu">
          {children}
        </div>
      </div>
    </div>
  );
};

FieldActionSheet.displayName = 'FieldActionSheet';

export default FieldActionSheet;
