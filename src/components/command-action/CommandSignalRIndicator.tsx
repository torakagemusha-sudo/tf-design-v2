import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandSignalRIndicator component.
 * Real-time connection status for commands.
 */
export interface CommandSignalRIndicatorProps extends TorafirmaComponentBaseProps {
  /** Whether the SignalR connection is active */
  connected: boolean;
  /** Current latency in milliseconds */
  latency?: number;
  /** Connection hub name */
  hubName?: string;
}

/**
 * CommandSignalRIndicator — real-time connection status for commands.
 *
 * Displays a small status indicator showing the health of the
 * SignalR real-time connection used for command dispatch and
 * status updates. Shows connection state and optional latency.
 *
 * @example
 * ```tsx
 * <CommandSignalRIndicator
 *   connected={true}
 *   latency={24}
 *   hubName="commandHub"
 * />
 * ```
 */
const CommandSignalRIndicator: React.FC<CommandSignalRIndicatorProps> = ({
  connected,
  latency,
  hubName = 'command',
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <span
      className={`tf-command-signalr-indicator ${connected ? 'tf-command-signalr-indicator--connected' : 'tf-command-signalr-indicator--disconnected'} ${className}`}
      title={`${hubName}: ${connected ? 'connected' : 'disconnected'}${latency !== undefined ? ` · ${latency}ms` : ''}`}
      data-testid={testId}
      {...rest}
    >
      <span className="tf-command-signalr-indicator__dot" aria-hidden="true" />
      <span className="tf-command-signalr-indicator__label">
        {connected ? 'Connected' : 'Disconnected'}
      </span>
      {latency !== undefined && connected && (
        <span className="tf-command-signalr-indicator__latency">{latency}ms</span>
      )}
    </span>
  );
};

export default CommandSignalRIndicator;
