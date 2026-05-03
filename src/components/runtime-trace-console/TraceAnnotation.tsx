/**
 * @fileoverview TraceAnnotation — Add annotation to trace events.
 * Create text annotations attached to specific events.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceAnnotation
 */

import React, { useState } from "react";
import type { BaseComponentProps, TraceAnnotation as TraceAnnotationType } from "./types";

/** Props for TraceAnnotation. */
export interface TraceAnnotationProps extends BaseComponentProps {
  /** Existing annotations. */
  annotations: TraceAnnotationType[];
  /** Event ID to annotate (if creating). */
  eventId?: string;
  /** Callback to add annotation. */
  onAdd?: (annotation: Omit<TraceAnnotationType, "id" | "timestamp">) => void;
  /** Callback to delete annotation. */
  onDelete?: (annotationId: string) => void;
  /** Actor name. */
  actor?: string;
}

/**
 * TraceAnnotation — Annotation manager for trace events.
 *
 * @example
 * ```tsx
 * <TraceAnnotation
 *   annotations={annotations}
 *   eventId={selectedEvent}
 *   onAdd={(a) => addAnnotation(a)}
 *   actor="operator-1"
 * />
 * ```
 */
export const TraceAnnotation: React.FC<TraceAnnotationProps> = ({
  annotations,
  eventId,
  onAdd,
  onDelete,
  actor = "unknown",
  className = "",
  "data-testid": dataTestId = "trace-annotation",
}) => {
  const [text, setText] = useState("");
  const [type, setType] = useState<TraceAnnotationType["type"]>("note");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !eventId) return;
    onAdd?.({
      eventId,
      text: text.trim(),
      actor,
      type,
    });
    setText("");
  };

  const typeIcons: Record<string, string> = {
    note: "✎",
    warning: "⚠",
    action: "▶",
  };

  return (
    <div
      className={`tf-trace-annotation ${className}`}
      data-testid={dataTestId}
    >
      {/* Annotation list */}
      <div className="tf-trace-annotation__list">
        {annotations.length === 0 ? (
          <p className="tf-trace-annotation__empty">No annotations</p>
        ) : (
          annotations.map((a) => (
            <div
              key={a.id}
              className={`tf-trace-annotation__item tf-trace-annotation__item--${a.type}`}
            >
              <span className="tf-trace-annotation__icon">
                {typeIcons[a.type]}
              </span>
              <span className="tf-trace-annotation__text">{a.text}</span>
              <span className="tf-trace-annotation__meta">
                {a.actor} · {new Date(a.timestamp).toLocaleTimeString()}
              </span>
              {onDelete && (
                <button
                  className="tf-trace-annotation__delete"
                  onClick={() => onDelete(a.id)}
                  type="button"
                  aria-label="Delete annotation"
                >
                  {"✕"}
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create form */}
      {eventId && onAdd && (
        <form className="tf-trace-annotation__form" onSubmit={handleSubmit}>
          <div className="tf-trace-annotation__type-select">
            {(["note", "warning", "action"] as const).map((t) => (
              <button
                key={t}
                type="button"
                className={`tf-trace-annotation__type-btn ${
                  type === t ? "tf-trace-annotation__type-btn--active" : ""
                }`}
                onClick={() => setType(t)}
              >
                {typeIcons[t]} {t}
              </button>
            ))}
          </div>
          <input
            className="tf-input tf-input--sm"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add annotation..."
          />
          <button className="tf-btn tf-btn--sm tf-btn--primary" type="submit">
            Add
          </button>
        </form>
      )}
    </div>
  );
};

TraceAnnotation.displayName = "TraceAnnotation";

export default TraceAnnotation;
