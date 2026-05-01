import React, { useState } from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandRetryControl component.
 * Retry failed commands with options.
 */
export interface CommandRetryControlProps extends TorafirmaComponentBaseProps {
  /** The command to retry */
  command: CommandDescriptor;
  /** The error message from the failed execution */
  error: string;
  /** Number of retry attempts already made */
  attemptCount?: number;
  /** Maximum number of retry attempts allowed */
  maxAttempts?: number;
  /** Callback fired when retry is requested */
  onRetry: (options: { delay: number; force: boolean }) => void;
  /** Callback fired when retry is aborted */
  onAbort: () => void;
}

/**
 * CommandRetryControl — retry failed commands with options.
 *
 * Provides a control surface for retrying failed commands.
 * Shows the error, attempt count, and allows configuring retry
 * options such as delay and force-execution mode.
 *
 * @example
 * ```tsx
 * <CommandRetryControl
 *   command={{ id: 'deploy', label: 'Deploy', operation: 'deploy', commandClass: 'deploy', state: 'failed' }}
 *   error="Connection timeout to runtime.prod"
 *   attemptCount={2}
 *   maxAttempts={5}
 *   onRetry={(opts) => console.log('Retry', opts)}
 *   onAbort={() => console.log('Aborted')}
 * />
 * ```
 */
const CommandRetryControl: React.FC<CommandRetryControlProps> = ({
  command,
  error,
  attemptCount = 0,
  maxAttempts = 3,
  onRetry,
  onAbort,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [delay, setDelay] = useState(5);
  const [force, setForce] = useState(false);

  const canRetry = attemptCount < maxAttempts;

  return (
    <div className={`tf-command-retry-control ${className}`} data-testid={testId} {...rest}>
      <div className="tf-command-retry-control__header">
        <span className="tf-command-retry-control__title">Retry Command</span>
        <span className="tf-command-retry-control__attempts">
          Attempt {attemptCount} of {maxAttempts}
        </span>
      </div>

      <div className="tf-command-retry-control__command">
        <span className={`tf-command-retry-control__class tf-command-retry-control__class--${command.commandClass}`}>
          {command.commandClass.toUpperCase()}
        </span>
        <span className="tf-command-retry-control__label">{command.label}</span>
      </div>

      <div className="tf-command-retry-control__error">
        <span className="tf-command-retry-control__error-label">Error:</span>
        <span className="tf-command-retry-control__error-message">{error}</span>
      </div>

      {canRetry && (
        <div className="tf-command-retry-control__options">
          <label className="tf-command-retry-control__option">
            <span>Delay (seconds)</span>
            <input
              type="number"
              className="tf-command-retry-control__delay"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              min={0}
              max={300}
            />
          </label>
          <label className="tf-command-retry-control__option">
            <input
              type="checkbox"
              checked={force}
              onChange={(e) => setForce(e.target.checked)}
            />
            <span>Force execution</span>
          </label>
        </div>
      )}

      <div className="tf-command-retry-control__actions">
        <button
          type="button"
          className="tf-command-retry-control__abort"
          onClick={onAbort}
        >
          Abort
        </button>
        {canRetry ? (
          <button
            type="button"
            className="tf-command-retry-control__retry"
            onClick={() => onRetry({ delay, force })}
          >
            Retry ({maxAttempts - attemptCount} remaining)
          </button>
        ) : (
          <span className="tf-command-retry-control__exhausted">Max retries exhausted</span>
        )}
      </div>
    </div>
  );
};

export default CommandRetryControl;
