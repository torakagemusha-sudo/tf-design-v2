/**
 * @fileoverview SignedWorkorderSignature — Signature block.
 *
 * Displays a single signature on a workorder: signer identity,
 * role, authority level, timestamp, and hash.
 */

import React from "react";
import { WorkorderSignature } from "./types";
import { AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface SignedWorkorderSignatureProps extends GovernanceComponentBaseProps {
  signature: WorkorderSignature;
}

/**
 * SignedWorkorderSignature renders one signature block.
 */
const SignedWorkorderSignature: React.FC<SignedWorkorderSignatureProps> = ({
  signature,
  className = "",
  "data-testid": dataTestId = "signed-workorder-signature",
}) => (
  <div
    className={`tf-signed-workorder-signature ${className}`.trim()}
    data-testid={dataTestId}
  >
    <div className="tf-signed-workorder-signature__seal">
      <span className="tf-signed-workorder-signature__icon">◈</span>
      <span className="tf-signed-workorder-signature__status">SIGNED</span>
    </div>
    <div className="tf-signed-workorder-signature__identity">
      <span className="tf-signed-workorder-signature__name">
        {signature.signerName}
      </span>
      <span className="tf-signed-workorder-signature__role">
        {signature.signerRole} · AUTH {signature.authorityLevel} ·{" "}
        {AUTHORITY_LEVELS[signature.authorityLevel]}
      </span>
    </div>
    <div className="tf-signed-workorder-signature__meta">
      <span className="tf-signed-workorder-signature__timestamp">
        {signature.signedAt}
      </span>
      <code className="tf-signed-workorder-signature__hash">
        {signature.signatureHash}
      </code>
    </div>
    {signature.comment && (
      <span className="tf-signed-workorder-signature__comment">
        “{signature.comment}”
      </span>
    )}
  </div>
);

SignedWorkorderSignature.displayName = "SignedWorkorderSignature";

export default SignedWorkorderSignature;
