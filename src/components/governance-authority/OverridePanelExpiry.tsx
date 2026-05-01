/**
 * @fileoverview OverridePanelExpiry — Override expiry time selector.
 *
 * Controls how long the override remains valid. Short expiry
 * reduces blast radius; long expiry reduces friction.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface OverridePanelExpiryProps extends GovernanceComponentBaseProps {
  minutes: number;
  onChange: (minutes: number) => void;
}

const PRESET_OPTIONS = [
  { label: "15 MIN", value: 15 },
  { label: "30 MIN", value: 30 },
  { label: "1 HR", value: 60 },
  { label: "4 HR", value: 240 },
  { label: "8 HR", value: 480 },
  { label: "24 HR", value: 1440 },
];

/**
 * OverridePanelExpiry lets the operator choose the override duration.
 */
const OverridePanelExpiry: React.FC<OverridePanelExpiryProps> = ({
  minutes,
  onChange,
  className = "",
  "data-testid": dataTestId = "override-panel-expiry",
}) => (
  <div
    className={`tf-override-panel-expiry ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-override-panel-expiry__label">OVERRIDE EXPIRES AFTER</span>
    <div className="tf-override-panel-expiry__options">
      {PRESET_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`tf-override-expiry-option ${
            minutes === opt.value ? "tf-override-expiry-option--selected" : ""
          }`}
          onClick={() => onChange(opt.value)}
          data-testid={`override-expiry-${opt.value}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

OverridePanelExpiry.displayName = "OverridePanelExpiry";

export default OverridePanelExpiry;
