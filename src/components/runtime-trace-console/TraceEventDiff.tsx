/**
 * @fileoverview TraceEventDiff — Before/after state diff display.
 * Shows side-by-side comparison of state changes in a trace event.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceEventDiff
 */

import React, { useMemo } from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceEventDiff. */
export interface TraceEventDiffProps extends BaseComponentProps {
  /** State before the event. */
  before: Record<string, unknown>;
  /** State after the event. */
  after: Record<string, unknown>;
  /** Title for the diff section. */
  title?: string;
  /** Whether to show only changed fields. */
  onlyChanged?: boolean;
}

/** Diff entry for one field. */
interface DiffEntry {
  key: string;
  before: unknown;
  after: unknown;
  changed: boolean;
}

/**
 * TraceEventDiff — Before/after state comparison.
 *
 * @example
 * ```tsx
 * <TraceEventDiff
 *   before={event.before}
 *   after={event.after}
 *   onlyChanged
 * />
 * ```
 */
export const TraceEventDiff: React.FC<TraceEventDiffProps> = ({
  before,
  after,
  title = "State Change",
  onlyChanged = false,
  className = "",
  "data-testid": dataTestId = "trace-event-diff",
}) => {
  const diffs = useMemo<DiffEntry[]>(() => {
    const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);
    const result: DiffEntry[] = [];
    for (const key of allKeys) {
      const bv = before[key];
      const av = after[key];
      const changed = JSON.stringify(bv) !== JSON.stringify(av);
      if (!onlyChanged || changed) {
        result.push({ key, before: bv, after: av, changed });
      }
    }
    return result;
  }, [before, after, onlyChanged]);

  if (diffs.length === 0) return null;

  return (
    <div
      className={`tf-trace-event-diff ${className}`}
      data-testid={dataTestId}
    >
      <h5 className="tf-trace-event-diff__title">{title}</h5>
      <table className="tf-trace-event-diff__table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Before</th>
            <th>After</th>
          </tr>
        </thead>
        <tbody>
          {diffs.map((d) => (
            <tr
              key={d.key}
              className={
                d.changed ? "tf-trace-event-diff__changed" : "tf-trace-event-diff__same"
              }
            >
              <td className="tf-trace-event-diff__key">{d.key}</td>
              <td className="tf-trace-event-diff__before">
                <code>
                  {d.before === undefined
                    ? "undefined"
                    : JSON.stringify(d.before)}
                </code>
              </td>
              <td className="tf-trace-event-diff__after">
                <code>
                  {d.after === undefined
                    ? "undefined"
                    : JSON.stringify(d.after)}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TraceEventDiff.displayName = "TraceEventDiff";

export default TraceEventDiff;
