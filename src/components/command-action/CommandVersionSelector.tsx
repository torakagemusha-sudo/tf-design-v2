import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A command version definition.
 */
export interface CommandVersion {
  id: string;
  version: string;
  schema?: string;
  label: string;
  deprecated?: boolean;
  description?: string;
}

/**
 * Props for the CommandVersionSelector component.
 * Select command version/schema.
 */
export interface CommandVersionSelectorProps extends TorafirmaComponentBaseProps {
  /** Available versions */
  versions: CommandVersion[];
  /** Currently selected version ID */
  selected?: string;
  /** Callback fired when a version is selected */
  onSelect: (versionId: string) => void;
}

/**
 * CommandVersionSelector — select command version/schema.
 *
 * Displays a dropdown or list for selecting between multiple
 * versions of a command schema. Deprecated versions are visually
 * distinguished but remain selectable for backward compatibility.
 *
 * @example
 * ```tsx
 * <CommandVersionSelector
 *   versions={[
 *     { id: 'v1', version: '1.0', label: 'v1.0 (legacy)', deprecated: true },
 *     { id: 'v2', version: '2.0', label: 'v2.0 (current)', deprecated: false },
 *   ]}
 *   selected="v2"
 *   onSelect={(id) => console.log('Selected', id)}
 * />
 * ```
 */
const CommandVersionSelector: React.FC<CommandVersionSelectorProps> = ({
  versions,
  selected,
  onSelect,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <div className={`tf-command-version-selector ${className}`} data-testid={testId} {...rest}>
      <label htmlFor="command-version" className="tf-command-version-selector__label">
        Command Version
      </label>
      <select
        id="command-version"
        className="tf-command-version-selector__select"
        value={selected || ''}
        onChange={(e) => onSelect(e.target.value)}
      >
        {versions.map((v) => (
          <option
            key={v.id}
            value={v.id}
            className={v.deprecated ? 'tf-command-version-selector__option--deprecated' : ''}
          >
            {v.label}{v.deprecated ? ' (deprecated)' : ''}
          </option>
        ))}
      </select>
      {versions.map((v) => {
        if (v.id !== selected || !v.description) return null;
        return (
          <p key={v.id} className="tf-command-version-selector__description">
            {v.description}
          </p>
        );
      })}
    </div>
  );
};

export default CommandVersionSelector;
