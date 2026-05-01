/**
 * @fileoverview PolicyRuleItem — Single policy rule.
 *
 * Displays one rule: label, description, condition, status badge,
 * severity, and action buttons for edit/delete/toggle.
 */

import React from "react";
import { PolicyRule } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface PolicyRuleItemProps extends GovernanceComponentBaseProps {
  rule: PolicyRule;
  onEdit?: (rule: PolicyRule) => void;
  onDelete?: (ruleId: string) => void;
  onToggleStatus?: (ruleId: string) => void;
}

const statusClassMap: Record<string, string> = {
  pass: "tf-policy-rule-item--pass",
  fail: "tf-policy-rule-item--fail",
  warning: "tf-policy-rule-item--warn",
  pending: "tf-policy-rule-item--pending",
  blocked: "tf-policy-rule-item--blocked",
};

/**
 * PolicyRuleItem renders a single policy rule row.
 */
const PolicyRuleItem: React.FC<PolicyRuleItemProps> = ({
  rule,
  onEdit,
  onDelete,
  onToggleStatus,
  className = "",
  "data-testid": dataTestId,
}) => (
  <li
    className={`tf-policy-rule-item ${statusClassMap[rule.status]} ${className}`.trim()}
    data-testid={dataTestId || `policy-rule-item-${rule.id}`}
  >
    <div className="tf-policy-rule-item__main">
      <span className="tf-policy-rule-item__label">{rule.label}</span>
      <span className="tf-policy-rule-item__status">{rule.status.toUpperCase()}</span>
      <span className="tf-policy-rule-item__severity">{rule.severity.toUpperCase()}</span>
    </div>
    {rule.description && (
      <span className="tf-policy-rule-item__desc">{rule.description}</span>
    )}
    <code className="tf-policy-rule-item__condition">
      {rule.condition.field} {rule.condition.operator} {JSON.stringify(rule.condition.value)}
    </code>
    <div className="tf-policy-rule-item__actions">
      <button
        type="button"
        className="tf-btn tf-btn--edit"
        onClick={() => onEdit?.(rule)}
        data-testid="rule-edit-btn"
      >
        EDIT
      </button>
      <button
        type="button"
        className="tf-btn tf-btn--toggle"
        onClick={() => onToggleStatus?.(rule.id)}
        data-testid="rule-toggle-btn"
      >
        TOGGLE
      </button>
      <button
        type="button"
        className="tf-btn tf-btn--danger"
        onClick={() => onDelete?.(rule.id)}
        data-testid="rule-delete-btn"
      >
        DELETE
      </button>
    </div>
  </li>
);

PolicyRuleItem.displayName = "PolicyRuleItem";

export default PolicyRuleItem;
