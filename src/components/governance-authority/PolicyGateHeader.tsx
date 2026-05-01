/**
 * @fileoverview PolicyGateHeader — Gate header displaying the policy name.
 *
 * Shows the policy being evaluated and its current evaluation status.
 * Uses authority-gold accents for active policies.
 */

import React from "react";
import { PolicyGateStatus } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface PolicyGateHeaderProps extends GovernanceComponentBaseProps {
  policyName: string;
  status: PolicyGateStatus;
}

const statusLabelMap: Record<PolicyGateStatus, string> = {
  pass: "POLICY SATISFIED",
  fail: "POLICY BLOCKED",
  warning: "POLICY WARNING",
  pending: "EVALUATING",
  blocked: "GATE BLOCKED",
};

const statusClassMap: Record<PolicyGateStatus, string> = {
  pass: "tf-policy-gate-header--pass",
  fail: "tf-policy-gate-header--fail",
  warning: "tf-policy-gate-header--warn",
  pending: "tf-policy-gate-header--pending",
  blocked: "tf-policy-gate-header--blocked",
};

/**
 * PolicyGateHeader renders the policy name and evaluation status.
 */
const PolicyGateHeader: React.FC<PolicyGateHeaderProps> = ({
  policyName,
  status,
  className = "",
  "data-testid": dataTestId = "policy-gate-header",
}) => (
  <div
    className={`tf-policy-gate-header ${statusClassMap[status]} ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-policy-gate-header__label">POLICY GATE</span>
    <h3 className="tf-policy-gate-header__name">{policyName}</h3>
    <span className={`tf-policy-gate-header__status tf-policy-gate-header__status--${status}`}>
      {statusLabelMap[status]}
    </span>
  </div>
);

PolicyGateHeader.displayName = "PolicyGateHeader";

export default PolicyGateHeader;
