/**
 * @fileoverview LockStatusPanel — Detailed lock status.
 *
 * Displays the lock state icon and target name.
 */

import React from "react";
import { LockState } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface LockStatusPanelProps extends GovernanceComponentBaseProps {
  state: LockState;
  target: string;
}

const stateIconMap: Record<LockState, string> = {
  unlocked: "🔓",
  locked: "🔒",
  override: "🔏",
  expired: "⏰",
  pending: "⏳",
};

const stateClassMap: Record<LockState, string> = {
  unlocked: "tf-lock-status--unlocked",
  locked: "tf-lock-status--locked",
  override: "tf-lock-status--override",
  expired: "tf-lock-status--expired",
  pending: "tf-lock-status--pending",
};

/**
 * LockStatusPanel renders the detailed lock status display.
 */
const LockStatusPanel: React.FC<LockStatusPanelProps> = ({
  state,
  target,
  className = "",
  "data-testid": dataTestId = "lock-status-panel",
}) => (
  <div
    className={`tf-lock-status-panel ${stateClassMap[state]} ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-lock-status-panel__icon">{stateIconMap[state]}</span>
    <div className="tf-lock-status-panel__body">
      <span className="tf-lock-status-panel__target">{target}</span>
      <span className="tf-lock-status-panel__state">{state.toUpperCase()}</span>
    </div>
  </div>
);

LockStatusPanel.displayName = "LockStatusPanel";

export default LockStatusPanel;
