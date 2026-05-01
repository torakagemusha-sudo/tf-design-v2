import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for MapCommandButton.
 */
export interface MapCommandButtonProps {
  /** Command label. */
  label: string;
  /** Icon element. */
  icon?: React.ReactNode;
  /** Press handler. */
  onPress: () => void;
  /** Visual variant. */
  variant?: 'primary' | 'danger' | 'governed' | 'neutral';
  /** Size tier. */
  size?: 'sm' | 'md' | 'lg';
  /** Active/selected state. */
  active?: boolean;
  /** Badge count. */
  badge?: number;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MapCommandButton — map-located command button.
 *
 * Circular button designed for overlay on map coordinates.
 * Primary variant for affirmative actions, danger for emergency commands.
 * Badge shows item counts (e.g., units in sector).
 */
export const MapCommandButton: React.FC<MapCommandButtonProps> = ({
  label,
  icon,
  onPress,
  variant = 'primary',
  size = 'md',
  active = false,
  badge,
  className = '',
  testId,
}) => {
  const variantClass = `tf-map-cmd-btn--${variant}`;
  const sizeClass = `tf-map-cmd-btn--${size}`;
  const activeClass = active ? 'tf-map-cmd-btn--active' : '';

  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={label}
      onClick={onPress}
      className={[
        'tf-map-cmd-btn',
        variantClass,
        sizeClass,
        activeClass,
        className,
      ].join(' ')}
    >
      {icon && (
        <span className="tf-map-cmd-btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="tf-map-cmd-btn__label">{label}</span>
      {badge !== undefined && (
        <span className="tf-map-cmd-btn__badge">{badge}</span>
      )}
    </button>
  );
};

MapCommandButton.displayName = 'MapCommandButton';

export default MapCommandButton;
