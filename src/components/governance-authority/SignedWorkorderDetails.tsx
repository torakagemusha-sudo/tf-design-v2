/**
 * @fileoverview SignedWorkorderDetails — Workorder detail fields.
 *
 * Renders the description, requester, target, and authority requirement.
 */

import React from "react";
import { AuthorityLevel, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface SignedWorkorderDetailsProps extends GovernanceComponentBaseProps {
  description: string;
  type: string;
  requestedBy: string;
  requestedAt: string;
  target: string;
  targetType: string;
  authorityRequired: AuthorityLevel;
}

/**
 * SignedWorkorderDetails renders the core workorder metadata.
 */
const SignedWorkorderDetails: React.FC<SignedWorkorderDetailsProps> = ({
  description,
  type,
  requestedBy,
  requestedAt,
  target,
  targetType,
  authorityRequired,
  className = "",
  "data-testid": dataTestId = "signed-workorder-details",
}) => (
  <div
    className={`tf-signed-workorder-details ${className}`.trim()}
    data-testid={dataTestId}
  >
    <p className="tf-signed-workorder-details__description">{description}</p>
    <div className="tf-signed-workorder-details__grid">
      <div className="tf-signed-workorder-details__field">
        <span className="tf-signed-workorder-details__label">TYPE</span>
        <span className="tf-signed-workorder-details__value">{type}</span>
      </div>
      <div className="tf-signed-workorder-details__field">
        <span className="tf-signed-workorder-details__label">REQUESTED BY</span>
        <span className="tf-signed-workorder-details__value">{requestedBy}</span>
      </div>
      <div className="tf-signed-workorder-details__field">
        <span className="tf-signed-workorder-details__label">REQUESTED AT</span>
        <span className="tf-signed-workorder-details__value">{requestedAt}</span>
      </div>
      <div className="tf-signed-workorder-details__field">
        <span className="tf-signed-workorder-details__label">TARGET</span>
        <span className="tf-signed-workorder-details__value">{target} ({targetType})</span>
      </div>
      <div className="tf-signed-workorder-details__field">
        <span className="tf-signed-workorder-details__label">AUTHORITY REQUIRED</span>
        <span className="tf-signed-workorder-details__value tf-signed-workorder-details__value--authority">
          AUTH {authorityRequired} · {AUTHORITY_LEVELS[authorityRequired]}
        </span>
      </div>
    </div>
  </div>
);

SignedWorkorderDetails.displayName = "SignedWorkorderDetails";

export default SignedWorkorderDetails;
