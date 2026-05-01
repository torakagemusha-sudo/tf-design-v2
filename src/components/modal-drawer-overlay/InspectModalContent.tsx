import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Field definition for inspect content rendering.
 */
export interface InspectField {
  /** Field label. */
  label: string;
  /** Field value — can be a string, number, or custom render. */
  value: React.ReactNode;
  /** Whether the field spans the full width. */
  fullWidth?: boolean;
  /** Optional category grouping. */
  category?: string;
}

/**
 * InspectModalContent — renders a structured field grid for entity inspection.
 * Supports categorized field groups with label/value pairs.
 *
 * @example
 * ```tsx
 * <InspectModalContent
 *   fields={[
 *     { label: 'ID', value: 'node-47b3' },
 *     { label: 'Status', value: <StatusBadge active /> },
 *   ]}
 * />
 * ```
 */
export interface InspectModalContentProps {
  /** Array of fields to display. */
  fields: InspectField[];
  /** Number of columns in the grid. */
  columns?: 1 | 2 | 3;
  /** Additional class names. */
  className?: string;
  /** Optional empty state message. */
  emptyMessage?: string;
}

export const InspectModalContent: React.FC<InspectModalContentProps> = ({
  fields,
  columns = 2,
  className,
  emptyMessage = 'No data available',
}) => {
  if (fields.length === 0) {
    return (
      <div
        className="tf-inspect-modal-content tf-inspect-modal-content--empty py-8 text-center text-sm text-steel-500"
        data-testid="inspect-modal-empty"
      >
        {emptyMessage}
      </div>
    );
  }

  // Group by category
  const categories = fields.reduce<Record<string, InspectField[]>>((acc, field) => {
    const cat = field.category ?? '';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(field);
    return acc;
  }, {});

  return (
    <div
      className={cn(
        'tf-inspect-modal-content',
        'space-y-5',
        className
      )}
      data-testid="inspect-modal-content"
    >
      {Object.entries(categories).map(([category, catFields]) => (
        <div key={category} className="tf-inspect-modal-content__section">
          {category && (
            <h4 className="tf-inspect-modal-content__category text-xs font-semibold uppercase tracking-wider text-steel-500 mb-2">
              {category}
            </h4>
          )}
          <dl
            className={cn(
              'tf-inspect-modal-content__grid grid gap-x-6 gap-y-3',
              columns === 1 && 'grid-cols-1',
              columns === 2 && 'grid-cols-1 sm:grid-cols-2',
              columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {catFields.map((field, idx) => (
              <div
                key={idx}
                className={cn(
                  'tf-inspect-modal-content__field',
                  field.fullWidth && 'sm:col-span-full'
                )}
              >
                <dt className="tf-inspect-modal-content__label text-xs text-steel-500 mb-0.5">
                  {field.label}
                </dt>
                <dd className="tf-inspect-modal-content__value text-sm text-steel-100">
                  {field.value ?? '—'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
};

export default InspectModalContent;
