import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for LargeStatusTileLabel.
 */
export interface LargeStatusTileLabelProps {
  /** Label text — keep to 2-3 words for mobile. */
  label: string;
  /** Optional sub-label or category. */
  subLabel?: string;
  /** Truncate with ellipsis on overflow. */
  truncate?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * LargeStatusTileLabel — status label beneath the value.
 *
 * Provides context for what the status value represents.
 * Truncates with ellipsis to prevent layout breakage in constrained tiles.
 */
export const LargeStatusTileLabel: React.FC<LargeStatusTileLabelProps> = ({
  label,
  subLabel,
  truncate = true,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-large-status-tile-label', className].join(' ')}
    >
      <span
        className={[
          'tf-large-status-tile-label__text',
          truncate ? 'tf-large-status-tile-label--truncate' : '',
        ].join(' ')}
      >
        {label}
      </span>
      {subLabel && (
        <span className="tf-large-status-tile-label__sub">{subLabel}</span>
      )}
    </div>
  );
};

LargeStatusTileLabel.displayName = 'LargeStatusTileLabel';

export default LargeStatusTileLabel;
