import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Metadata field definition.
 */
export interface MetadataField {
  key: string;
  label: string;
  value: string;
  editable?: boolean;
}

/**
 * Props for the ActionMetadataPanel component.
 * Metadata display for an action.
 */
export interface ActionMetadataPanelProps extends TorafirmaComponentBaseProps {
  /** Array of metadata fields */
  metadata: MetadataField[];
  /** Callback fired when a field edit is requested */
  onEdit?: (key: string) => void;
}

/**
 * ActionMetadataPanel — metadata display for an action.
 *
 * Displays a read-only list of metadata fields for an action
 * with optional edit capability. Fields are shown as key-value
 * pairs with labels. Editable fields display an edit trigger.
 *
 * @example
 * ```tsx
 * <ActionMetadataPanel
 *   metadata={[
 *     { key: 'author', label: 'Author', value: 'operator-1', editable: false },
 *     { key: 'runtime', label: 'Runtime', value: 'production', editable: true },
 *   ]}
 *   onEdit={(key) => console.log('Edit', key)}
 * />
 * ```
 */
const ActionMetadataPanel: React.FC<ActionMetadataPanelProps> = ({
  metadata,
  onEdit,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <div className={`tf-action-metadata-panel ${className}`} data-testid={testId} {...rest}>
      <div className="tf-action-metadata-panel__header">
        <span className="tf-action-metadata-panel__title">Metadata</span>
      </div>
      <dl className="tf-action-metadata-panel__list">
        {metadata.map((field) => (
          <div key={field.key} className="tf-action-metadata-panel__row">
            <dt className="tf-action-metadata-panel__label">{field.label}</dt>
            <dd className="tf-action-metadata-panel__value">
              {field.value}
              {field.editable && onEdit && (
                <button
                  type="button"
                  className="tf-action-metadata-panel__edit"
                  onClick={() => onEdit(field.key)}
                  aria-label={`Edit ${field.label}`}
                >
                  &#9998;
                </button>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ActionMetadataPanel;
