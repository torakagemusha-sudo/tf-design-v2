/**
 * @fileoverview GovernanceViolationCard — Policy violation card.
 *
 * Displays a single policy violation with its severity, detection
 * time, status, and resolution action.
 */

import React from "react";
import { PolicyViolation } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface GovernanceViolationCardProps extends GovernanceComponentBaseProps {
  violation: PolicyViolation;
  onResolve?: (violationId: string) => void;
}

const severityClassMap: Record<string, string> = {
  low: "tf-governance-violation--low",
  medium: "tf-governance-violation--medium",
  high: "tf-governance-violation--high",
  critical: "tf-governance-violation--critical",
};

const statusClassMap: Record<string, string> = {
  open: "tf-governance-violation--open",
  acknowledged: "tf-governance-violation--acknowledged",
  resolved: "tf-governance-violation--resolved",
  escalated: "tf-governance-violation--escalated",
};

/**
 * GovernanceViolationCard renders a policy violation entry.
 */
const GovernanceViolationCard: React.FC<GovernanceViolationCardProps> = ({
  violation,
  onResolve,
  className = "",
  "data-testid": dataTestId,
}) => (
  <div
    className={`tf-governance-violation-card ${severityClassMap[violation.severity]} ${statusClassMap[violation.status]} ${className}`.trim()}
    data-testid={dataTestId || `governance-violation-${violation.id}`}
  >
    <div className="tf-governance-violation-card__header">
      <span className="tf-governance-violation-card__severity">
        {violation.severity.toUpperCase()}
      </span>
      <span className="tf-governance-violation-card__status">
        {violation.status.toUpperCase()}
      </span>
    </div>
    <span className="tf-governance-violation-card__policy">
      {violation.policyName} · {violation.ruleLabel}
    </span>
    <div className="tf-governance-violation-card__meta">
      <span className="tf-governance-violation-card__actor">
        ACTOR: {violation.actor}
      </span>
      <span className="tf-governance-violation-card__target">
        TARGET: {violation.target}
      </span>
      <time className="tf-governance-violation-card__time">
        {violation.detectedAt}
      </time>
    </div>
    {violation.resolution && (
      <span className="tf-governance-violation-card__resolution">
        {violation.resolution}
      </span>
    )}
    {violation.status === "open" && onResolve && (
      <button
        type="button"
        className="tf-btn tf-btn--resolve"
        onClick={() => onResolve(violation.id)}
        data-testid={`violation-resolve-${violation.id}`}
      >
        RESOLVE
      </button>
    )}
  </div>
);

GovernanceViolationCard.displayName = "GovernanceViolationCard";

export default GovernanceViolationCard;
