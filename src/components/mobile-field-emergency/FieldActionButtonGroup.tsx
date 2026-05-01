import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Layout orientation for the button group.
 */
export type FieldActionButtonGroupOrientation = 'horizontal' | 'vertical';

/**
 * Props for FieldActionButtonGroup.
 */
export interface FieldActionButtonGroupProps {
  /** Child buttons (typically FieldActionButton elements). */
  children: React.ReactNode;
  /** Visual layout. */
  orientation?: FieldActionButtonGroupOrientation;
  /** Gap between buttons. */
  gap?: 'none' | 'tight' | 'normal' | 'loose';
  /** Whether buttons should share a unified border/frame. */
  unified?: boolean;
  /** Sticky footer mode for mobile. */
  sticky?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldActionButtonGroup — groups field buttons with consistent spacing.
 *
 * Supports horizontal (side-by-side) and vertical (stacked) layouts.
 * Sticky footer mode keeps actions anchored at screen bottom during scroll.
 */
export const FieldActionButtonGroup: React.FC<FieldActionButtonGroupProps> = ({
  children,
  orientation = 'vertical',
  gap = 'normal',
  unified = false,
  sticky = false,
  className = '',
  testId,
}) => {
  const orientClass = `tf-field-btn-group--${orientation}`;
  const gapClass = `tf-field-btn-group--gap-${gap}`;
  const unifiedClass = unified ? 'tf-field-btn-group--unified' : '';
  const stickyClass = sticky ? 'tf-field-btn-group--sticky' : '';

  return (
    <div
      data-testid={testId}
      role="group"
      className={[
        'tf-field-btn-group',
        orientClass,
        gapClass,
        unifiedClass,
        stickyClass,
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
};

FieldActionButtonGroup.displayName = 'FieldActionButtonGroup';

export default FieldActionButtonGroup;
