/**
 * @fileoverview TraceConsoleSettings — Console settings panel.
 * Controls display preferences: timestamps, severity colors, auto-scroll, max events.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceConsoleSettings
 */

import React, { useCallback, useState } from "react";
import type { BaseComponentProps } from "./types";

/** Console settings state. */
export interface ConsoleSettings {
  showTimestamps: boolean;
  showSeverityColors: boolean;
  showActorColumn: boolean;
  showActionColumn: boolean;
  autoScroll: boolean;
  maxEvents: number;
  timeFormat: "iso" | "locale" | "relative";
  density: "compact" | "normal" | "spacious";
}

/** Props for TraceConsoleSettings. */
export interface TraceConsoleSettingsProps extends BaseComponentProps {
  /** Current settings. */
  settings: ConsoleSettings;
  /** Callback when settings change. */
  onChange: (settings: ConsoleSettings) => void;
  /** Whether settings panel is open. */
  open?: boolean;
  /** Callback to close panel. */
  onClose?: () => void;
}

/** Default console settings. */
export const DEFAULT_CONSOLE_SETTINGS: ConsoleSettings = {
  showTimestamps: true,
  showSeverityColors: true,
  showActorColumn: true,
  showActionColumn: true,
  autoScroll: true,
  maxEvents: 10000,
  timeFormat: "locale",
  density: "normal",
};

/**
 * TraceConsoleSettings — Settings panel for trace console display preferences.
 *
 * Controls timestamp format, column visibility, auto-scroll behavior, and density.
 *
 * @example
 * ```tsx
 * const [settings, setSettings] = useState(DEFAULT_CONSOLE_SETTINGS);
 * <TraceConsoleSettings
 *   settings={settings}
 *   onChange={setSettings}
 *   open={settingsOpen}
 *   onClose={() => setSettingsOpen(false)}
 * />
 * ```
 */
export const TraceConsoleSettings: React.FC<TraceConsoleSettingsProps> = ({
  settings,
  onChange,
  open = false,
  onClose,
  className = "",
  "data-testid": dataTestId = "trace-console-settings",
}) => {
  const [local, setLocal] = useState<ConsoleSettings>(settings);

  const update = useCallback(
    <K extends keyof ConsoleSettings>(key: K, value: ConsoleSettings[K]) => {
      const next = { ...local, [key]: value };
      setLocal(next);
      onChange(next);
    },
    [local, onChange]
  );

  const reset = useCallback(() => {
    setLocal(DEFAULT_CONSOLE_SETTINGS);
    onChange(DEFAULT_CONSOLE_SETTINGS);
  }, [onChange]);

  if (!open) return null;

  return (
    <div
      className={`tf-trace-console-settings ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-console-settings__header">
        <h3 className="tf-trace-console-settings__title">Console Settings</h3>
        <button
          className="tf-btn tf-btn--sm tf-btn--ghost"
          onClick={onClose}
          type="button"
          aria-label="Close settings"
        >
          {"✕"}
        </button>
      </div>

      <div className="tf-trace-console-settings__body">
        {/* Display Options */}
        <fieldset className="tf-trace-console-settings__section">
          <legend className="tf-trace-console-settings__section-title">
            Display
          </legend>
          <label className="tf-trace-console-settings__option">
            <input
              type="checkbox"
              checked={local.showTimestamps}
              onChange={(e) => update("showTimestamps", e.target.checked)}
            />
            Show timestamps
          </label>
          <label className="tf-trace-console-settings__option">
            <input
              type="checkbox"
              checked={local.showSeverityColors}
              onChange={(e) => update("showSeverityColors", e.target.checked)}
            />
            Severity colors
          </label>
          <label className="tf-trace-console-settings__option">
            <input
              type="checkbox"
              checked={local.showActorColumn}
              onChange={(e) => update("showActorColumn", e.target.checked)}
            />
            Actor column
          </label>
          <label className="tf-trace-console-settings__option">
            <input
              type="checkbox"
              checked={local.showActionColumn}
              onChange={(e) => update("showActionColumn", e.target.checked)}
            />
            Action column
          </label>
        </fieldset>

        {/* Time Format */}
        <fieldset className="tf-trace-console-settings__section">
          <legend className="tf-trace-console-settings__section-title">
            Time Format
          </legend>
          <div className="tf-trace-console-settings__radio-group">
            {(["iso", "locale", "relative"] as const).map((fmt) => (
              <label
                key={fmt}
                className="tf-trace-console-settings__radio-option"
              >
                <input
                  type="radio"
                  name="time-format"
                  value={fmt}
                  checked={local.timeFormat === fmt}
                  onChange={() => update("timeFormat", fmt)}
                />
                {fmt === "iso"
                  ? "ISO 8601"
                  : fmt === "locale"
                    ? "Local time"
                    : "Relative"}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Density */}
        <fieldset className="tf-trace-console-settings__section">
          <legend className="tf-trace-console-settings__section-title">
            Density
          </legend>
          <div className="tf-trace-console-settings__radio-group">
            {(["compact", "normal", "spacious"] as const).map((d) => (
              <label
                key={d}
                className="tf-trace-console-settings__radio-option"
              >
                <input
                  type="radio"
                  name="density"
                  value={d}
                  checked={local.density === d}
                  onChange={() => update("density", d)}
                />
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Behavior */}
        <fieldset className="tf-trace-console-settings__section">
          <legend className="tf-trace-console-settings__section-title">
            Behavior
          </legend>
          <label className="tf-trace-console-settings__option">
            <input
              type="checkbox"
              checked={local.autoScroll}
              onChange={(e) => update("autoScroll", e.target.checked)}
            />
            Auto-scroll on new events
          </label>
          <label className="tf-trace-console-settings__option">
            <span>Max events (virtualization limit)</span>
            <input
              className="tf-input tf-input--sm tf-input--number"
              type="number"
              min={100}
              max={100000}
              step={100}
              value={local.maxEvents}
              onChange={(e) =>
                update("maxEvents", parseInt(e.target.value, 10) || 10000)
              }
            />
          </label>
        </fieldset>
      </div>

      <div className="tf-trace-console-settings__footer">
        <button className="tf-btn tf-btn--ghost" onClick={reset} type="button">
          Reset to defaults
        </button>
        <button className="tf-btn tf-btn--primary" onClick={onClose} type="button">
          Done
        </button>
      </div>
    </div>
  );
};

TraceConsoleSettings.displayName = "TraceConsoleSettings";

export default TraceConsoleSettings;
