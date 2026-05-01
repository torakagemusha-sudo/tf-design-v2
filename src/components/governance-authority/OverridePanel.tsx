/**
 * @fileoverview OverridePanel — Panel for requesting authority override.
 *
 * Guides the operator through composing an override request:
 * reason input, authority level selection, expiry, audit trail,
 * and submit/cancel actions.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React, { useState } from "react";
import {
  OverrideRequest,
  AuthorityLevel,
  GovernanceComponentBaseProps,
} from "./types";
import OverridePanelHeader from "./OverridePanelHeader";
import OverridePanelReason from "./OverridePanelReason";
import OverridePanelAuthority from "./OverridePanelAuthority";
import OverridePanelExpiry from "./OverridePanelExpiry";
import OverridePanelAudit from "./OverridePanelAudit";
import OverridePanelSubmit from "./OverridePanelSubmit";

export interface OverridePanelProps extends GovernanceComponentBaseProps {
  operation: string;
  target: string;
  currentAuthority: AuthorityLevel;
  maxEscalation: AuthorityLevel;
  onSubmit: (request: OverrideRequest) => void;
  onCancel: () => void;
  loading?: boolean;
}

/**
 * OverridePanel is the full override request composition surface.
 *
 * Collects reason, authority level, expiry, and audit destination
 * before submitting a governed override request.
 */
const OverridePanel: React.FC<OverridePanelProps> = ({
  operation,
  target,
  currentAuthority,
  maxEscalation,
  onSubmit,
  onCancel,
  loading = false,
  className = "",
  "data-testid": dataTestId = "override-panel",
}) => {
  const [reason, setReason] = useState("");
  const [requestedAuthority, setRequestedAuthority] = useState<AuthorityLevel>(currentAuthority);
  const [expiryMinutes, setExpiryMinutes] = useState<number>(60);
  const [auditDestination, setAuditDestination] = useState("default");

  const handleSubmit = () => {
    onSubmit({
      operation,
      target,
      reason,
      requestedAuthority,
      requestedBy: "current-user",
      requestedAt: new Date().toISOString(),
      expiryMinutes,
      auditDestination,
    });
  };

  return (
    <div
      className={`tf-override-panel ${className}`.trim()}
      data-testid={dataTestId}
    >
      <OverridePanelHeader operation={operation} target={target} />
      <OverridePanelReason value={reason} onChange={setReason} />
      <OverridePanelAuthority
        currentAuthority={currentAuthority}
        maxEscalation={maxEscalation}
        selected={requestedAuthority}
        onSelect={setRequestedAuthority}
      />
      <OverridePanelExpiry minutes={expiryMinutes} onChange={setExpiryMinutes} />
      <OverridePanelAudit destination={auditDestination} onChange={setAuditDestination} />
      <OverridePanelSubmit
        canSubmit={reason.trim().length > 0}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

OverridePanel.displayName = "OverridePanel";

export default OverridePanel;
