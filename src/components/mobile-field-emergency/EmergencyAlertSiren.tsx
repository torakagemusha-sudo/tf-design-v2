import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for EmergencyAlertSiren.
 */
export interface EmergencyAlertSirenProps {
  /** Active state — controls animation. */
  active: boolean;
  /** Siren variant. */
  variant?: 'rotating' | 'strobe' | 'pulse';
  /** Colour override. */
  color?: 'red' | 'amber' | 'blue';
  /** Size tier. */
  size?: 'sm' | 'md' | 'lg';
  /** Label below siren. */
  label?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * EmergencyAlertSiren — visual siren indicator.
 *
 * Animated siren light for emergency alert states.
 * Three animation modes: rotating (classic beacon), strobe (rapid flash),
 * pulse (gentle breathing). Red for emergency, amber for caution, blue for advisory.
 */
export const EmergencyAlertSiren: React.FC<EmergencyAlertSirenProps> = ({
  active,
  variant = 'rotating',
  color = 'red',
  size = 'md',
  label,
  className = '',
  testId,
}) => {
  const variantClass = `tf-alert-siren--${variant}`;
  const colorClass = `tf-alert-siren--${color}`;
  const sizeClass = `tf-alert-siren--${size}`;
  const activeClass = active ? 'tf-alert-siren--active' : '';

  return (
    <div
      data-testid={testId}
      className={[
        'tf-alert-siren',
        variantClass,
        colorClass,
        sizeClass,
        activeClass,
        className,
      ].join(' ')}
      role="alert"
      aria-live="assertive"
    >
      {/* Siren dome */}
      <div className="tf-alert-siren__dome" aria-hidden="true">
        {/* Light source */}
        <div className="tf-alert-siren__light" />

        {/* Rotating beam (rotating variant) */}
        {variant === 'rotating' && (
          <div className="tf-alert-siren__beam" />
        )}

        {/* Strobe flashes */}
        {variant === 'strobe' && (
          <>
            <div className="tf-alert-siren__flash tf-alert-siren__flash--1" />
            <div className="tf-alert-siren__flash tf-alert-siren__flash--2" />
          </>
        )}
      </div>

      {/* Base */}
      <div className="tf-alert-siren__base" aria-hidden="true" />

      {/* Label */}
      {label && (
        <span className="tf-alert-siren__label">{label}</span>
      )}

      {/* Screen-edge flash overlay */}
      {active && variant === 'strobe' && (
        <div className="tf-alert-siren__screen-flash" aria-hidden="true" />
      )}
    </div>
  );
};

EmergencyAlertSiren.displayName = 'EmergencyAlertSiren';

export default EmergencyAlertSiren;
