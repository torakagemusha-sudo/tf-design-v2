import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Checklist item data.
 */
export interface ChecklistItemData {
  /** Item ID. */
  id: string;
  /** Item text. */
  text: string;
  /** Checked state. */
  checked?: boolean;
  /** Required item. */
  required?: boolean;
  /** Disabled. */
  disabled?: boolean;
  /** Notes. */
  notes?: string;
}

/**
 * Props for FieldChecklist.
 */
export interface FieldChecklistProps {
  /** Checklist title. */
  title?: string;
  /** Items. */
  items: ChecklistItemData[];
  /** Toggle handler. */
  onToggle: (itemId: string) => void;
  /** Add note handler. */
  onAddNote?: (itemId: string, note: string) => void;
  /** Show progress bar. */
  showProgress?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldChecklist — task checklist.
 *
 * Scrollable checklist with progress tracking.
 * Each item is 56 px minimum for comfortable thumb interaction.
 * Required items are marked and block completion until checked.
 * Progress bar shows overall completion percentage.
 */
export const FieldChecklist: React.FC<FieldChecklistProps> = ({
  title,
  items,
  onToggle,
  onAddNote,
  showProgress = true,
  className = '',
  testId,
}) => {
  const checkedCount = items.filter((i) => i.checked).length;
  const total = items.length;
  const requiredCount = items.filter((i) => i.required).length;
  const requiredChecked = items.filter((i) => i.required && i.checked).length;

  return (
    <div
      data-testid={testId}
      className={['tf-checklist', className].join(' ')}
      role="group"
      aria-label={title || 'Checklist'}
    >
      {/* Title */}
      {title && <h3 className="tf-checklist__title">{title}</h3>}

      {/* Progress */}
      {showProgress && (
        <div className="tf-checklist__progress">
          <div className="tf-checklist__progress-bar" role="progressbar" aria-valuenow={checkedCount} aria-valuemax={total}>
            <div className="tf-checklist__progress-fill" style={{ width: `${total ? (checkedCount / total) * 100 : 0}%` }} />
          </div>
          <span className="tf-checklist__progress-text">
            {checkedCount}/{total}
            {requiredCount > 0 && ` (${requiredChecked}/${requiredCount} required)`}
          </span>
        </div>
      )}

      {/* Items */}
      <ul className="tf-checklist__list" role="list">
        {items.map((item) => (
          <li
            key={item.id}
            className={[
              'tf-checklist__item',
              item.checked ? 'tf-checklist__item--checked' : '',
              item.required ? 'tf-checklist__item--required' : '',
              item.disabled ? 'tf-checklist__item--disabled' : '',
            ].join(' ')}
          >
            <button
              type="button"
              className="tf-checklist__toggle"
              onClick={() => onToggle(item.id)}
              disabled={item.disabled}
              aria-pressed={item.checked}
            >
              <span className="tf-checklist__box" aria-hidden="true">
                {item.checked ? '✓' : item.required ? '◆' : '○'}
              </span>
              <span className="tf-checklist__text">{item.text}</span>
              {item.required && (
                <span className="tf-checklist__req-badge">REQ</span>
              )}
            </button>

            {/* Notes */}
            {item.notes && (
              <span className="tf-checklist__note">{item.notes}</span>
            )}
            {onAddNote && !item.disabled && (
              <button
                type="button"
                className="tf-checklist__note-btn"
                onClick={() => onAddNote(item.id, '')}
                aria-label={`Add note to ${item.text}`}
              >
                📝
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

FieldChecklist.displayName = 'FieldChecklist';

export default FieldChecklist;
