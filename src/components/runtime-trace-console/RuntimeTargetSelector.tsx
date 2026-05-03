/**
 * @fileoverview RuntimeTargetSelector — Select runtime target environment.
 * Dropdown or card grid for choosing the active runtime target.
 * Follows Torafirma Section 9 Runtime Boundary Rules.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/RuntimeTargetSelector
 */

import React, { useCallback, useState } from "react";
import type { BaseComponentProps, RuntimeTarget } from "./types";

/** Props for RuntimeTargetSelector. */
export interface RuntimeTargetSelectorProps extends BaseComponentProps {
  /** Available runtime targets. */
  targets: RuntimeTarget[];
  /** Currently selected target ID. */
  selectedId?: string;
  /** Callback when target changes. */
  onSelect: (target: RuntimeTarget) => void;
  /** Callback to refresh targets list. */
  onRefresh?: () => void;
  /** Whether targets are loading. */
  loading?: boolean;
  /** Display variant. */
  variant?: "dropdown" | "cards" | "compact";
}

/**
 * RuntimeTargetSelector — Target environment selector.
 *
 * Allows operators to choose which runtime to observe or execute against.
 * Per Section 9.3, disconnected targets are shown as blocked.
 *
 * @example
 * ```tsx
 * <RuntimeTargetSelector
 *   targets={runtimes}
 *   selectedId={activeRuntime?.id}
 *   onSelect={(t) => setActiveRuntime(t)}
 *   variant="cards"
 * />
 * ```
 */
export const RuntimeTargetSelector: React.FC<RuntimeTargetSelectorProps> = ({
  targets,
  selectedId,
  onSelect,
  onRefresh,
  loading = false,
  variant = "dropdown",
  className = "",
  "data-testid": dataTestId = "runtime-target-selector",
}) => {
  const [open, setOpen] = useState(false);

  const selected = targets.find((t) => t.id === selectedId);

  const handleSelect = useCallback(
    (target: RuntimeTarget) => {
      onSelect(target);
      setOpen(false);
    },
    [onSelect]
  );

  if (variant === "cards") {
    return (
      <div
        className={`tf-runtime-target-selector tf-runtime-target-selector--cards ${className}`}
        data-testid={dataTestId}
      >
        <div className="tf-runtime-target-selector__header">
          <h4 className="tf-runtime-target-selector__title">Runtime Targets</h4>
          {onRefresh && (
            <button
              className={`tf-btn tf-btn--sm tf-btn--ghost ${loading ? "tf-btn--loading" : ""}`}
              onClick={onRefresh}
              type="button"
              aria-label="Refresh targets"
            >
              {"↻"}
            </button>
          )}
        </div>
        <div className="tf-runtime-target-selector__grid">
          {targets.map((target) => (
            <RuntimeTargetCard
              key={target.id}
              target={target}
              selected={selectedId === target.id}
              onClick={() => handleSelect(target)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={`tf-runtime-target-selector tf-runtime-target-selector--compact ${className}`}
        data-testid={dataTestId}
      >
        <button
          className={`tf-runtime-target-selector__trigger tf-runtime-target-selector__trigger--${selected?.connection || "unknown"}`}
          onClick={() => setOpen(!open)}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="tf-runtime-target-selector__status-dot" />
          <span className="tf-runtime-target-selector__name">
            {selected?.name || "Select runtime..."}
          </span>
          <span className="tf-runtime-target-selector__chevron">
            {open ? "▴" : "▾"}
          </span>
        </button>
        {open && (
          <ul className="tf-runtime-target-selector__menu" role="listbox">
            {targets.map((target) => (
              <li
                key={target.id}
                className={`tf-runtime-target-selector__menu-item ${
                  selectedId === target.id ? "tf-runtime-target-selector__menu-item--selected" : ""
                }`}
                onClick={() => handleSelect(target)}
                role="option"
                aria-selected={selectedId === target.id}
              >
                <span
                  className={`tf-runtime-target-selector__menu-dot tf-runtime-target-selector__menu-dot--${target.connection}`}
                />
                <span className="tf-runtime-target-selector__menu-name">
                  {target.name}
                </span>
                <span className="tf-runtime-target-selector__menu-type">
                  {target.type}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Default: dropdown
  return (
    <div
      className={`tf-runtime-target-selector tf-runtime-target-selector--dropdown ${className}`}
      data-testid={dataTestId}
    >
      <label className="tf-runtime-target-selector__label">
        Runtime Target
        <select
          className="tf-select"
          value={selectedId || ""}
          onChange={(e) => {
            const target = targets.find((t) => t.id === e.target.value);
            if (target) handleSelect(target);
          }}
          aria-label="Select runtime target"
        >
          <option value="">-- Select target --</option>
          {targets.map((target) => (
            <option key={target.id} value={target.id}>
              {target.name} ({target.type}) [{target.connection}]
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

/** Inline card sub-component. */
const RuntimeTargetCard: React.FC<{
  target: RuntimeTarget;
  selected: boolean;
  onClick: () => void;
}> = ({ target, selected, onClick }) => (
  <button
    className={`tf-runtime-target-card ${
      selected ? "tf-runtime-target-card--selected" : ""
    } tf-runtime-target-card--${target.connection}`}
    onClick={onClick}
    type="button"
  >
    <div className="tf-runtime-target-card__header">
      <span
        className={`tf-runtime-target-card__status tf-runtime-target-card__status--${target.connection}`}
      />
      <span className="tf-runtime-target-card__name">{target.name}</span>
    </div>
    <div className="tf-runtime-target-card__meta">
      <span className="tf-runtime-target-card__type">{target.type}</span>
      {target.version && (
        <span className="tf-runtime-target-card__version">v{target.version}</span>
      )}
      {target.region && (
        <span className="tf-runtime-target-card__region">{target.region}</span>
      )}
    </div>
    <RuntimeTargetStatus connection={target.connection} state={target.state} />
  </button>
);

/** Inline status sub-component. */
const RuntimeTargetStatus: React.FC<{
  connection: RuntimeTarget["connection"];
  state: RuntimeTarget["state"];
}> = ({ connection, state }) => (
  <div className="tf-runtime-target-status">
    <span
      className={`tf-runtime-target-status__connection tf-runtime-target-status__connection--${connection}`}
    >
      {connection}
    </span>
    <span
      className={`tf-badge tf-badge--state-${state.toLowerCase()}`}
    >
      {state}
    </span>
  </div>
);

RuntimeTargetSelector.displayName = "RuntimeTargetSelector";

export default RuntimeTargetSelector;
