/**
 * @fileoverview ConsoleJsonOutput — Collapsible JSON display.
 * Pretty-prints JSON with expand/collapse for nested objects.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ConsoleJsonOutput
 */

import React, { useState } from "react";
import type { BaseComponentProps } from "./types";

/** Props for ConsoleJsonOutput. */
export interface ConsoleJsonOutputProps extends BaseComponentProps {
  /** JSON data to display. */
  data: unknown;
  /** Initial expand depth (0 = collapsed, -1 = all expanded). */
  initialDepth?: number;
  /** Maximum string length before truncation. */
  maxStringLength?: number;
}

/**
 * ConsoleJsonOutput — Collapsible JSON tree viewer.
 *
 * @example
 * ```tsx
 * <ConsoleJsonOutput
 *   data={{ nested: { key: "value", arr: [1, 2, 3] } }}
 *   initialDepth={2}
 * />
 * ```
 */
export const ConsoleJsonOutput: React.FC<ConsoleJsonOutputProps> = ({
  data,
  initialDepth = 2,
  maxStringLength = 200,
  className = "",
  "data-testid": dataTestId = "console-json-output",
}) => {
  return (
    <div
      className={`tf-console-json-output ${className}`}
      data-testid={dataTestId}
    >
      <JsonNode
        value={data}
        depth={0}
        maxDepth={initialDepth}
        keyName={undefined}
        maxStringLength={maxStringLength}
      />
    </div>
  );
};

/** Recursive JSON node renderer. */
const JsonNode: React.FC<{
  value: unknown;
  depth: number;
  maxDepth: number;
  keyName?: string;
  maxStringLength: number;
}> = ({ value, depth, maxDepth, keyName, maxStringLength }) => {
  const [expanded, setExpanded] = useState(depth < maxDepth);
  const indent = depth * 1;

  const renderValue = (v: unknown): React.ReactNode => {
    if (v === null) return <span className="tf-console-json-output__null">null</span>;
    if (v === undefined)
      return <span className="tf-console-json-output__undefined">undefined</span>;
    if (typeof v === "boolean")
      return <span className="tf-console-json-output__boolean">{String(v)}</span>;
    if (typeof v === "number")
      return <span className="tf-console-json-output__number">{v}</span>;
    if (typeof v === "string") {
      const display =
        v.length > maxStringLength ? `${v.slice(0, maxStringLength)}...` : v;
      return (
        <span className="tf-console-json-output__string">
          &quot;{display}&quot;
        </span>
      );
    }
    return null;
  };

  if (typeof value !== "object" || value === null) {
    return (
      <div style={{ paddingLeft: `${indent}rem` }}>
        {keyName !== undefined && (
          <span className="tf-console-json-output__key">{keyName}: </span>
        )}
        {renderValue(value)}
      </div>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <div style={{ paddingLeft: `${indent}rem` }}>
          {keyName !== undefined && (
            <span className="tf-console-json-output__key">{keyName}: </span>
          )}
          <span>[]</span>
        </div>
      );
    }

    return (
      <div style={{ paddingLeft: `${indent}rem` }}>
        {keyName !== undefined && (
          <span className="tf-console-json-output__key">{keyName}: </span>
        )}
        <button
          className="tf-console-json-output__toggle"
          onClick={() => setExpanded(!expanded)}
          type="button"
        >
          {expanded ? "▼" : "▶"} [{value.length}]
        </button>
        {expanded &&
          value.map((item, i) => (
            <JsonNode
              key={i}
              value={item}
              depth={depth + 1}
              maxDepth={maxDepth}
              maxStringLength={maxStringLength}
            />
          ))}
      </div>
    );
  }

  // Object
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0) {
    return (
      <div style={{ paddingLeft: `${indent}rem` }}>
        {keyName !== undefined && (
          <span className="tf-console-json-output__key">{keyName}: </span>
        )}
        <span>{"{}"}</span>
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: `${indent}rem` }}>
      {keyName !== undefined && (
        <span className="tf-console-json-output__key">{keyName}: </span>
      )}
      <button
        className="tf-console-json-output__toggle"
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        {expanded ? "▼" : "▶"} {"{"}{entries.length}{"}"}
      </button>
      {expanded &&
        entries.map(([k, v]) => (
          <JsonNode
            key={k}
            value={v}
            depth={depth + 1}
            maxDepth={maxDepth}
            keyName={k}
            maxStringLength={maxStringLength}
          />
        ))}
    </div>
  );
};

ConsoleJsonOutput.displayName = "ConsoleJsonOutput";

export default ConsoleJsonOutput;
