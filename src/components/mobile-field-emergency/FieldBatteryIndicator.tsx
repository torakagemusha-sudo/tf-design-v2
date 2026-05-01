import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldBatteryIndicator.
 */
export interface FieldBatteryIndicatorProps {
  /** Battery level 0-100. */
  level: number;
  /** Whether charging. */
  charging?: boolean;
  /** Whether in power-save mode. */
  powerSave?: boolean;
  /** Show percentage text. */
  showPercentage?: boolean;
  /** Compact icon-only mode. */
  compact?: boolean;
  /** Low battery threshold. */
  lowThreshold?: number;
  /** Critical battery threshold. */
  criticalThreshold?: number;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldBatteryIndicator — battery level.
 *
 * Visual battery indicator with colour-coded severity levels.
 * Pulsing red animation when battery is critically low.
 * Charging indicator shows bolt icon and green tint.
 * Compact mode for status bar integration.
 */
export const FieldBatteryIndicator: React.FC<FieldBatteryIndicatorProps> = ({
  level,
  charging = false,
  powerSave = false,
  showPercentage = true,
  compact = false,
  lowThreshold = 20,
  criticalThreshold = 10,
  className = '',
  testId,
}) => {
  const isLow = level <= lowThreshold && level > criticalThreshold;
  const isCritical = level <= criticalThreshold;
  const severityClass = isCritical
    ? 'tf-battery--critical'
    : isLow
      ? 'tf-battery--low'
      : 'tf-battery--normal';
  const chargingClass = charging ? 'tf-battery--charging' : '';
  const powerSaveClass = powerSave ? 'tf-battery--power-save' : '';
  const compactClass = compact ? 'tf-battery--compact' : '';

  return (
    <div
      data-testid={testId}
      data-level={level}
      className={[
        'tf-battery',
        severityClass,
        chargingClass,
        powerSaveClass,
        compactClass,
        className,
      ].join(' ')}
      role="img"
      aria-label={`Battery ${level}%${charging ? ', charging' : ''}${powerSave ? ', power save' : ''}`}
    >
      {/* Battery body */}
      <div className="tf-battery__body" aria-hidden="true">
        {/* Fill */}
        <div
          className="tf-battery__fill"
          style={{ width: `${Math.max(0, Math.min(100, level))}%` }}
        />

        {/* Charging bolt */}
        {charging && (
          <span className="tf-battery__bolt">⚡</span>
        )}

        {/* Pulse animation for critical */}
        {isCritical && (
          <div className="tf-battery__pulse" aria-hidden="true" />
        )}
      </div>

      {/* Terminal nub */}
      <div className="tf-battery__nub" aria-hidden="true" />

      {/* Percentage text */}
      {showPercentage && (
        <span className="tf-battery__percent">{Math.round(level)}%</span>
      )}

      {/* Power save indicator */}
      {powerSave && (
        <span className="tf-battery__power-save-badge">ECO</span>
      )}
    </div>
  );
};

FieldBatteryIndicator.displayName = 'FieldBatteryIndicator';

export default FieldBatteryIndicator;
