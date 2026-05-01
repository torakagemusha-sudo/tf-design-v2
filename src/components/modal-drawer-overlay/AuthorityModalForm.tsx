import React from 'react';
import { cn } from '@/utils/cn';

/**
 * AuthorityModalForm — credential input form for authority escalation.
 * Collects identifier and passphrase with security-conscious field types.
 *
 * @example
 * ```tsx
 * <AuthorityModalForm
 *   identifier={id}
 *   passphrase={pass}
 *   onIdentifierChange={setId}
 *   onPassphraseChange={setPass}
 *   requiredLevel={3}
 * />
 * ```
 */
export interface AuthorityModalFormProps {
  /** Current identifier value. */
  identifier: string;
  /** Current passphrase value. */
  passphrase: string;
  /** Callback when identifier changes. */
  onIdentifierChange: (value: string) => void;
  /** Callback when passphrase changes. */
  onPassphraseChange: (value: string) => void;
  /** Required authority level. */
  requiredLevel?: number;
  /** Reason for the escalation request. */
  reason?: string;
  /** Whether the form fields are disabled. */
  disabled?: boolean;
  /** Additional class names. */
  className?: string;
}

export const AuthorityModalForm: React.FC<AuthorityModalFormProps> = ({
  identifier,
  passphrase,
  onIdentifierChange,
  onPassphraseChange,
  requiredLevel = 2,
  reason,
  disabled,
  className,
}) => {
  return (
    <div
      className={cn('tf-authority-modal-form space-y-4', className)}
      data-testid="authority-modal-form"
    >
      {reason && (
        <p className="tf-authority-modal-form__reason text-sm text-steel-300">
          {reason}
        </p>
      )}

      <div className="tf-authority-modal-form__field">
        <label
          htmlFor="auth-identifier"
          className="block text-xs font-medium text-steel-400 mb-1"
        >
          Identifier
        </label>
        <input
          id="auth-identifier"
          type="text"
          value={identifier}
          onChange={(e) => onIdentifierChange(e.target.value)}
          placeholder="Enter your identifier"
          disabled={disabled}
          className={cn(
            'tf-authority-modal-form__input',
            'w-full rounded border bg-steel-950 px-3 py-2 text-sm text-white',
            'border-steel-700 placeholder-steel-600',
            'focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30',
            'disabled:opacity-50'
          )}
          autoComplete="off"
        />
      </div>

      <div className="tf-authority-modal-form__field">
        <label
          htmlFor="auth-passphrase"
          className="block text-xs font-medium text-steel-400 mb-1"
        >
          Passphrase (Level {requiredLevel})
        </label>
        <input
          id="auth-passphrase"
          type="password"
          value={passphrase}
          onChange={(e) => onPassphraseChange(e.target.value)}
          placeholder="Enter passphrase"
          disabled={disabled}
          className={cn(
            'tf-authority-modal-form__input',
            'w-full rounded border bg-steel-950 px-3 py-2 text-sm text-white',
            'border-steel-700 placeholder-steel-600',
            'focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30',
            'disabled:opacity-50'
          )}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default AuthorityModalForm;
