import React, { useState } from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandExportButton component.
 * Export command history/results.
 */
export interface CommandExportButtonProps extends TorafirmaComponentBaseProps {
  /** Data to export */
  data: unknown;
  /** Available export formats */
  format?: 'json' | 'csv' | 'yaml';
  /** Button label */
  label?: string;
  /** Callback fired when export is triggered */
  onExport: (format: string) => void;
}

/**
 * CommandExportButton — export command history/results.
 *
 * Provides a dropdown button for exporting command data in
 * multiple formats. Supports JSON, CSV, and YAML output.
 * The parent handles the actual serialization and download.
 *
 * @example
 * ```tsx
 * <CommandExportButton
 *   data={[{ id: 'cmd1', label: 'Run' }]}
 *   format="json"
 *   onExport={(fmt) => console.log('Export as', fmt)}
 * />
 * ```
 */
const CommandExportButton: React.FC<CommandExportButtonProps> = ({
  data,
  format = 'json',
  label = 'Export',
  onExport,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const formats = [
    { value: 'json', label: 'JSON' },
    { value: 'csv', label: 'CSV' },
    { value: 'yaml', label: 'YAML' },
  ];

  const handleExport = (fmt: string) => {
    setOpen(false);
    onExport(fmt);
  };

  return (
    <div
      className={`tf-command-export-button ${className}`}
      data-testid={testId}
      {...rest}
    >
      <button
        type="button"
        className="tf-command-export-button__trigger"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden="true">&#8684;</span>
        <span>{label}</span>
      </button>
      {open && (
        <ul className="tf-command-export-button__dropdown" role="listbox">
          {formats.map((fmt) => (
            <li key={fmt.value} role="option">
              <button
                type="button"
                className={`tf-command-export-button__option ${fmt.value === format ? 'tf-command-export-button__option--active' : ''}`}
                onClick={() => handleExport(fmt.value)}
              >
                {fmt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommandExportButton;
