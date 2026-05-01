import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A single dry-run result entry.
 */
export interface DryRunResult {
  id: string;
  action: string;
  target?: string;
  status: 'would_succeed' | 'would_fail' | 'would_warn' | 'skipped';
  message: string;
  changes?: string[];
}

/**
 * Props for the CommandDryRunPanel component.
 * Dry-run results preview.
 */
export interface CommandDryRunPanelProps extends TorafirmaComponentBaseProps {
  /** Array of dry-run results */
  results: DryRunResult[];
  /** Callback fired when the dry-run is accepted */
  onAccept: () => void;
  /** Callback fired when the dry-run is rejected */
  onReject: () => void;
}

/**
 * CommandDryRunPanel — dry-run results preview.
 *
 * Displays the simulated outcome of a command without executing
 * it. Each result shows what would happen to each target,
 * including predicted successes, failures, and warnings.
 * Operators can accept to proceed with the real execution or
 * reject to modify parameters.
 *
 * @example
 * ```tsx
 * <CommandDryRunPanel
 *   results={[
 *     { id: 'r1', action: 'Deploy', target: 'runtime.prod', status: 'would_succeed', message: 'Package would deploy successfully', changes: ['Update version to 1.2.3'] },
 *   ]}
 *   onAccept={() => console.log('Accepted')}
 *   onReject={() => console.log('Rejected')}
 * />
 * ```
 */
const CommandDryRunPanel: React.FC<CommandDryRunPanelProps> = ({
  results,
  onAccept,
  onReject,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const wouldSucceed = results.filter((r) => r.status === 'would_succeed').length;
  const wouldFail = results.filter((r) => r.status === 'would_fail').length;
  const wouldWarn = results.filter((r) => r.status === 'would_warn').length;

  return (
    <div className={`tf-command-dry-run-panel ${className}`} data-testid={testId} {...rest}>
      <div className="tf-command-dry-run-panel__header">
        <span className="tf-command-dry-run-panel__title">Dry-Run Results</span>
        <div className="tf-command-dry-run-panel__summary">
          {wouldSucceed > 0 && <span className="tf-command-dry-run-panel__success-count">{wouldSucceed} would succeed</span>}
          {wouldFail > 0 && <span className="tf-command-dry-run-panel__fail-count">{wouldFail} would fail</span>}
          {wouldWarn > 0 && <span className="tf-command-dry-run-panel__warn-count">{wouldWarn} would warn</span>}
        </div>
      </div>

      <ul className="tf-command-dry-run-panel__list">
        {results.map((result) => (
          <li
            key={result.id}
            className={`tf-command-dry-run-panel__result tf-command-dry-run-panel__result--${result.status}`}
          >
            <span className="tf-command-dry-run-panel__status">{result.status.replace(/_/g, ' ').toUpperCase()}</span>
            <span className="tf-command-dry-run-panel__action">{result.action}</span>
            {result.target && <span className="tf-command-dry-run-panel__target">{result.target}</span>}
            <p className="tf-command-dry-run-panel__message">{result.message}</p>
            {result.changes && result.changes.length > 0 && (
              <ul className="tf-command-dry-run-panel__changes">
                {result.changes.map((change, i) => (
                  <li key={i} className="tf-command-dry-run-panel__change">{change}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="tf-command-dry-run-panel__footer">
        <button
          type="button"
          className="tf-command-dry-run-panel__reject"
          onClick={onReject}
        >
          Modify Parameters
        </button>
        <button
          type="button"
          className="tf-command-dry-run-panel__accept"
          onClick={onAccept}
          disabled={wouldFail > 0}
        >
          Execute for Real
        </button>
      </div>
    </div>
  );
};

export default CommandDryRunPanel;
