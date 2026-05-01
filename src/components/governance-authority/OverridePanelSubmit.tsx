/**
 * @fileoverview OverridePanelSubmit — Submit / Cancel buttons.
 *
 * Final action controls for the override panel. Submit is disabled
 * until the reason field is populated.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface OverridePanelSubmitProps extends GovernanceComponentBaseProps {
  canSubmit: boolean;
  loading?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * OverridePanelSubmit renders the submit and cancel controls.
 */
const OverridePanelSubmit: React.FC<OverridePanelSubmitProps> = ({
  canSubmit,
  loading = false,
  onSubmit,
  onCancel,
  className = "",
  "data-testid": dataTestId = "override-panel-submit",
}) => (
  <div
    className={`tf-override-panel-submit ${className}`.trim()}
    data-testid={dataTestId}
  >
    <button
      type="button"
      className="tf-btn tf-btn--submit"
      disabled={!canSubmit || loading}
      onClick={onSubmit}
      data-testid="override-submit-btn"
    >
      {loading ? "SUBMITTING…" : "SUBMIT OVERRIDE REQUEST"}
    </button>
    <button
      type="button"
      className="tf-btn tf-btn--cancel"
      onClick={onCancel}
      data-testid="override-cancel-btn"
    >
      CANCEL
    </button>
  </div>
);

OverridePanelSubmit.displayName = "OverridePanelSubmit";

export default OverridePanelSubmit;
