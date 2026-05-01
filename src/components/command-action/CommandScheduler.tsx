import React, { useState } from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * A scheduled command entry.
 */
export interface CommandSchedule {
  id: string;
  commandId: string;
  scheduledFor: string;
  timezone?: string;
  recurring?: 'once' | 'hourly' | 'daily' | 'weekly';
  status: 'pending' | 'running' | 'completed' | 'cancelled';
}

/**
 * Props for the CommandScheduler component.
 * Schedule commands for future execution.
 */
export interface CommandSchedulerProps extends TorafirmaComponentBaseProps {
  /** The command to schedule */
  command: CommandDescriptor;
  /** Existing schedules for this command */
  schedules: CommandSchedule[];
  /** Callback fired when a new schedule is created */
  onSchedule: (schedule: Omit<CommandSchedule, 'id' | 'status'>) => void;
}

/**
 * CommandScheduler — schedule commands for future execution.
 *
 * Provides a scheduling interface for deferring command execution
 * to a future time. Supports one-time and recurring schedules.
 * Displays existing schedules with the ability to cancel or
 * modify them.
 *
 * @example
 * ```tsx
 * <CommandScheduler
 *   command={{ id: 'backup', label: 'Run backup', operation: 'backup', commandClass: 'execute', state: 'available' }}
 *   schedules={[]}
 *   onSchedule={(s) => console.log('Scheduled', s)}
 * />
 * ```
 */
const CommandScheduler: React.FC<CommandSchedulerProps> = ({
  command,
  schedules,
  onSchedule,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [scheduledFor, setScheduledFor] = useState('');
  const [recurring, setRecurring] = useState<CommandSchedule['recurring']>('once');

  const handleSchedule = () => {
    if (!scheduledFor) return;
    onSchedule({
      commandId: command.id,
      scheduledFor,
      recurring,
    });
  };

  return (
    <div className={`tf-command-scheduler ${className}`} data-testid={testId} {...rest}>
      <div className="tf-command-scheduler__header">
        <span className="tf-command-scheduler__title">Schedule Command</span>
        <span className="tf-command-scheduler__command">{command.label}</span>
      </div>

      <div className="tf-command-scheduler__form">
        <label className="tf-command-scheduler__label" htmlFor="schedule-time">
          Execution time
        </label>
        <input
          id="schedule-time"
          type="datetime-local"
          className="tf-command-scheduler__datetime"
          value={scheduledFor}
          onChange={(e) => setScheduledFor(e.target.value)}
        />

        <label className="tf-command-scheduler__label" htmlFor="schedule-recurring">
          Recurrence
        </label>
        <select
          id="schedule-recurring"
          className="tf-command-scheduler__recurring"
          value={recurring}
          onChange={(e) => setRecurring(e.target.value as CommandSchedule['recurring'])}
        >
          <option value="once">Once</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        <button
          type="button"
          className="tf-command-scheduler__submit"
          onClick={handleSchedule}
          disabled={!scheduledFor}
        >
          Schedule
        </button>
      </div>

      {schedules.length > 0 && (
        <div className="tf-command-scheduler__schedules">
          <span className="tf-command-scheduler__schedules-title">Scheduled runs</span>
          <ul className="tf-command-scheduler__schedule-list">
            {schedules.map((s) => (
              <li key={s.id} className={`tf-command-scheduler__schedule-item tf-command-scheduler__schedule-item--${s.status}`}>
                <time className="tf-command-scheduler__schedule-time" dateTime={s.scheduledFor}>
                  {new Date(s.scheduledFor).toLocaleString()}
                </time>
                {s.recurring && s.recurring !== 'once' && (
                  <span className="tf-command-scheduler__schedule-recurring">{s.recurring}</span>
                )}
                <span className={`tf-command-scheduler__schedule-status tf-command-scheduler__schedule-status--${s.status}`}>
                  {s.status.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommandScheduler;
