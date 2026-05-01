/**
 * @fileoverview TraceCorrelationMatrix — Event correlation heatmap.
 * Shows co-occurrence relationships between event types.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceCorrelationMatrix
 */

import React, { useMemo } from "react";
import type { BaseComponentProps, TraceEvent } from "./types";

/** Props for TraceCorrelationMatrix. */
export interface TraceCorrelationMatrixProps extends BaseComponentProps {
  /** Events to correlate. */
  events: TraceEvent[];
  /** Maximum rows/columns. */
  maxItems?: number;
}

/**
 * TraceCorrelationMatrix — Event type correlation heatmap.
 *
 * @example
 * ```tsx
 * <TraceCorrelationMatrix events={traceEvents} maxItems={10} />
 * ```
 */
export const TraceCorrelationMatrix: React.FC<TraceCorrelationMatrixProps> = ({
  events,
  maxItems = 8,
  className = "",
  "data-testid": dataTestId = "trace-correlation-matrix",
}) => {
  const { actions, matrix, maxVal } = useMemo(() => {
    const actionCounts: Record<string, number> = {};
    for (const e of events) {
      actionCounts[e.action] = (actionCounts[e.action] || 0) + 1;
    }

    const actions = Object.entries(actionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxItems)
      .map(([a]) => a);

    const matrix: number[][] = actions.map(() => actions.map(() => 0));

    for (let i = 0; i < events.length - 1; i++) {
      const aIdx = actions.indexOf(events[i].action);
      const bIdx = actions.indexOf(events[i + 1].action);
      if (aIdx >= 0 && bIdx >= 0) {
        matrix[aIdx][bIdx] += 1;
      }
    }

    const maxVal = Math.max(...matrix.flat(), 1);
    return { actions, matrix, maxVal };
  }, [events, maxItems]);

  return (
    <div
      className={`tf-trace-correlation-matrix ${className}`}
      data-testid={dataTestId}
    >
      <h5 className="tf-trace-correlation-matrix__title">
        Event Correlation
      </h5>
      <div className="tf-trace-correlation-matrix__grid">
        {/* Header row */}
        <div className="tf-trace-correlation-matrix__row">
          <div className="tf-trace-correlation-matrix__cell tf-trace-correlation-matrix__cell--header" />
          {actions.map((a) => (
            <div
              key={a}
              className="tf-trace-correlation-matrix__cell tf-trace-correlation-matrix__cell--header"
              title={a}
            >
              {a.slice(0, 3)}
            </div>
          ))}
        </div>
        {/* Data rows */}
        {actions.map((row, i) => (
          <div key={row} className="tf-trace-correlation-matrix__row">
            <div
              className="tf-trace-correlation-matrix__cell tf-trace-correlation-matrix__cell--header"
              title={row}
            >
              {row.slice(0, 3)}
            </div>
            {actions.map((_, j) => (
              <div
                key={`${i}-${j}`}
                className="tf-trace-correlation-matrix__cell"
                style={{
                  backgroundColor: `rgba(6,182,212,${matrix[i][j] / maxVal})`,
                }}
                title={`${row} → ${actions[j]}: ${matrix[i][j]}`}
              >
                {matrix[i][j] > 0 ? matrix[i][j] : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

TraceCorrelationMatrix.displayName = "TraceCorrelationMatrix";

export default TraceCorrelationMatrix;
