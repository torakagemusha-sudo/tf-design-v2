/**
 * @fileoverview ConsoleSpinner — Loading spinner for console.
 * Animated indicator for in-progress operations.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ConsoleSpinner
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for ConsoleSpinner. */
export interface ConsoleSpinnerProps extends BaseComponentProps {
  /** Size variant. */
  size?: "sm" | "md" | "lg";
  /** Optional label text. */
  label?: string;
}

/**
 * ConsoleSpinner — Animated loading indicator.
 *
 * @example
 * ```tsx
 * <ConsoleSpinner size="md" label="Loading data..." />
 * ```
 */
export const ConsoleSpinner: React.FC<ConsoleSpinnerProps> = ({
  size = "md",
  label,
  className = "",
  "data-testid": dataTestId = "console-spinner",
}) => {
  return (
    <span
      className={`tf-console-spinner tf-console-spinner--${size} ${className}`}
      data-testid={dataTestId}
      role="status"
      aria-label={label || "Loading"}
    >
      <span className="tf-console-spinner__dot" />
      <span className="tf-console-spinner__dot" />
      <span className="tf-console-spinner__dot" />
      {label && (
        <span className="tf-console-spinner__label">{label}</span>
      )}
    </span>
  );
};

ConsoleSpinner.displayName = "ConsoleSpinner";

export default ConsoleSpinner;
