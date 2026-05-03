/**
 * @fileoverview LogFilterBar — Filter bar for logs by level and source.
 * Provides dropdown selectors and quick-filter chips.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/LogFilterBar
 */

import React, { useCallback } from "react";
import type { BaseComponentProps, LogLevel } from "./types";

/** Props for LogFilterBar. */
export interface LogFilterBarProps extends BaseComponentProps {
  /** Current minimum level filter. */
  minLevel?: LogLevel;
  /** Current source filter. */
  sourceFilter?: string;
  /** Available sources. */
  sources: string[];
  /** Available levels. */
  levels?: LogLevel[];
  /** Callback when min level changes. */
  onLevelChange?: (level: LogLevel | undefined) => void;
  /** Callback when source changes. */
  onSourceChange?: (source: string | undefined) => void;
  /** Level counts for badge display. */
  levelCounts?: Record<string, number>;
}

/**
 * LogFilterBar — Level and source filtering for log viewer.
 *
 * @example
 * ```tsx
 * <LogFilterBar
 *   minLevel="warn"
 *   sourceFilter="api"
 *   sources={["api", "db", "cache"]}
 *   levelCounts={{ info: 100, warn: 5, error: 2 }}
 *   onLevelChange={(l) => setMinLevel(l)}
 * />
 * ```
 */
export const LogFilterBar: React.FC<LogFilterBarProps> = ({
  minLevel,
  sourceFilter,
  sources,
  levels = ["trace", "debug", "info", "warn", "error", "fatal"],
  onLevelChange,
  onSourceChange,
  levelCounts,
  className = "",
  "data-testid": dataTestId = "log-filter-bar",
}) => {
  const handleLevelClick = useCallback(
    (level: LogLevel) => {
      onLevelChange?.(minLevel === level ? undefined : level);
    },
    [minLevel, onLevelChange]
  );

  return (
    <div
      className={`tf-log-filter-bar ${className}`}
      data-testid={dataTestId}
    >
      {/* Level filter chips */}
      <div className="tf-log-filter-bar__levels" role="group" aria-label="Filter by level">
        {levels.map((level) => (
          <button
            key={level}
            className={`tf-log-filter-bar__chip ${
              minLevel === level ? "tf-log-filter-bar__chip--active" : ""
            } tf-log-filter-bar__chip--${level}`}
            onClick={() => handleLevelClick(level)}
            type="button"
          >
            {level.toUpperCase()}
            {levelCounts?.[level] !== undefined && (
              <span className="tf-log-filter-bar__chip-count">
                {levelCounts[level]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Source filter */}
      {sources.length > 0 && (
        <div className="tf-log-filter-bar__source">
          <select
            className="tf-select tf-select--sm"
            value={sourceFilter || ""}
            onChange={(e) =>
              onSourceChange?.(e.target.value || undefined)
            }
            aria-label="Filter by source"
          >
            <option value="">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

LogFilterBar.displayName = "LogFilterBar";

export default LogFilterBar;
