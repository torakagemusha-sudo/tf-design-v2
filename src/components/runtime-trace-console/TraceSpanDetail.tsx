/**
 * @fileoverview TraceSpanDetail — Span detail panel.
 * Shows full information about a trace span including events and tags.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceSpanDetail
 */

import React from "react";
import type { BaseComponentProps, TraceSpan } from "./types";

/** Props for TraceSpanDetail. */
export interface TraceSpanDetailProps extends BaseComponentProps {
  /** Span to display. */
  span: TraceSpan;
  /** Callback to close panel. */
  onClose?: () => void;
}

/**
 * TraceSpanDetail — Detailed span inspector panel.
 *
 * @example
 * ```tsx
 * <TraceSpanDetail span={selectedSpan} onClose={() => setSelected(null)} />
 * ```
 */
export const TraceSpanDetail: React.FC<TraceSpanDetailProps> = ({
  span,
  onClose,
  className = "",
  "data-testid": dataTestId = "trace-span-detail",
}) => {
  return (
    <div
      className={`tf-trace-span-detail tf-trace-span-detail--${span.status} ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-span-detail__header">
        <h4 className="tf-trace-span-detail__name">{span.name}</h4>
        <span className={`tf-badge tf-badge--${span.status}`}>
          {span.status}
        </span>
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

      <div className="tf-trace-span-detail__body">
        <div className="tf-trace-span-detail__field">
          <span className="tf-trace-span-detail__label">ID</span>
          <code className="tf-trace-span-detail__value">{span.id}</code>
        </div>
        <div className="tf-trace-span-detail__field">
          <span className="tf-trace-span-detail__label">Service</span>
          <span className="tf-trace-span-detail__value">{span.service}</span>
        </div>
        <div className="tf-trace-span-detail__field">
          <span className="tf-trace-span-detail__label">Duration</span>
          <span className="tf-trace-span-detail__value">
            {span.durationMs >= 1000
              ? `${(span.durationMs / 1000).toFixed(2)}s`
              : `${span.durationMs}ms`}
          </span>
        </div>
        <div className="tf-trace-span-detail__field">
          <span className="tf-trace-span-detail__label">Timeline</span>
          <span className="tf-trace-span-detail__value">
            {span.startTime}ms – {span.endTime}ms
          </span>
        </div>

        {span.tags && Object.keys(span.tags).length > 0 && (
          <div className="tf-trace-span-detail__tags">
            <h5 className="tf-trace-span-detail__section-title">Tags</h5>
            {Object.entries(span.tags).map(([key, value]) => (
              <span key={key} className="tf-tag tf-tag--sm">
                {key}={value}
              </span>
            ))}
          </div>
        )}

        {span.events && span.events.length > 0 && (
          <div className="tf-trace-span-detail__events">
            <h5 className="tf-trace-span-detail__section-title">Events</h5>
            <ul className="tf-trace-span-detail__event-list">
              {span.events.map((evt, i) => (
                <li key={i} className="tf-trace-span-detail__event">
                  <time>{evt.timestamp}ms</time>
                  <span>{evt.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

TraceSpanDetail.displayName = "TraceSpanDetail";

export default TraceSpanDetail;
