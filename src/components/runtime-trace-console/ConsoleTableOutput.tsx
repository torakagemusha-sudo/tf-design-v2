/**
 * @fileoverview ConsoleTableOutput — Tabular data display for console.
 * Renders arrays of objects as formatted tables.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ConsoleTableOutput
 */

import React, { useMemo } from "react";
import type { BaseComponentProps } from "./types";

/** Props for ConsoleTableOutput. */
export interface ConsoleTableOutputProps extends BaseComponentProps {
  /** Table data (array of objects). */
  data: Record<string, unknown>[];
  /** Column order override. */
  columns?: string[];
  /** Maximum rows to display. */
  maxRows?: number;
  /** Whether to show row numbers. */
  showRowNumbers?: boolean;
}

/**
 * ConsoleTableOutput — Console tabular output.
 *
 * @example
 * ```tsx
 * <ConsoleTableOutput
 *   data={[{ name: "api", status: "up" }, { name: "db", status: "up" }]}
 *   showRowNumbers
 * />
 * ```
 */
export const ConsoleTableOutput: React.FC<ConsoleTableOutputProps> = ({
  data,
  columns: propColumns,
  maxRows = 100,
  showRowNumbers = false,
  className = "",
  "data-testid": dataTestId = "console-table-output",
}) => {
  const columns = useMemo(() => {
    if (propColumns) return propColumns;
    const set = new Set<string>();
    for (const row of data) {
      for (const key of Object.keys(row)) set.add(key);
    }
    return Array.from(set);
  }, [data, propColumns]);

  const visible = data.slice(0, maxRows);

  return (
    <div
      className={`tf-console-table-output ${className}`}
      data-testid={dataTestId}
    >
      <table className="tf-console-table-output__table">
        <thead>
          <tr>
            {showRowNumbers && <th className="tf-console-table-output__row-num">#</th>}
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visible.map((row, i) => (
            <tr key={i}>
              {showRowNumbers && (
                <td className="tf-console-table-output__row-num">{i + 1}</td>
              )}
              {columns.map((col) => (
                <td key={col}>
                  {row[col] === undefined
                    ? ""
                    : typeof row[col] === "object"
                      ? JSON.stringify(row[col])
                      : String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > maxRows && (
        <div className="tf-console-table-output__truncated">
          Showing {maxRows} of {data.length} rows
        </div>
      )}
    </div>
  );
};

ConsoleTableOutput.displayName = "ConsoleTableOutput";

export default ConsoleTableOutput;
