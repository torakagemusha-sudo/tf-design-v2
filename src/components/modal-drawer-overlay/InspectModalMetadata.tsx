import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Metadata entry for the inspect modal metadata panel.
 */
export interface MetadataEntry {
  /** Metadata key/label. */
  key: string;
  /** Metadata value. */
  value: React.ReactNode;
  /** Whether to render with monospace font. */
  mono?: boolean;
}

/**
 * InspectModalMetadata — renders system metadata (timestamps, IDs,
 * version info) in a compact format at the bottom of an inspect modal.
 *
 * @example
 * ```tsx
 * <InspectModalMetadata entries={[
 *   { key: 'Created', value: '2024-01-15 08:32:00 UTC' },
 *   { key: 'Version', value: 'v2.1.0', mono: true },
 * ]} />
 * ```
 */
export interface InspectModalMetadataProps {
  /** Array of metadata entries. */
  entries: MetadataEntry[];
  /** Additional class names. */
  className?: string;
  /** Border style at the top. */
  bordered?: boolean;
  /** Background tint. */
  tinted?: boolean;
}

export const InspectModalMetadata: React.FC<InspectModalMetadataProps> = ({
  entries,
  className,
  bordered = true,
  tinted = true,
}) => {
  return (
    <div
      className={cn(
        'tf-inspect-modal-metadata',
        'px-5 py-3',
        bordered && 'border-t border-steel-700/60',
        tinted && 'bg-steel-950/40',
        className
      )}
      data-testid="inspect-modal-metadata"
    >
      <dl className="tf-inspect-modal-metadata__list flex flex-wrap gap-x-6 gap-y-1.5">
        {entries.map((entry, idx) => (
          <div key={idx} className="tf-inspect-modal-metadata__item flex items-center gap-1.5">
            <dt className="tf-inspect-modal-metadata__key text-xs text-steel-500">
              {entry.key}:
            </dt>
            <dd
              className={cn(
                'tf-inspect-modal-metadata__value text-xs text-steel-300',
                entry.mono && 'font-mono'
              )}
            >
              {entry.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default InspectModalMetadata;
