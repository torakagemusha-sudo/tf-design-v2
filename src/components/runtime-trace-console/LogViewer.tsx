/**
 * @fileoverview LogViewer — Log file viewer with filtering, search, and highlighting.
 * Supports tail/follow mode, line wrapping, and level-based colorization.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/LogViewer
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BaseComponentProps, LogLine } from "./types";

/** Props for LogViewer. */
export interface LogViewerProps extends BaseComponentProps {
  /** Log lines to display. */
  lines: LogLine[];
  /** Whether to follow/tail new lines. */
  follow?: boolean;
  /** Whether to wrap long lines. */
  wrap?: boolean;
  /** Minimum log level to show. */
  minLevel?: string;
  /** Source filter. */
  sourceFilter?: string;
  /** Search query for highlighting. */
  searchQuery?: string;
  /** Callback when follow is toggled. */
  onToggleFollow?: () => void;
  /** Callback when wrap is toggled. */
  onToggleWrap?: () => void;
  /** Callback when a line is clicked. */
  onLineClick?: (line: LogLine) => void;
  /** Max lines to keep in DOM. */
  maxLines?: number;
}

/**
 * LogViewer — Full-featured log file viewer.
 *
 * Provides follow mode, line wrapping, level filtering, search highlighting,
 * and source filtering for operational log analysis.
 *
 * @example
 * ```tsx
 * <LogViewer
 *   lines={logLines}
 *   follow={following}
 *   wrap={wrapLines}
 *   minLevel="info"
 *   searchQuery="ERROR"
 *   onToggleFollow={() => setFollowing(!following)}
 * />
 * ```
 */
