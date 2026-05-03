/**
 * @fileoverview ConsoleOutput — Console output area for command results.
 * Displays typed output blocks (text, JSON, table, error, etc.).
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ConsoleOutput
 */

import React, { useEffect, useRef } from "react";
import type { BaseComponentProps, ConsoleOutputBlock } from "./types";

/** Props for ConsoleOutput. */
export interface ConsoleOutputProps extends BaseComponentProps {
  /** Output blocks to display. */
  blocks: ConsoleOutputBlock[];
  /** Whether to auto-scroll. */
  autoScroll?: boolean;
  /** Max blocks to keep. */
  maxBlocks?: number;
  /** Whether to show timestamps. */
  showTimestamps?: boolean;
}

/**
 * ConsoleOutput — Typed console output display.
 *
 * Renders different output types with appropriate formatting.
 *
 * @example
 * ```tsx
 * <ConsoleOutput
 *   blocks={outputBlocks}
 *   autoScroll
 *   showTimestamps
 * />
 * ```
 */
export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  blocks,
  autoScroll = true,
  maxBlocks = 500,
  showTimestamps = false,
  className = "",
  "data-testid": dataTestId = "console-output",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [blocks, autoScroll]);

  const visible = blocks.length > maxBlocks
    ? blocks.slice(blocks.length - maxBlocks)
    : blocks;

  return (
    <div
      className={`tf-console-output ${className}`}
      data-testid={dataTestId}
      ref={scrollRef}
    >
      {visible.map((block) => (
        <ConsoleOutputBlockComponent
          key={block.id}
          block={block}
          showTimestamp={showTimestamps}
        />
      ))}
      {visible.length === 0 && (
        <div className="tf-console-output__empty">No output</div>
      )}
    </div>
  );
};

/** Render a single output block based on type. */
const ConsoleOutputBlockComponent: React.FC<{
  block: ConsoleOutputBlock;
  showTimestamp: boolean;
}> = ({ block, showTimestamp }) => {
  const content = block.content;

  return (
    <div className={`tf-console-output__block tf-console-output__block--${block.type}`}>
      {showTimestamp && (
        <time className="tf-console-output__timestamp" dateTime={block.timestamp}>
          {new Date(block.timestamp).toLocaleTimeString()}
        </time>
      )}
      {block.type === "text" && (
        <pre className="tf-console-output__text">{String(content)}</pre>
      )}
      {block.type === "json" && (
        <pre className="tf-console-output__json">
          {JSON.stringify(content, null, 2)}
        </pre>
      )}
      {block.type === "error" && (
        <div className="tf-console-output__error">{String(content)}</div>
      )}
      {block.type === "warning" && (
        <div className="tf-console-output__warning">{String(content)}</div>
      )}
      {block.type === "info" && (
        <div className="tf-console-output__info">{String(content)}</div>
      )}
      {block.type === "debug" && (
        <div className="tf-console-output__debug">{String(content)}</div>
      )}
      {block.type === "table" && Array.isArray(content) && (
        <ConsoleTableOutput data={content as Record<string, unknown>[]} />
      )}
      {block.type === "progress" && (
        <ConsoleProgressOutput data={content as Record<string, unknown>} />
      )}
      {block.type === "spinner" && <ConsoleSpinner />}
    </div>
  );
};

/** Inline table sub-component. */
const ConsoleTableOutput: React.FC<{ data: Record<string, unknown>[] }> = ({
  data,
}) => {
  if (data.length === 0) return null;
  const columns = Object.keys(data[0]);
  return (
    <table className="tf-console-table-output">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={c}>{String(row[c])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/** Inline progress sub-component. */
const ConsoleProgressOutput: React.FC<{ data: Record<string, unknown> }> = ({
  data,
}) => {
  const current = Number(data.current) || 0;
  const total = Number(data.total) || 1;
  const pct = Math.min((current / total) * 100, 100);
  return (
    <div className="tf-console-progress-output">
      <span className="tf-console-progress-output__label">
        {String(data.label || "Progress")}
      </span>
      <div className="tf-console-progress-output__bar">
        <div
          className="tf-console-progress-output__fill"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="tf-console-progress-output__value">
        {current}/{total} ({pct.toFixed(0)}%)
      </span>
    </div>
  );
};

/** Inline spinner sub-component. */
const ConsoleSpinner: React.FC = () => (
  <span className="tf-console-spinner" aria-label="Loading">
    <span className="tf-console-spinner__dot" />
    <span className="tf-console-spinner__dot" />
    <span className="tf-console-spinner__dot" />
  </span>
);

ConsoleOutput.displayName = "ConsoleOutput";

export default ConsoleOutput;
