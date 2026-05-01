import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldNavigationItem.
 */
export interface FieldNavigationItemProps {
  /** Item label. */
  label: string;
  /** Item icon. */
  icon?: React.ReactNode;
  /** Press handler. */
  onPress: () => void;
  /** Whether this item is the active route. */
  active?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  /** Badge count. */
  badge?: number;
  /** Divider below this item. */
  divider?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldNavigationItem — nav item inside the drawer.
 *
 * 48 px minimum touch target with icon + label layout.
 * Active state renders with accent background for current-route indication.
 * Divider prop adds a separator line below the item for logical grouping.
 */
export const FieldNavigationItem: React.FC<FieldNavigationItemProps> = ({
  label,
  icon,
  onPress,
  active = false,
  disabled = false,
  badge,
  divider = false,
  className = '',
  testId,
}) => {
  const activeClass = active ? 'tf-nav-item--active' : '';
  const disabledClass = disabled ? 'tf-nav-item--disabled' : '';

  return (
    <li
      className={[
        'tf-nav-item__wrapper',
        divider ? 'tf-nav-item__wrapper--divider' : '',
      ].join(' ')}
      role="listitem"
    >
      <button
        type="button"
        data-testid={testId}
        aria-current={active ? 'page' : undefined}
        aria-label={label}
        disabled={disabled}
        onClick={onPress}
        className={['tf-nav-item', activeClass, disabledClass, className].join(
          ' '
        )}
      >
        {icon && (
          <span className="tf-nav-item__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="tf-nav-item__label">{label}</span>
        {badge !== undefined && badge > 0 && (
          <span className="tf-nav-item__badge">{badge}</span>
        )}
      </button>
    </li>
  );
};

FieldNavigationItem.displayName = 'FieldNavigationItem';

export default FieldNavigationItem;