export const LogViewer: React.FC<LogViewerProps> = ({
  lines,
  follow = true,
  wrap = false,
  minLevel,
  sourceFilter,
  searchQuery = "",
  onToggleFollow,
  onToggleWrap,
  onLineClick,
  maxLines = 5000,
  className = "",
  "data-testid": dataTestId = "log-viewer",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);

  const levelOrder: Record<string, number> = {
    trace: 0, debug: 1, info: 2, warn: 3, error: 4, fatal: 5,
  };

  const filtered = useMemo(() => {
    let list = [...lines];
    if (minLevel && levelOrder[minLevel] !== undefined) {
      list = list.filter((l) => levelOrder[l.level] >= levelOrder[minLevel]);
    }
    if (sourceFilter) {
      list = list.filter((l) => l.source === sourceFilter);
    }
    if (list.length > maxLines) {
      list = list.slice(list.length - maxLines);
    }
    return list;
  }, [lines, minLevel, sourceFilter, maxLines]);

  // Auto-scroll on new lines when following
  useEffect(() => {
    if (follow && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [filtered, follow]);

  const handleLineClick = useCallback(
    (line: LogLine) => {
      setSelectedLineId(line.id);
      onLineClick?.(line);
    },
    [onLineClick]
  );

  const sources = useMemo(() => {
    const set = new Set<string>();
    for (const l of lines) set.add(l.source);
    return Array.from(set).sort();
  }, [lines]);

  return (
    <div
      className={`tf-log-viewer ${wrap ? "tf-log-viewer--wrap" : ""} ${className}`}
      data-testid={dataTestId}
    >
      {/* Toolbar */}
      <div className="tf-log-viewer__toolbar">
        <div className="tf-log-viewer__controls">
          <LogFilterBar
            minLevel={minLevel}
            sourceFilter={sourceFilter}
            sources={sources}
            onLevelChange={() => {}}
            onSourceChange={() => {}}
          />
        </div>
        <div className="tf-log-viewer__toggles">
          <LogFollowToggle enabled={follow} onToggle={onToggleFollow} />
          <LogWrapToggle enabled={wrap} onToggle={onToggleWrap} />
        </div>
      </div>

      {/* Log body */}
      <div
        ref={scrollRef}
        className="tf-log-viewer__body"
        role="log"
        aria-live="off"
      >
        {filtered.length === 0 ? (
          <div className="tf-log-viewer__empty">No log lines</div>
        ) : (
          <div className="tf-log-viewer__lines">
            {filtered.map((line) => (
              <LogLineComponent
                key={line.id}
                line={line}
                selected={selectedLineId === line.id}
                searchQuery={searchQuery}
                onClick={() => handleLineClick(line)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="tf-log-viewer__footer">
        <span className="tf-log-viewer__stats">
          Showing {filtered.length.toLocaleString()} of{" "}
          {lines.length.toLocaleString()} lines
        </span>
        {follow && (
          <span className="tf-log-viewer__following">
            <span className="tf-pulse-dot" />
            Following
          </span>
        )}
      </div>
    </div>
  );
};

/** Inline log line sub-component. */
const LogLineComponent: React.FC<{
  line: LogLine;
  selected: boolean;
  searchQuery: string;
  onClick: () => void;
}> = ({ line, selected, searchQuery, onClick }) => {
  const parts = searchQuery
    ? line.message.split(new RegExp(`(${searchQuery})`, "gi"))
    : [line.message];

  return (
    <div
      className={`tf-log-line tf-log-line--${line.level} ${
        selected ? "tf-log-line--selected" : ""
      }`}
      onClick={onClick}
    >
      <LogTimestamp timestamp={line.timestamp} />
      <LogLevelBadge level={line.level} />
      <LogSource source={line.source} />
      <span className="tf-log-line__message">
        {searchQuery
          ? parts.map((part, i) =>
              part.toLowerCase() === searchQuery.toLowerCase() ? (
                <LogHighlight key={i} term={part} />
              ) : (
                <span key={i}>{part}</span>
              )
            )
          : line.message}
      </span>
    </div>
  );
};

/** Inline sub-components (minimal implementations). */
const LogTimestamp: React.FC<{ timestamp: string }> = ({ timestamp }) => (
  <time className="tf-log-timestamp" dateTime={timestamp}>
    {new Date(timestamp).toLocaleTimeString()}
  </time>
);

const LogLevelBadge: React.FC<{ level: string }> = ({ level }) => (
  <span className={`tf-log-level-badge tf-log-level-badge--${level}`}>
    {level.toUpperCase()}
  </span>
);

const LogSource: React.FC<{ source: string }> = ({ source }) => (
  <span className="tf-log-source">[{source}]</span>
);

const LogHighlight: React.FC<{ term: string }> = ({ term }) => (
  <mark className="tf-log-highlight">{term}</mark>
);

const LogFilterBar: React.FC<{
  minLevel?: string;
  sourceFilter?: string;
  sources: string[];
  onLevelChange: (level: string) => void;
  onSourceChange: (source: string) => void;
}> = ({ minLevel, sourceFilter, sources, onLevelChange, onSourceChange }) => (
  <div className="tf-log-filter-bar">
    <select
      className="tf-select tf-select--sm"
      value={minLevel || ""}
      onChange={(e) => onLevelChange(e.target.value)}
      aria-label="Filter by log level"
    >
      <option value="">All levels</option>
      {["trace", "debug", "info", "warn", "error", "fatal"].map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}+
        </option>
      ))}
    </select>
    <select
      className="tf-select tf-select--sm"
      value={sourceFilter || ""}
      onChange={(e) => onSourceChange(e.target.value)}
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
);

const LogFollowToggle: React.FC<{
  enabled: boolean;
  onToggle?: () => void;
}> = ({ enabled, onToggle }) => (
  <button
    className={`tf-log-follow-toggle ${enabled ? "tf-log-follow-toggle--active" : ""}`}
    onClick={onToggle}
    type="button"
    aria-label={enabled ? "Stop following" : "Start following"}
  >
    {enabled ? "■" : "▶"} Follow
  </button>
);

const LogWrapToggle: React.FC<{
  enabled: boolean;
  onToggle?: () => void;
}> = ({ enabled, onToggle }) => (
  <button
    className={`tf-log-wrap-toggle ${enabled ? "tf-log-wrap-toggle--active" : ""}`}
    onClick={onToggle}
    type="button"
    aria-label={enabled ? "Disable wrapping" : "Enable wrapping"}
  >
    {"↵"} Wrap
  </button>
);

LogViewer.displayName = "LogViewer";

export default LogViewer;
