/**
 * @fileoverview RuntimeTargetCard — Target environment card display.
 * Shows runtime identity, connection status, and key metadata.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/RuntimeTargetCard
 */

import React from "react";
import type { BaseComponentProps, RuntimeTarget } from "./types";

/** Props for RuntimeTargetCard. */
export interface RuntimeTargetCardProps extends BaseComponentProps {
  /** Runtime target to display. */
  target: RuntimeTarget;
  /** Whether this card is the currently selected target. */
  selected?: boolean;
  /** Click handler. */
  onClick?: (target: RuntimeTarget) => void;
  /** Whether to show metrics inline. */
  showMetrics?: boolean;
}

/**
 * RuntimeTargetCard — Card display for a single runtime target.
 *
 * Presents target identity, connection health, version, and optional metrics.
 * Per Section 9, disconnected targets show blocked state visually.
 *
 * @example
 * ```tsx
 * <RuntimeTargetCard
 *   target={runtime}
 *   selected={runtime.id === activeId}
 *   onClick={(t) => setActive(t.id)}
 *   showMetrics
 * />
 * ```
 */
export const RuntimeTargetCard: React.FC<RuntimeTargetCardProps> = ({
  target,
  selected = false,
  onClick,
  showMetrics = false,
  className = "",
  "data-testid": dataTestId = "runtime-target-card",
}) => {
  const connected = target.connection === "connected";

  return (
    <div
      className={`tf-runtime-target-card ${
        selected ? "tf-runtime-target-card--selected" : ""
      } tf-runtime-target-card--${target.connection} ${className}`}
      data-testid={dataTestId}
      onClick={() => onClick?.(target)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="tf-runtime-target-card__header">
        <span
          className={`tf-runtime-target-card__indicator tf-runtime-target-card__indicator--${target.connection}`}
          aria-hidden="true"
        />
        <span className="tf-runtime-target-card__name">{target.name}</span>
        <span
          className={`tf-badge tf-badge--state-${target.state.toLowerCase()} tf-badge--sm`}
        >
          {target.state}
        </span>
      </div>

      <div className="tf-runtime-target-card__details">
        <span className="tf-runtime-target-card__detail">
          <span className="tf-runtime-target-card__label">Type</span>
          <span className="tf-runtime-target-card__value">{target.type}</span>
        </span>
        {target.version && (
          <span className="tf-runtime-target-card__detail">
            <span className="tf-runtime-target-card__label">Version</span>
            <span className="tf-runtime-target-card__value">
              {target.version}
            </span>
          </span>
        )}
        {target.region && (
          <span className="tf-runtime-target-card__detail">
            <span className="tf-runtime-target-card__label">Region</span>
            <span className="tf-runtime-target-card__value">
              {target.region}
            </span>
          </span>
        )}
        <span className="tf-runtime-target-card__detail">
          <span className="tf-runtime-target-card__label">Connection</span>
          <span
            className={`tf-runtime-target-card__value tf-runtime-target-card__value--${target.connection}`}
          >
            {target.connection}
          </span>
        </span>
        {target.lastSeen && (
          <span className="tf-runtime-target-card__detail">
            <span className="tf-runtime-target-card__label">Last seen</span>
            <span className="tf-runtime-target-card__value">
              {new Date(target.lastSeen).toLocaleTimeString()}
            </span>
          </span>
        )}
      </div>

      {showMetrics && target.metrics && (
        <div className="tf-runtime-target-card__metrics">
          <div className="tf-runtime-target-card__metric">
            <span className="tf-runtime-target-card__metric-label">CPU</span>
            <span className="tf-runtime-target-card__metric-value">
              {target.metrics.cpuPercent.toFixed(1)}%
            </span>
            <div className="tf-runtime-target-card__metric-bar">
              <div
                className="tf-runtime-target-card__metric-fill"
                style={{ width: `${target.metrics.cpuPercent}%` }}
              />
            </div>
          </div>
          <div className="tf-runtime-target-card__metric">
            <span className="tf-runtime-target-card__metric-label">MEM</span>
            <span className="tf-runtime-target-card__metric-value">
              {target.metrics.memoryMb} MB
            </span>
            <div className="tf-runtime-target-card__metric-bar">
              <div
                className="tf-runtime-target-card__metric-fill"
                style={{
                  width: `${
                    target.metrics.memoryLimitMb
                      ? (target.metrics.memoryMb / target.metrics.memoryLimitMb) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {target.tags && target.tags.length > 0 && (
        <div className="tf-runtime-target-card__tags">
          {target.tags.map((tag) => (
            <span key={tag} className="tf-tag tf-tag--sm">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

RuntimeTargetCard.displayName = "RuntimeTargetCard";

export default RuntimeTargetCard;
