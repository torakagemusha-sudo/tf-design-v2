/**
 * @fileoverview OverridePanelReason — Reason input field for override.
 *
 * A multi-line textarea for the operator to provide a mandatory
 * justification for the override request.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface OverridePanelReasonProps extends GovernanceComponentBaseProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * OverridePanelReason captures the override rationale.
 */
const OverridePanelReason: React.FC<OverridePanelReasonProps> = ({
  value,
  onChange,
  className = "",
  "data-testid": dataTestId = "override-panel-reason",
}) => (
  <div
    className={`tf-override-panel-reason ${className}`.trim()}
    data-testid={dataTestId}
  >
    <label className="tf-override-panel-reason__label" htmlFor="override-reason">
      OVERRIDE REASON <span className="tf-override-panel-reason__required">*</span>
    </label>
    <textarea
      id="override-reason"
      className="tf-override-panel-reason__input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Provide a detailed justification for this override request…"
      rows={4}
      data-testid="override-reason-input"
    />
    {value.trim().length === 0 && (
      <span className="tf-override-panel-reason__hint">
        Reason is required. Override requests without justification are denied.
      </span>
    )}
  </div>
);

OverridePanelReason.displayName = "OverridePanelReason";

export default OverridePanelReason;
