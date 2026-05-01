/**
 * @fileoverview PolicyConditionBuilder — Build policy conditions.
 *
 * Interactive condition builder that lets operators construct
 * field-operator-value conditions with nesting and grouping.
 */

import React, { useState } from "react";
import { PolicyCondition, PolicyConditionGroup } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface PolicyConditionBuilderProps extends GovernanceComponentBaseProps {
  group: PolicyConditionGroup;
  onChange: (group: PolicyConditionGroup) => void;
}

const OPERATORS = ["eq", "ne", "gt", "gte", "lt", "lte", "in", "contains", "exists"] as const;

/**
 * PolicyConditionBuilder renders an interactive condition editor.
 */
const PolicyConditionBuilder: React.FC<PolicyConditionBuilderProps> = ({
  group,
  onChange,
  className = "",
  "data-testid": dataTestId = "policy-condition-builder",
}) => {
  const [newField, setNewField] = useState("");
  const [newOp, setNewOp] = useState<string>("eq");
  const [newValue, setNewValue] = useState("");

  const addCondition = () => {
    if (!newField.trim()) return;
    const cond: PolicyCondition = {
      field: newField,
      operator: newOp as PolicyCondition["operator"],
      value: newValue,
    };
    onChange({
      ...group,
      conditions: [...group.conditions, cond],
    });
    setNewField("");
    setNewValue("");
  };

  const removeCondition = (index: number) => {
    onChange({
      ...group,
      conditions: group.conditions.filter((_, i) => i !== index),
    });
  };

  return (
    <div
      className={`tf-policy-condition-builder ${className}`.trim()}
      data-testid={dataTestId}
    >
      <span className="tf-policy-condition-builder__label">
        CONDITIONS ({group.operator.toUpperCase()})
      </span>
      <ul className="tf-policy-conditions">
        {group.conditions.map((cond, i) => (
          <li key={i} className="tf-policy-condition">
            <span className="tf-policy-condition__field">{cond.field}</span>
            <span className="tf-policy-condition__operator">{cond.operator}</span>
            <span className="tf-policy-condition__value">{JSON.stringify(cond.value)}</span>
            <button
              type="button"
              className="tf-btn tf-btn--remove"
              onClick={() => removeCondition(i)}
              data-testid={`cond-remove-${i}`}
              aria-label="Remove condition"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="tf-policy-condition-builder__add">
        <input
          type="text"
          className="tf-policy-condition-builder__field"
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          placeholder="Field"
          data-testid="cond-field-input"
        />
        <select
          className="tf-policy-condition-builder__op"
          value={newOp}
          onChange={(e) => setNewOp(e.target.value)}
          data-testid="cond-op-select"
        >
          {OPERATORS.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="tf-policy-condition-builder__value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Value"
          data-testid="cond-value-input"
        />
        <button
          type="button"
          className="tf-btn tf-btn--add"
          onClick={addCondition}
          data-testid="cond-add-btn"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

PolicyConditionBuilder.displayName = "PolicyConditionBuilder";

export default PolicyConditionBuilder;
