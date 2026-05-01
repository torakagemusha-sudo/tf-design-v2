/**
 * @fileoverview SignedWorkorderAudit — Audit trail link.
 *
 * Provides a clickable link to the full audit trail for this workorder.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface SignedWorkorderAuditProps extends GovernanceComponentBaseProps {
  auditTrailId: string;
  onViewAudit?: (auditTrailId: string) => void;
}

/**
 * SignedWorkorderAudit renders a link to the workorder audit trail.
 */
const SignedWorkorderAudit: React.FC<SignedWorkorderAuditProps> = ({
  auditTrailId,
  onViewAudit,
  className = "",
  "data-testid": dataTestId = "signed-workorder-audit",
}) => (
  <div
    className={`tf-signed-workorder-audit ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-signed-workorder-audit__label">AUDIT TRAIL</span>
    <code className="tf-signed-workorder-audit__id">{auditTrailId}</code>
    {onViewAudit && (
      <button
        type="button"
        className="tf-btn tf-btn--audit"
        onClick={() => onViewAudit(auditTrailId)}
        data-testid="view-audit-btn"
      >
        VIEW FULL AUDIT
      </button>
    )}
  </div>
);

SignedWorkorderAudit.displayName = "SignedWorkorderAudit";

export default SignedWorkorderAudit;
