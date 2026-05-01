import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Single filter chip.
 */
export interface FilterChip {
  /** Chip ID. */
  id: string;
  /** Display label. */
  label: string;
  /** Selected state. */
  selected?: boolean;
  /** Disabled state. */
  disabled?: boolean;
}

/**
 * Props for FieldFilterChips.
 */
export interface FieldFilterChipsProps {
  /** Filter chips to display. */
  chips: FilterChip[];
  /** Selection change handler. */
  onSelect: (chipId: string) => void;
  /** Clear all handler. */
  onClearAll?: () => void;
  /** Scrollable horizontal layout. */
  scrollable?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldFilterChips — mobile filter chips.
 *
 * Horizontally scrollable row of selectable filter chips.
 * Selected chips render with accent fill; unselected chips are outlined.
 * Scrollable mode enables touch-drag for many filter options.
 * Clear-all button appears when any chip is selected.
 */
export const FieldFilterChips: React.FC<FieldFilterChipsProps> = ({
  chips,
  onSelect,
  onClearAll,
  scrollable = true,
  className = '',
  testId,
}) => {
  const hasSelection = chips.some((c) => c.selected);
  const scrollClass = scrollable ? 'tf-filter-chips--scrollable' : '';

  return (
    <div
      data-testid={testId}
      className={['tf-filter-chips', scrollClass, className].join(' ')}
      role="group"
      aria-label="Filter options"
    >
      {/* Chip list */}
      <div className="tf-filter-chips__list">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            role="switch"
            aria-checked={chip.selected}
            aria-label={chip.label}
            disabled={chip.disabled}
            onClick={() => onSelect(chip.id)}
            className={[
              'tf-filter-chips__chip',
              chip.selected ? 'tf-filter-chips__chip--selected' : '',
              chip.disabled ? 'tf-filter-chips__chip--disabled' : '',
            ].join(' ')}
          >
            {chip.selected && (
              <span className="tf-filter-chips__check" aria-hidden="true">
                ✓
              </span>
            )}
            <span className="tf-filter-chips__label">{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Clear all */}
      {hasSelection && onClearAll && (
        <button
          type="button"
          className="tf-filter-chips__clear"
          onClick={onClearAll}
        >
          Clear
        </button>
      )}
    </div>
  );
};

FieldFilterChips.displayName = 'FieldFilterChips';

export default FieldFilterChips;
