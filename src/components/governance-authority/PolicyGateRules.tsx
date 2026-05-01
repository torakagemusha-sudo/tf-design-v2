/**
 * @fileoverview PolicyGateRules — Lists all policy rules with status.
 *
 * Displays each rule's label, description, and current pass/fail/warn
 * state. Critical failures are visually emphasized.
 */

import React from "react";
import { PolicyRule } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface PolicyGateRulesProps extends GovernanceComponentBaseProps {
  rules: PolicyRule[];
}

const statusIconMap: Record<string, string> = {
  pass: "✓",
  fail: "✗",
  warning: "!",
  pending: "◌",
  blocked: "⊘",
};

const statusClassMap: Record<string, string> = {
  pass: "tf-policy-gate-rule--pass",
  fail: "tf-policy-gate-rule--fail",
  warning: "tf-policy-gate-rule--warn",
  pending: "tf-policy-gate-rule--pending",
  blocked: "tf-policy-gate-rule--blocked",
};

/**
 * PolicyGateRules renders a list of policy rule evaluations.
 */
const PolicyGateRules: React.FC<PolicyGateRulesProps> = ({
  rules,
  className = "",
  "data-testid": dataTestId = "policy-gate-rules",
}) => (
  <ul className={`tf-policy-gate-rules ${className}`.trim()} data-testid={dataTestId}>
    {rules.map((rule) => (
      <li
        key={rule.id}
        className={`tf-policy-gate-rule ${statusClassMap[rule.status]} tf-policy-gate-rule--sev-${rule.severity}`}
        data-testid={`policy-rule-${rule.id}`}
      >
        <span className="tf-policy-gate-rule__icon">
          {statusIconMap[rule.status]}
        </span>
        <div className="tf-policy-gate-rule__body">
          <span className="tf-policy-gate-rule__label">{rule.label}</span>
          {rule.description && (
            <span className="tf-policy-gate-rule__desc">{rule.description}</span>
          )}
          {rule.message && (
            <span className="tf-policy-gate-rule__msg">{rule.message}</span>
          )}
        </div>
        <span className="tf-policy-gate-rule__severity">{rule.severity.toUpperCase()}</span>
      </li>
    ))}
  </ul>
);

PolicyGateRules.displayName = "PolicyGateRules";

export default PolicyGateRules;
