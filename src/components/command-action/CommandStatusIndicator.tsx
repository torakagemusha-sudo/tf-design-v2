import React from 'react';
import { CommandState, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandStatusIndicator component.
 * Small inline status next to a command.
 */
export interface CommandStatusIndicatorProps extends Omit<TorafirmaComponentBaseProps, 'state'> {
  /** The command state to display */
  state: CommandState;
  /** Optional progress percentage (0-100) for running state */
  progress?: number;
  /** Optional result message */
  result?: string;
  /** Optional size variant */
  size?: 'sm' | 'md';
}

/**
 * Maps command states to their display labels.
 */
const STATE_LABELS: Record<CommandState, string> = {
  available: 'Ready',
  disabled: 'Disabled',
  blocked: 'Blocked',
  requires_confirmation: 'Confirm',
  requires_authority: 'Auth Required',
  queued: 'Queued',
  staged: 'Staged',
  running: 'Running',
  complete: 'Complete',
  failed: 'Failed',
};

/**
 * CommandStatusIndicator — small inline status next to a command.
 *
 * Renders a compact status badge or progress indicator aligned
 * with a command row. Displays state name, optional progress
 * percentage, and result message. Adapts color by state.
 *
 * @example
 * ```tsx
 * <CommandStatusIndicator state="running" progress={45} />
 * <CommandStatusIndicator state="complete" result="Validation passed" />
 * ```
 */
const CommandStatusIndicator: React.FC<CommandStatusIndicatorProps> = ({
  state,
  progress,
  result,
  size = 'md',
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const sizeClass = `tf-command-status-indicator--${size}`;

  return (
    <span
      className={`tf-command-status-indicator ${sizeClass} tf-command-status-indicator--${state} ${className}`}
      data-state={state}
      data-testid={testId}
      {...rest}
    >
      <span className="tf-command-status-indicator__dot" aria-hidden="true" />
      <span className="tf-command-status-indicator__label">{STATE_LABELS[state]}</span>
      {state === 'running' && progress !== undefined && (
        <span className="tf-command-status-indicator__progress">{progress}%</span>
      )}
      {state === 'running' && progress !== undefined && (
        <progress
          className="tf-command-status-indicator__progress-bar"
          value={progress}
          max={100}
          aria-label={`${progress}% complete`}
        />
      )}
      {result && <span className="tf-command-status-indicator__result">{result}</span>}
    </span>
  );
};

export default CommandStatusIndicator;
