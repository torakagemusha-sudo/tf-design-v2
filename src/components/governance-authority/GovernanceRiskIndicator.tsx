/**
 * @fileoverview GovernanceRiskIndicator — Risk level indicator.
 *
 * Displays the current risk level (low/medium/high/critical) with
 * a color-coded badge, score, contributing factors, and trend.
 */

import React from "react";
import { RiskIndicator } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface GovernanceRiskIndicatorProps extends GovernanceComponentBaseProps {
  risk: RiskIndicator;
}

const levelClassMap: Record<string, string> = {
  low: "tf-risk-indicator--low",
  medium: "tf-risk-indicator--medium",
  high: "tf-risk-indicator--high",
  critical: "tf-risk-indicator--critical",
};

const trendClassMap: Record<string, string> = {
  improving: "tf-risk-trend--improving",
  stable: "tf-risk-trend--stable",
  worsening: "tf-risk-trend--worsening",
};

/**
 * GovernanceRiskIndicator renders the current risk posture.
 */
const GovernanceRiskIndicator: React.FC<GovernanceRiskIndicatorProps> = ({
  risk,
  className = "",
  "data-testid": dataTestId = "governance-risk-indicator",
}) => (
  <div
    className={`tf-governance-risk-indicator ${levelClassMap[risk.level]} ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-governance-risk-indicator__label">RISK LEVEL</span>
    <span className="tf-governance-risk-indicator__level">
      {risk.level.toUpperCase()}
    </span>
    <span className="tf-governance-risk-indicator__score">{risk.score}/100</span>
    <span className={`tf-governance-risk-indicator__trend ${trendClassMap[risk.trend]}`}>
      {risk.trend.toUpperCase()}
    </span>
    <ul className="tf-governance-risk-indicator__factors">
      {risk.factors.map((factor, i) => (
        <li key={i} className="tf-governance-risk-indicator__factor">
          {factor}
        </li>
      ))}
    </ul>
  </div>
);

GovernanceRiskIndicator.displayName = "GovernanceRiskIndicator";

export default GovernanceRiskIndicator;
