/**
 * @fileoverview ConsoleProgressOutput — Progress bar display for console.
 * Shows operation progress with percentage and optional status text.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ConsoleProgressOutput
 */

import React from "react";
import type { BaseComponentProps, ProgressData } from "./types";

/** Props for ConsoleProgressOutput. */
export interface ConsoleProgressOutputProps extends BaseComponentProps {
  /** Progress data. */
  data: ProgressData;
  /** Bar height in pixels. */
  barHeight?: number;
  /** Whether to show percentage text. */
  showPercent?: boolean;
}

/**
 * ConsoleProgressOutput — Progress bar for long-running operations.
 *
 * @example
 * ```tsx
 * <ConsoleProgressOutput
 *   data={{ label: "Uploading", current: 45, total: 100, percent: 45 }}
 *   showPercent
 * />
 * ```
 */
export const ConsoleProgressOutput: React.FC<ConsoleProgressOutputProps> = ({
  data,
  barHeight = 8,
  showPercent = true,
  className = "",
  "data-testid": dataTestId = "console-progress-output",
}) => {
  return (
    <div
      className={`tf-console-progress-output ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-console-progress-output__header">
        <span className="tf-console-progress-output__label">
          {data.label}
        </span>
        {showPercent && (
          <span className="tf-console-progress-output__percent">
            {data.percent.toFixed(0)}%
          </span>
        )}
      </div>
      <div
        className="tf-console-progress-output__bar"
        style={{ height: barHeight }}
        role="progressbar"
        aria-valuenow={data.current}
        aria-valuemin={0}
        aria-valuemax={data.total}
        aria-label={data.label}
      >
        <div
          className="tf-console-progress-output__fill"
          style={{ width: `${Math.min(data.percent, 100)}%` }}
        />
      </div>
      <div className="tf-console-progress-output__footer">
        <span>
          {data.current.toLocaleString()} / {data.total.toLocaleString()}
        </span>
        {data.status && (
          <span className="tf-console-progress-output__status">
            {data.status}
          </span>
        )}
      </div>
    </div>
  );
};

ConsoleProgressOutput.displayName = "ConsoleProgressOutput";

export default ConsoleProgressOutput;
