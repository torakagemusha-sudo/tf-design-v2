import React, { useEffect, useState } from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandExecutionTimer component.
 * Elapsed time display for running commands.
 */
export interface CommandExecutionTimerProps extends TorafirmaComponentBaseProps {
  /** ISO timestamp when execution started */
  startTime: string;
  /** Display format */
  format?: 'hh:mm:ss' | 'mm:ss' | 'seconds';
  /** Whether the timer is still running */
  running?: boolean;
}

/**
 * Formats elapsed milliseconds into a time string.
 */
function formatElapsed(ms: number, format: string): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  switch (format) {
    case 'hh:mm:ss':
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    case 'mm:ss':
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    case 'seconds':
      return `${totalSeconds}s`;
    default:
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}

/**
 * CommandExecutionTimer — elapsed time display for running commands.
 *
 * Displays a live-updating elapsed time counter for a running
 * command. Tracks time since the provided start timestamp and
 * updates every second. Supports multiple display formats.
 *
 * @example
 * ```tsx
 * <CommandExecutionTimer
 *   startTime="2024-01-01T10:00:00Z"
 *   format="hh:mm:ss"
 *   running={true}
 * />
 * ```
 */
const CommandExecutionTimer: React.FC<CommandExecutionTimerProps> = ({
  startTime,
  format = 'hh:mm:ss',
  running = true,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [elapsed, setElapsed] = useState(() => {
    return Date.now() - new Date(startTime).getTime();
  });

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setElapsed(Date.now() - new Date(startTime).getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, running]);

  return (
    <span
      className={`tf-command-execution-timer ${running ? 'tf-command-execution-timer--running' : 'tf-command-execution-timer--stopped'} ${className}`}
      aria-label={`Elapsed time: ${formatElapsed(elapsed, format)}`}
      data-testid={testId}
      {...rest}
    >
      <span className="tf-command-execution-timer__icon" aria-hidden="true">&#9201;</span>
      <span className="tf-command-execution-timer__value">{formatElapsed(elapsed, format)}</span>
    </span>
  );
};

export default CommandExecutionTimer;
