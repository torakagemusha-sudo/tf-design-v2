import React from 'react';
import { cn } from '@/utils/cn';

/**
 * DestructiveModalConfirm — renders the confirmation input field where
 * the user must type a specific phrase to enable the destructive action.
 *
 * @example
 * ```tsx
 * <DestructiveModalConfirm
 *   label='Type "DELETE" to confirm'
 *   value={input}
 *   onChange={setInput}
 * />
 * ```
 */
export interface DestructiveModalConfirmProps {
  /** Input label text. */
  label: string;
  /** Current input value. */
  value: string;
  /** Callback when input value changes. */
  onChange: (value: string) => void;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Additional class names. */
  className?: string;
}

export const DestructiveModalConfirm: React.FC<DestructiveModalConfirmProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Type confirmation phrase',
  disabled,
  className,
}) => {
  return (
    <div
      className={cn('tf-destructive-modal-confirm mt-4', className)}
      data-testid="destructive-modal-confirm"
    >
      <label
        htmlFor="destructive-confirm-input"
        className="tf-destructive-modal-confirm__label block text-xs font-medium text-steel-400 mb-1.5"
      >
        {label}
      </label>
      <input
        id="destructive-confirm-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'tf-destructive-modal-confirm__input',
          'w-full rounded border bg-steel-950 px-3 py-2 text-sm text-white',
          'border-steel-700 placeholder-steel-600',
          'focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/30',
          'disabled:opacity-50 disabled:pointer-events-none',
          'transition-colors duration-150'
        )}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
};

export default DestructiveModalConfirm;
