import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldChecklistItem.
 */
export interface FieldChecklistItemProps {
  /** Item ID. */
  id: string;
  /** Item text. */
  text: string;
  /** Checked state. */
  checked?: boolean;
  /** Required. */
  required?: boolean;
  /** Disabled. */
  disabled?: boolean;
  /** Notes text. */
  notes?: string;
  /** Toggle handler. */
  onToggle: (itemId: string) => void;
  /** Note add handler. */
  onAddNote?: (itemId: string) => void;
  /** Timestamp when checked. */
  checkedAt?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldChecklistItem — checklist item.
 *
 * Individual checklist row with checkbox, label, and optional notes.
 * 56 px minimum touch target for gloved operation.
 * Required marker prevents checklist completion until addressed.
 * Timestamp records when each item was checked for audit trails.
 */
export const FieldChecklistItem: React.FC<FieldChecklistItemProps> = ({
  id,
  text,
  checked = false,
  required = false,
  disabled = false,
  notes,
  onToggle,
  onAddNote,
  checkedAt,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      data-checked={checked}
      className={[
        'tf-checklist-item',
        checked ? 'tf-checklist-item--checked' : '',
        required ? 'tf-checklist-item--required' : '',
        disabled ? 'tf-checklist-item--disabled' : '',
        className,
      ].join(' ')}
    >
      {/* Toggle button */}
      <button
        type="button"
        className="tf-checklist-item__toggle"
        onClick={() => onToggle(id)}
        disabled={disabled}
        aria-pressed={checked}
      >
        {/* Checkbox visual */}
        <span className="tf-checklist-item__box" aria-hidden="true">
          {checked ? (
            <span className="tf-checklist-item__check">✓</span>
          ) : required ? (
            <span className="tf-checklist-item__req-dot">◆</span>
          ) : (
            <span className="tf-checklist-item__empty">○</span>
          )}
        </span>

        {/* Text */}
        <span className="tf-checklist-item__text">{text}</span>

        {/* Required badge */}
        {required && !checked && (
          <span className="tf-checklist-item__badge">REQ</span>
        )}
      </button>

      {/* Notes area */}
      {(notes || onAddNote) && (
        <div className="tf-checklist-item__notes">
          {notes && <span className="tf-checklist-item__note-text">{notes}</span>}
          {checkedAt && (
            <time className="tf-checklist-item__timestamp" dateTime={checkedAt}>
              {checkedAt}
            </time>
          )}
          {onAddNote && (
            <button
              type="button"
              className="tf-checklist-item__note-btn"
              onClick={() => onAddNote(id)}
              aria-label={`Add note to ${text}`}
            >
              📝
            </button>
          )}
        </div>
      )}
    </div>
  );
};

FieldChecklistItem.displayName = 'FieldChecklistItem';

export default FieldChecklistItem;
