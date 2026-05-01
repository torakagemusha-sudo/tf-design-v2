import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldFormSheet.
 */
export interface FieldFormSheetProps {
  /** Whether the sheet is open. */
  isOpen: boolean;
  /** Sheet title. */
  title?: string;
  /** Form content. */
  children: React.ReactNode;
  /** Close handler. */
  onClose: () => void;
  /** Submit handler. */
  onSubmit?: () => void;
  /** Submit button label. */
  submitLabel?: string;
  /** Sheet height mode. */
  height?: 'auto' | 'half' | 'full';
  /** Enable drag handle. */
  draggable?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldFormSheet — bottom sheet form.
 *
 * Slides up from the bottom to reveal a form context.
 * Half-height default leaves map/content visible underneath.
 * Drag handle supports swipe-to-dismiss for natural mobile UX.
 * Submit button anchored at the bottom for thumb accessibility.
 */
export const FieldFormSheet: React.FC<FieldFormSheetProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
  submitLabel = 'Save',
  height = 'half',
  draggable = true,
  className = '',
  testId,
}) => {
  if (!isOpen) return null;

  const heightClass = `tf-form-sheet--${height}`;

  return (
    <div
      data-testid={testId}
      className={['tf-form-sheet', heightClass, className].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Form sheet'}
    >
      {/* Backdrop */}
      <div className="tf-form-sheet__backdrop" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div className="tf-form-sheet__panel">
        {/* Drag handle */}
        {draggable && (
          <div className="tf-form-sheet__drag-handle" aria-hidden="true">
            <div className="tf-form-sheet__drag-bar" />
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="tf-form-sheet__header">
            <h3 className="tf-form-sheet__title">{title}</h3>
            <button
              type="button"
              className="tf-form-sheet__close"
              onClick={onClose}
              aria-label="Close form"
            >
              ✕
            </button>
          </div>
        )}

        {/* Form body */}
        <div className="tf-form-sheet__body">{children}</div>

        {/* Footer with submit */}
        {onSubmit && (
          <div className="tf-form-sheet__footer">
            <button
              type="button"
              className="tf-form-sheet__submit"
              onClick={onSubmit}
            >
              {submitLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

FieldFormSheet.displayName = 'FieldFormSheet';

export default FieldFormSheet;
