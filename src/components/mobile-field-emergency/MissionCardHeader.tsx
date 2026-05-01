import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for MissionCardHeader.
 */
export interface MissionCardHeaderProps {
  /** Mission title. */
  title: string;
  /** Priority badge text. */
  priority?: string;
  /** Mission type or category. */
  category?: string;
  /** Optional icon. */
  icon?: React.ReactNode;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MissionCardHeader — mission header with title, priority badge, and category.
 *
 * Rendered inside MissionCard to provide the primary identity block.
 */
export const MissionCardHeader: React.FC<MissionCardHeaderProps> = ({
  title,
  priority,
  category,
  icon,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-mission-card-header', className].join(' ')}
    >
      {icon && (
        <span className="tf-mission-card-header__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="tf-mission-card-header__text">
        <h3 className="tf-mission-card-header__title">{title}</h3>
        {category && (
          <span className="tf-mission-card-header__category">{category}</span>
        )}
      </div>
      {priority && (
        <span
          className={`tf-mission-card-header__badge tf-mission-card-header__badge--${priority.toLowerCase()}`}
        >
          {priority}
        </span>
      )}
    </div>
  );
};

MissionCardHeader.displayName = 'MissionCardHeader';

export default MissionCardHeader;
