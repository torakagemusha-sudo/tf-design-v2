/**
 * @fileoverview AuthorityLadderGap — Shows gap to required level.
 *
 * Visual indicator of how many authority levels separate the
 * operator's current authority from what is required.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface AuthorityLadderGapProps extends GovernanceComponentBaseProps {
  gap: number;
}

/**
 * AuthorityLadderGap renders the authority gap indicator.
 */
const AuthorityLadderGap: React.FC<AuthorityLadderGapProps> = ({
  gap,
  className = "",
  "data-testid": dataTestId = "authority-ladder-gap",
}) => (
  <div
    className={`tf-auth-ladder-gap ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-auth-ladder-gap__label">GAP</span>
    <span className="tf-auth-ladder-gap__value">
      {gap} {gap === 1 ? "LEVEL" : "LEVELS"}
    </span>
    <span className="tf-auth-ladder-gap__message">
      ESCALATION REQUIRED TO PROCEED
    </span>
  </div>
);

AuthorityLadderGap.displayName = "AuthorityLadderGap";

export default AuthorityLadderGap;
