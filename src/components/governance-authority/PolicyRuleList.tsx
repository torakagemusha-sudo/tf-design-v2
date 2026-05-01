/**
 * @fileoverview PolicyRuleList — List of rules in a policy.
 *
 * Displays all rules within a policy with their status, condition,
 * and severity. Supports reordering and editing.
 */

import React from "react";
import { PolicyRule } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import PolicyRuleItem from "./PolicyRuleItem";

export interface PolicyRuleListProps extends GovernanceComponentBaseProps {
  rules: PolicyRule[];
  onEdit?: (rule: PolicyRule) => void;
  onDelete?: (ruleId: string) => void;
  onToggleStatus?: (ruleId: string) => void;
}

/**
 * PolicyRuleList renders all rules within a policy.
 */
const PolicyRuleList: React.FC<PolicyRuleListProps> = ({
  rules,
  onEdit,
  onDelete,
  onToggleStatus,
  className = "",
  "data-testid": dataTestId = "policy-rule-list",
}) => (
  <div
    className={`tf-policy-rule-list ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-policy-rule-list__label">
      RULES ({rules.length})
    </span>
    <ul className="tf-policy-rule-list__items">
      {rules.map((rule) => (
        <PolicyRuleItem
          key={rule.id}
          rule={rule}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  </div>
);

PolicyRuleList.displayName = "PolicyRuleList";

export default PolicyRuleList;
