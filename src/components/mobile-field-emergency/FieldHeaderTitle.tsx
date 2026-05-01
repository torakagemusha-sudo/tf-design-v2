import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldHeaderTitle.
 */
export interface FieldHeaderTitleProps {
  /** Page title text. */
  title: string;
  /** Optional subtitle. */
  subtitle?: string;
  /** Truncate on overflow. */
  truncate?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldHeaderTitle — page title for field header.
 *
 * Centred in the header area. Truncates with ellipsis to prevent
 * layout breakage on narrow viewports.
 */
export const FieldHeaderTitle: React.FC<FieldHeaderTitleProps> = ({
  title,
  subtitle,
  truncate = true,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-field-header-title', className].join(' ')}
    >
      <h1
        className={[
          'tf-field-header-title__text',
          truncate ? 'tf-field-header-title--truncate' : '',
        ].join(' ')}
      >
        {title}
      </h1>
      {subtitle && (
        <span className="tf-field-header-title__subtitle">{subtitle}</span>
      )}
    </div>
  );
};

FieldHeaderTitle.displayName = 'FieldHeaderTitle';

export default FieldHeaderTitle;
