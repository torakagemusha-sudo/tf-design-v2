/**
 * @fileoverview RuntimeSwitchButton — Switch runtime target button.
 * Allows quick switching between configured runtime targets.
 *
 * @module @torafirma/design-system/runtime-trace-console/RuntimeSwitchButton
 */

import React, { useState } from "react";
import type { BaseComponentProps, RuntimeTarget } from "./types";

/** Props for RuntimeSwitchButton. */
export interface RuntimeSwitchButtonProps extends BaseComponentProps {
  /** Available runtime targets. */
  targets: RuntimeTarget[];
  /** Currently active target ID. */
  activeTargetId?: string;
  /** Callback when target is switched. */
  onSwitch: (target: RuntimeTarget) => void;
  /** Button label. */
  label?: string;
}

/**
 * RuntimeSwitchButton — Target switcher with dropdown.
 *
 * @example
 * ```tsx
 * <RuntimeSwitchButton
 *   targets={runtimes}
 *   activeTargetId={active?.id}
 *   onSwitch={(t) => setActive(t)}
 * />
 * ```
 */
export const RuntimeSwitchButton: React.FC<RuntimeSwitchButtonProps> = ({
  targets,
  activeTargetId,
  onSwitch,
  label = "Switch Runtime",
  className = "",
  "data-testid": dataTestId = "runtime-switch-button",
}) => {
  const [open, setOpen] = useState(false);
  const active = targets.find((t) => t.id === activeTargetId);

  return (
    <div
      className={`tf-runtime-switch-button ${className}`}
      data-testid={dataTestId}
    >
      <button
        className="tf-btn tf-btn--sm tf-btn--secondary"
        onClick={() => setOpen(!open)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={`tf-runtime-switch-button__dot tf-runtime-switch-button__dot--${active?.connection || "unknown"}`}
        />
        <span className="tf-runtime-switch-button__label">{label}</span>
        <span className="tf-runtime-switch-button__active">
          {active?.name || "Select..."}
        </span>
        <span className="tf-runtime-switch-button__chevron">
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open && (
        <div className="tf-runtime-switch-button__menu">
          {targets.map((target) => (
            <button
              key={target.id}
              className={`tf-runtime-switch-button__item ${
                target.id === activeTargetId
                  ? "tf-runtime-switch-button__item--active"
                  : ""
              }`}
              onClick={() => {
                onSwitch(target);
                setOpen(false);
              }}
              type="button"
            >
              <span
                className={`tf-runtime-switch-button__item-dot tf-runtime-switch-button__item-dot--${target.connection}`}
              />
              <span className="tf-runtime-switch-button__item-name">
                {target.name}
              </span>
              <span className="tf-runtime-switch-button__item-type">
                {target.type}
              </span>
              <span
                className={`tf-badge tf-badge--state-${target.state.toLowerCase()} tf-badge--sm`}
              >
                {target.state}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

RuntimeSwitchButton.displayName = "RuntimeSwitchButton";

export default RuntimeSwitchButton;
