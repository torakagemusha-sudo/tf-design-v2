/**
 * @fileoverview OverridePanelAudit — Audit trail destination selector.
 *
 * Chooses where the override audit record is written.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface OverridePanelAuditProps extends GovernanceComponentBaseProps {
  destination: string;
  onChange: (destination: string) => void;
}

const AUDIT_DESTINATIONS = [
  { value: "default", label: "DEFAULT AUDIT LOG" },
  { value: "compliance", label: "COMPLIANCE AUDIT TRAIL" },
  { value: "security", label: "SECURITY EVENT LOG" },
  { value: "governance", label: "GOVERNANCE REVIEW QUEUE" },
];

/**
 * OverridePanelAudit renders the audit destination selector.
 */
const OverridePanelAudit: React.FC<OverridePanelAuditProps> = ({
  destination,
  onChange,
  className = "",
  "data-testid": dataTestId = "override-panel-audit",
}) => (
  <div
    className={`tf-override-panel-audit ${className}`.trim()}
    data-testid={dataTestId}
  >
    <label className="tf-override-panel-audit__label" htmlFor="override-audit">
      AUDIT DESTINATION
    </label>
    <select
      id="override-audit"
      className="tf-override-panel-audit__select"
      value={destination}
      onChange={(e) => onChange(e.target.value)}
      data-testid="override-audit-select"
    >
      {AUDIT_DESTINATIONS.map((dest) => (
        <option key={dest.value} value={dest.value}>
          {dest.label}
        </option>
      ))}
    </select>
  </div>
);

OverridePanelAudit.displayName = "OverridePanelAudit";

export default OverridePanelAudit;
