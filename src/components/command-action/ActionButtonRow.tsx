import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps, ComponentDensity } from '../../types';

/**
 * Props for the ActionButtonRow component.
 * Horizontal row of action buttons with separators.
 */
export interface ActionButtonRowProps extends TorafirmaComponentBaseProps {
  /** Array of command descriptors to display */
  commands: CommandDescriptor[];
  /** Density of the row */
  density?: ComponentDensity;
  /** Whether to show icons alongside labels */
  showIcons?: boolean;
  /** Callback fired when a command is activated */
  onCommand: (command: CommandDescriptor) => void;
}

/**
 * ActionButtonRow — horizontal row of action buttons with separators.
 *
 * Arranges commands in a dense horizontal strip with semantic
 * dividers between command classes. Separates destructive commands
 * visually from standard actions. Supports variable density for
 * compact toolbars or spacious action rows.
 *
 * @example
 * ```tsx
 * <ActionButtonRow
 *   commands={[
 *     { id: 'run', label: 'Run', operation: 'run', commandClass: 'execute', state: 'available' },
 *     { id: 'stop', label: 'Stop', operation: 'stop', commandClass: 'control', state: 'available' },
 *   ]}
 *   density="compact"
 *   onCommand={(cmd) => console.log(cmd.label)}
 * />
 * ```
 */
const ActionButtonRow: React.FC<ActionButtonRowProps> = ({
  commands,
  density = 'default',
  showIcons = false,
  onCommand,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const densityClass = `tf-action-button-row--${density}`;

  const standard = commands.filter((c) => !c.destructive);
  const destructive = commands.filter((c) => c.destructive);

  return (
    <div
      className={`tf-action-button-row ${densityClass} ${className}`}
      role="toolbar"
      aria-label="Action toolbar"
      data-testid={testId}
      {...rest}
    >
      <div className="tf-action-button-row__group">
        {standard.map((cmd, index) => (
          <React.Fragment key={cmd.id}>
            <button
              type="button"
              className={`tf-action-button-row__button tf-action-button-row__button--${cmd.commandClass}`}
              onClick={() => onCommand(cmd)}
              disabled={cmd.state === 'disabled'}
              aria-label={cmd.label}
              title={cmd.disabledReason || cmd.label}
            >
              {showIcons && <span className="tf-action-button-row__icon" aria-hidden="true">&#9654;</span>}
              {cmd.label}
            </button>
            {index < standard.length - 1 && (
              <span className="tf-action-button-row__separator" aria-hidden="true">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
      {destructive.length > 0 && (
        <React.Fragment>
          <span className="tf-action-button-row__group-separator" aria-hidden="true" />
          <div className="tf-action-button-row__group tf-action-button-row__group--destructive">
            {destructive.map((cmd) => (
              <button
                key={cmd.id}
                type="button"
                className={`tf-action-button-row__button tf-action-button-row__button--danger`}
                onClick={() => onCommand(cmd)}
                disabled={cmd.state === 'disabled'}
                aria-label={cmd.label}
                title={cmd.disabledReason || cmd.label}
              >
                {showIcons && <span className="tf-action-button-row__icon" aria-hidden="true">&#10005;</span>}
                {cmd.label}
              </button>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ActionButtonRow;
