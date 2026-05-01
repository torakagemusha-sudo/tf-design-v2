/**
 * @fileoverview PolicyGate — Enforces policy before action.
 *
 * Displays all policy rules and their current status, blocks
 * action if any critical rule fails, and provides an override
 * path when the user has sufficient authority.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React from "react";
import {
  PolicyGateResult,
  AuthorityLevel,
  GovernanceComponentBaseProps,
} from "./types";
import PolicyGateHeader from "./PolicyGateHeader";
import PolicyGateRules from "./PolicyGateRules";
import PolicyGateStatus from "./PolicyGateStatus";
import PolicyGateAction from "./PolicyGateAction";

export interface PolicyGateProps extends GovernanceComponentBaseProps {
  result: PolicyGateResult;
  currentAuthority: AuthorityLevel;
  onProceed?: () => void;
  onOverride?: () => void;
  onCancel?: () => void;
  loading?: boolean;
}

/**
 * PolicyGate enforces policy checks before an action is permitted.
 *
 * Renders the policy name, each rule with its status, an overall
 * status indicator, and action buttons (proceed / override / cancel).
 */
const PolicyGate: React.FC<PolicyGateProps> = ({
  result,
  currentAuthority,
  onProceed,
  onOverride,
  onCancel,
  loading = false,
  className = "",
  "data-testid": dataTestId = "policy-gate",
}) => {
  const allPass = result.rules.every(
    (r) => r.status === "pass" || r.severity !== "critical"
  );
  const criticalFail = result.rules.some(
    (r) => r.status === "fail" && r.severity === "critical"
  );

  return (
    <div
      className={`tf-policy-gate ${className}`.trim()}
      data-testid={dataTestId}
    >
      <PolicyGateHeader policyName={result.policyName} status={result.status} />
      <PolicyGateStatus status={result.status} requiredAuthority={result.requiredAuthority} />
      <PolicyGateRules rules={result.rules} />
      <PolicyGateAction
        canProceed={allPass && !criticalFail}
        canOverride={result.canOverride && currentAuthority >= result.overrideRequires}
        overrideRequires={result.overrideRequires}
        currentAuthority={currentAuthority}
        loading={loading}
        onProceed={onProceed}
        onOverride={onOverride}
        onCancel={onCancel}
      />
    </div>
  );
};

PolicyGate.displayName = "PolicyGate";

export default PolicyGate;
