/**
 * @fileoverview TraceEventMetadata — Event metadata key-value display.
 * Shows arbitrary metadata attached to a trace event.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceEventMetadata
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceEventMetadata. */
export interface TraceEventMetadataProps extends BaseComponentProps {
  /** Metadata record. */
  metadata: Record<string, unknown>;
  /** Title for the section. */
  title?: string;
}

/**
 * TraceEventMetadata — Key-value metadata display for trace events.
 *
 * @example
 * ```tsx
 * <TraceEventMetadata metadata={event.metadata} title="Request Headers" />
 * ```
 */
export const TraceEventMetadata: React.FC<TraceEventMetadataProps> = ({
  metadata,
  title = "Metadata",
  className = "",
  "data-testid": dataTestId = "trace-event-metadata",
}) => {
  const entries = Object.entries(metadata);
  if (entries.length === 0) return null;

  return (
    <div
      className={`tf-trace-event-metadata ${className}`}
      data-testid={dataTestId}
    >
      <h5 className="tf-trace-event-metadata__title">{title}</h5>
      <dl className="tf-trace-event-metadata__list">
        {entries.map(([key, value]) => (
          <div key={key} className="tf-trace-event-metadata__item">
            <dt className="tf-trace-event-metadata__key">{key}</dt>
            <dd className="tf-trace-event-metadata__value">
              {typeof value === "string"
                ? value
                : JSON.stringify(value, null, 2)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

TraceEventMetadata.displayName = "TraceEventMetadata";

export default TraceEventMetadata;
