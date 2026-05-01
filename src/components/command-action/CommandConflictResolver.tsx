import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A single command conflict entry.
 */
export interface CommandConflict {
  id: string;
  commandA: string;
  commandB: string;
  conflictType: 'resource' | 'dependency' | 'authority' | 'state';
  description: string;
  suggestedResolution?: string;
}

/**
 * Props for the CommandConflictResolver component.
 * UI for resolving command conflicts.
 */
export interface CommandConflictResolverProps extends TorafirmaComponentBaseProps {
  /** Array of conflicts to resolve */
  conflicts: CommandConflict[];
  /** Callback fired when a conflict is resolved */
  onResolve: (conflictId: string, resolution: 'a' | 'b' | 'both' | 'skip') => void;
}

/**
 * CommandConflictResolver — UI for resolving command conflicts.
 *
 * Presents detected command conflicts with options to prioritize
 * one command over another, execute both, or skip. Each conflict
 * describes the collision type and suggests a resolution strategy.
 *
 * @example
 * ```tsx
 * <CommandConflictResolver
 *   conflicts={[
 *     { id: 'c1', commandA: 'Deploy A', commandB: 'Deploy B', conflictType: 'resource', description: 'Both target runtime.prod', suggestedResolution: 'Execute sequentially' },
 *   ]}
 *   onResolve={(id, res) => console.log('Resolved', id, res)}
 * />
 * ```
 */
const CommandConflictResolver: React.FC<CommandConflictResolverProps> = ({
  conflicts,
  onResolve,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  if (conflicts.length === 0) {
    return (
      <div
        className={`tf-command-conflict-resolver tf-command-conflict-resolver--empty ${className}`}
        data-testid={testId}
        {...rest}
      >
        <span className="tf-command-conflict-resolver__empty-text">No conflicts detected.</span>
      </div>
    );
  }

  return (
    <div className={`tf-command-conflict-resolver ${className}`} data-testid={testId} {...rest}>
      <div className="tf-command-conflict-resolver__header">
        <span className="tf-command-conflict-resolver__title">Command Conflicts</span>
        <span className="tf-command-conflict-resolver__count">{conflicts.length}</span>
      </div>
      <ul className="tf-command-conflict-resolver__list">
        {conflicts.map((conflict) => (
          <li key={conflict.id} className="tf-command-conflict-resolver__item">
            <div className="tf-command-conflict-resolver__conflict">
              <span className={`tf-command-conflict-resolver__type tf-command-conflict-resolver__type--${conflict.conflictType}`}>
                {conflict.conflictType.toUpperCase()}
              </span>
              <div className="tf-command-conflict-resolver__commands">
                <span className="tf-command-conflict-resolver__command-a">{conflict.commandA}</span>
                <span className="tf-command-conflict-resolver__vs" aria-hidden="true">vs</span>
                <span className="tf-command-conflict-resolver__command-b">{conflict.commandB}</span>
              </div>
              <p className="tf-command-conflict-resolver__description">{conflict.description}</p>
              {conflict.suggestedResolution && (
                <p className="tf-command-conflict-resolver__suggestion">
                  Suggested: {conflict.suggestedResolution}
                </p>
              )}
            </div>
            <div className="tf-command-conflict-resolver__actions">
              <button
                type="button"
                className="tf-command-conflict-resolver__resolve tf-command-conflict-resolver__resolve--a"
                onClick={() => onResolve(conflict.id, 'a')}
              >
                Prioritize {conflict.commandA}
              </button>
              <button
                type="button"
                className="tf-command-conflict-resolver__resolve tf-command-conflict-resolver__resolve--b"
                onClick={() => onResolve(conflict.id, 'b')}
              >
                Prioritize {conflict.commandB}
              </button>
              <button
                type="button"
                className="tf-command-conflict-resolver__resolve tf-command-conflict-resolver__resolve--both"
                onClick={() => onResolve(conflict.id, 'both')}
              >
                Execute Both
              </button>
              <button
                type="button"
                className="tf-command-conflict-resolver__resolve tf-command-conflict-resolver__resolve--skip"
                onClick={() => onResolve(conflict.id, 'skip')}
              >
                Skip
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommandConflictResolver;
