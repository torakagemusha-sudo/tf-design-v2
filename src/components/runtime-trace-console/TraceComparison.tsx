/**
 * @fileoverview TraceComparison — Compare two traces side by side.
 * Diff view showing differences between two trace executions.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceComparison
 */

import React from "react";
import type { BaseComponentProps, TraceSpan } from "./types";

/** Props for TraceComparison. */
export interface TraceComparisonProps extends BaseComponentProps {
  /** Baseline trace name. */
  baselineName: string;
  /** Comparison trace name. */
  comparisonName: string;
  /** Baseline spans. */
  baselineSpans: TraceSpan[];
  /** Comparison spans. */
  comparisonSpans: TraceSpan[];
  /** Callback to close comparison. */
  onClose?: () => void;
}

/**
 * TraceComparison — Side-by-side trace comparison.
 *
 * @example
 * ```tsx
 * <TraceComparison
 *   baselineName="Run A"
 *   comparisonName="Run B"
 *   baselineSpans={spansA}
 *   comparisonSpans={spansB}
 * />
 * ```
 */
export const TraceComparison: React.FC<TraceComparisonProps> = ({
  baselineName,
  comparisonName,
  baselineSpans,
  comparisonSpans,
  onClose,
  className = "",
  "data-testid": dataTestId = "trace-comparison",
}) => {
  const allNames = new Set([
    ...baselineSpans.map((s) => s.name),
    ...comparisonSpans.map((s) => s.name),
  ]);

  const baselineMap = new Map(baselineSpans.map((s) => [s.name, s]));
  const comparisonMap = new Map(comparisonSpans.map((s) => [s.name, s]));

  const totalBaseline = baselineSpans.reduce((s, sp) => s + sp.durationMs, 0);
  const totalComparison = comparisonSpans.reduce(
    (s, sp) => s + sp.durationMs,
    0
  );
  const diff = totalComparison - totalBaseline;
  const diffPct = totalBaseline > 0 ? (diff / totalBaseline) * 100 : 0;

  return (
    <div
      className={`tf-trace-comparison ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-comparison__header">
        <h4>Trace Comparison</h4>
        {onClose && (
          <button
            className="tf-btn tf-btn--xs tf-btn--ghost"
            onClick={onClose}
            type="button"
          >
            {"✕"}
          </button>
        )}
      </div>

      <div className="tf-trace-comparison__summary">
        <div className="tf-trace-comparison__col">
          <span className="tf-trace-comparison__label">{baselineName}</span>
          <span className="tf-trace-comparison__value">
            {totalBaseline >= 1000
              ? `${(totalBaseline / 1000).toFixed(2)}s`
              : `${totalBaseline}ms`}
          </span>
        </div>
        <div className="tf-trace-comparison__vs">vs</div>
        <div className="tf-trace-comparison__col">
          <span className="tf-trace-comparison__label">{comparisonName}</span>
          <span className="tf-trace-comparison__value">
            {totalComparison >= 1000
              ? `${(totalComparison / 1000).toFixed(2)}s`
              : `${totalComparison}ms`}
          </span>
        </div>
        <div
          className={`tf-trace-comparison__diff ${
            diff > 0 ? "tf-trace-comparison__diff--slower" : "tf-trace-comparison__diff--faster"
          }`}
        >
          {diff > 0 ? "+" : ""}
          {diff >= 1000 || diff <= -1000
            ? `${(diff / 1000).toFixed(2)}s`
            : `${diff.toFixed(0)}ms`}
          {" "}({diffPct > 0 ? "+" : ""}
          {diffPct.toFixed(1)}%)
        </div>
      </div>

      <div className="tf-trace-comparison__spans">
        <div className="tf-trace-comparison__row tf-trace-comparison__row--header">
          <span>Span</span>
          <span>{baselineName}</span>
          <span>{comparisonName}</span>
          <span>Diff</span>
        </div>
        {Array.from(allNames).map((name) => {
          const b = baselineMap.get(name);
          const c = comparisonMap.get(name);
          const d = (c?.durationMs || 0) - (b?.durationMs || 0);
          return (
            <div
              key={name}
              className={`tf-trace-comparison__row ${
                !b ? "tf-trace-comparison__row--new" : !c ? "tf-trace-comparison__row--removed" : ""
              }`}
            >
              <span>{name}</span>
              <span>{b ? `${b.durationMs}ms` : "—"}</span>
              <span>{c ? `${c.durationMs}ms` : "—"}</span>
              <span
                className={
                  d > 0
                    ? "tf-trace-comparison__row--slower"
                    : d < 0
                      ? "tf-trace-comparison__row--faster"
                      : ""
                }
              >
                {b && c ? `${d > 0 ? "+" : ""}${d}ms` : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TraceComparison.displayName = "TraceComparison";

export default TraceComparison;
