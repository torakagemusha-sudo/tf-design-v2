/**
 * @fileoverview LogFollowToggle — Toggle follow/tail mode for log viewer.
 * Controls whether the viewer auto-scrolls to new lines.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/LogFollowToggle
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for LogFollowToggle. */
export interface LogFollowToggleProps extends BaseComponentProps {
  /** Whether follow mode is active. */
  enabled: boolean;
  /** Toggle callback. */
  onToggle?: () => void;
  /** Show label text. */
  showLabel?: boolean;
}

/**
 * LogFollowToggle — Follow/tail mode control.
 *
 * @example
 * ```tsx
 * <LogFollowToggle enabled={following} onToggle={() => setFollowing(!following)} />
 * ```
 */
export const LogFollowToggle: React.FC<LogFollowToggleProps> = ({
  enabled,
  onToggle,
  showLabel = true,
  className = "",
  "data-testid": dataTestId = "log-follow-toggle",
}) => {
  return (
    <button
      className={`tf-log-follow-toggle ${
        enabled ? "tf-log-follow-toggle--active" : ""
      } ${className}`}
      onClick={onToggle}
      type="button"
      aria-label={enabled ? "Stop following" : "Start following"}
      aria-pressed={enabled}
    >
      <span className="tf-log-follow-toggle__icon" aria-hidden="true">
        {enabled ? "■" : "▶"}
      </span>
      {showLabel && (
        <span className="tf-log-follow-toggle__label">
          {enabled ? "Following" : "Follow"}
        </span>
      )}
      {enabled && <span className="tf-pulse-dot" />}
    </button>
  );
};

LogFollowToggle.displayName = "LogFollowToggle";

export default LogFollowToggle;
