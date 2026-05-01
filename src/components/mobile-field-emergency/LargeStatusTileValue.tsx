import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for LargeStatusTileValue.
 */
export interface LargeStatusTileValueProps {
  /** Numeric or string value. */
  value: string | number;
  /** Unit suffix. */
  unit?: string;
  /** Font size tier. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Monospace numeric display. */
  monospace?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * LargeStatusTileValue — large status value display.
 *
 * Renders the primary metric value in an oversized, highly legible typeface.
 * Monospace mode ensures numbers don't jitter during live updates.
 */
export const LargeStatusTileValue: React.FC<LargeStatusTileValueProps> = ({
  value,
  unit,
  size = 'lg',
  monospace = true,
  className = '',
  testId,
}) => {
  const sizeClass = `tf-large-status-tile-value--${size}`;
  const monoClass = monospace ? 'tf-large-status-tile-value--mono' : '';

  return (
    <span
      data-testid={testId}
      className={[
        'tf-large-status-tile-value',
        sizeClass,
        monoClass,
        className,
      ].join(' ')}
    >
      {value}
      {unit && (
        <span className="tf-large-status-tile-value__unit">{unit}</span>
      )}
    </span>
  );
};

LargeStatusTileValue.displayName = 'LargeStatusTileValue';

export default LargeStatusTileValue;
