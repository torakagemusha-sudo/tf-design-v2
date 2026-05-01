/**
 * @fileoverview SignedWorkorderCard — Displays a signed workorder.
 *
 * Presents a complete workorder: header, details, signature blocks,
 * and audit trail. Used to verify a governed action has been
 * properly authorized and signed.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React from "react";
import { SignedWorkorder } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import SignedWorkorderHeader from "./SignedWorkorderHeader";
import SignedWorkorderDetails from "./SignedWorkorderDetails";
import SignedWorkorderSignature from "./SignedWorkorderSignature";
import SignedWorkorderAudit from "./SignedWorkorderAudit";

export interface SignedWorkorderCardProps extends GovernanceComponentBaseProps {
  workorder: SignedWorkorder;
  onViewAudit?: (auditTrailId: string) => void;
}

/**
 * SignedWorkorderCard renders a fully-signed governed workorder.
 */
const SignedWorkorderCard: React.FC<SignedWorkorderCardProps> = ({
  workorder,
  onViewAudit,
  className = "",
  "data-testid": dataTestId = "signed-workorder-card",
}) => (
  <article
    className={`tf-signed-workorder-card ${className}`.trim()}
    data-testid={dataTestId}
  >
    <SignedWorkorderHeader
      title={workorder.title}
      status={workorder.status}
      priority={workorder.priority}
      id={workorder.id}
    />
    <SignedWorkorderDetails
      description={workorder.description}
      type={workorder.type}
      requestedBy={workorder.requestedBy}
      requestedAt={workorder.requestedAt}
      target={workorder.target}
      targetType={workorder.targetType}
      authorityRequired={workorder.authorityRequired}
    />
    <div className="tf-signed-workorder-card__signatures">
      <span className="tf-signed-workorder-card__signatures-label">SIGNATURES</span>
      {workorder.signatures.map((sig, i) => (
        <SignedWorkorderSignature key={i} signature={sig} />
      ))}
    </div>
    <SignedWorkorderAudit
      auditTrailId={workorder.auditTrailId}
      onViewAudit={onViewAudit}
    />
  </article>
);

SignedWorkorderCard.displayName = "SignedWorkorderCard";

export default SignedWorkorderCard;
