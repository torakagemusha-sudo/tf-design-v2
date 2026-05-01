import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Signal strength tiers.
 */
export type SignalStrength = 'none' | 'poor' | 'fair' | 'good' | 'excellent';

/**
 * Network type.
 */
export type NetworkType = 'none' | '2g' | '3g' | '4g' | '5g' | 'wifi' | 'satellite';

/**
 * Props for FieldSignalIndicator.
 */
export interface FieldSignalIndicatorProps {
  /** Signal strength tier. */
  strength: SignalStrength;
  /** Network type. */
  networkType?: NetworkType;
  /** Carrier name. */
  carrier?: string;
  /** Whether roaming. */
  roaming?: boolean;
  /** Compact icon-only. */
  compact?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldSignalIndicator — signal strength.
 *
 * Multi-bar signal indicator with 1-4 filled bars.
 * Colour transitions from red (poor) through amber to green (excellent).
 * Shows network type (5G, 4G, etc.) and carrier for diagnostics.
 * Satellite network type for remote field operations.
 */
export const FieldSignalIndicator: React.FC<FieldSignalIndicatorProps> = ({
  strength,
  networkType = '4g',
  carrier,
  roaming = false,
  compact = false,
  className = '',
  testId,
}) => {
  const bars = {
    none: 0,
    poor: 1,
    fair: 2,
    good: 3,
    excellent: 4,
  }[strength];

  const strengthClass = `tf-signal--${strength}`;
  const compactClass = compact ? 'tf-signal--compact' : '';

  return (
    <div
      data-testid={testId}
      className={['tf-signal', strengthClass, compactClass, className].join(' ')}
      role="img"
      aria-label={`Signal strength: ${strength}, ${networkType}${roaming ? ', roaming' : ''}`}
    >
      {/* Bars */}
      <div className="tf-signal__bars" aria-hidden="true">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={[
              'tf-signal__bar',
              bar <= bars ? 'tf-signal__bar--filled' : '',
            ].join(' ')}
          />
        ))}
      </div>

      {/* Network type */}
      <span className="tf-signal__network">{networkType.toUpperCase()}</span>

      {/* Full info */}
      {!compact && (
        <div className="tf-signal__info">
          {carrier && (
            <span className="tf-signal__carrier">{carrier}</span>
          )}
          {roaming && (
            <span className="tf-signal__roaming">R</span>
          )}
        </div>
      )}
    </div>
  );
};

FieldSignalIndicator.displayName = 'FieldSignalIndicator';

export default FieldSignalIndicator;
