/**
 * @fileoverview LogWrapToggle — Toggle line wrapping in the log viewer.
 * Switches between truncated and wrapped line display.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/LogWrapToggle
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for LogWrapToggle. */
export interface LogWrapToggleProps extends BaseComponentProps {
  /** Whether wrapping is enabled. */
  enabled: boolean;
  /** Toggle callback. */
  onToggle?: () => void;
  /** Show label text. */
  showLabel?: boolean;
}

/**
 * LogWrapToggle — Line wrapping control for log viewer.
 *
 * @example
 * ```tsx
 * <LogWrapToggle enabled={wrap} onToggle={() => setWrap(!wrap)} />
 * ```
 */
export const LogWrapToggle: React.FC<LogWrapToggleProps> = ({
  enabled,
  onToggle,
  showLabel = true,
  className = "",
  "data-testid": dataTestId = "log-wrap-toggle",
}) => {
  return (
    <button
      className={`tf-log-wrap-toggle ${
        enabled ? "tf-log-wrap-toggle--active" : ""
      } ${className}`}
      onClick={onToggle}
      type="button"
      aria-label={enabled ? "Disable wrapping" : "Enable wrapping"}
      aria-pressed={enabled}
    >
      <span className="tf-log-wrap-toggle__icon" aria-hidden="true">
        {enabled ? "↵" : "→"}
      </span>
      {showLabel && (
        <span className="tf-log-wrap-toggle__label">
          {enabled ? "Wrapping" : "Wrap"}
        </span>
      )}
    </button>
  );
};

LogWrapToggle.displayName = "LogWrapToggle";

export default LogWrapToggle;
