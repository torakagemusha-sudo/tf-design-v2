import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldTabItem.
 */
export interface FieldTabItemProps {
  /** Tab label. */
  label: string;
  /** Tab icon. */
  icon?: React.ReactNode;
  /** Whether this tab is active. */
  active?: boolean;
  /** Press handler. */
  onPress: () => void;
  /** Badge count. */
  badge?: number;
  /** Disabled state. */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldTabItem — individual tab in the field tab bar.
 *
 * 56 px minimum touch target. Icon + label layout optimised for
 * bottom-of-screen thumb reachability.
 * Active state renders with accent colour and optional indicator line.
 * Badge shows notification counts per tab.
 */
export const FieldTabItem: React.FC<FieldTabItemProps> = ({
  label,
  icon,
  active = false,
  onPress,
  badge,
  disabled = false,
  className = '',
  testId,
}) => {
  const activeClass = active ? 'tf-tab-item--active' : '';

  return (
    <button
      type="button"
      data-testid={testId}
      role="tab"
      aria-selected={active}
      aria-label={label}
      disabled={disabled}
      onClick={onPress}
      className={['tf-tab-item', activeClass, className].join(' ')}
    >
      <div className="tf-tab-item__content">
        {icon && (
          <span className="tf-tab-item__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="tf-tab-item__label">{label}</span>
        {badge !== undefined && badge > 0 && (
          <span className="tf-tab-item__badge">{badge}</span>
        )}
      </div>

      {/* Active indicator */}
      {active && (
        <div className="tf-tab-item__indicator" aria-hidden="true" />
      )}
    </button>
  );
};

FieldTabItem.displayName = 'FieldTabItem';

export default FieldTabItem;
