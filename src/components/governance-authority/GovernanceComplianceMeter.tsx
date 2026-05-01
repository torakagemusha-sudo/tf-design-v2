/**
 * @fileoverview GovernanceComplianceMeter — Compliance percentage.
 *
 * Visual meter showing the overall compliance score with a
 * circular or bar visualization and category breakdown.
 */

import React from "react";
import { ComplianceScore } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface GovernanceComplianceMeterProps extends GovernanceComponentBaseProps {
  score: ComplianceScore;
}

/**
 * GovernanceComplianceMeter renders a compliance score visualization.
 */
const GovernanceComplianceMeter: React.FC<GovernanceComplianceMeterProps> = ({
  score,
  className = "",
  "data-testid": dataTestId = "governance-compliance-meter",
}) => {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference * (1 - score.overall / 100);
  const scoreClass =
    score.overall >= 90
      ? "tf-compliance--excellent"
      : score.overall >= 70
      ? "tf-compliance--good"
      : score.overall >= 50
      ? "tf-compliance--fair"
      : "tf-compliance--poor";

  return (
    <div
      className={`tf-governance-compliance-meter ${scoreClass} ${className}`.trim()}
      data-testid={dataTestId}
    >
      <span className="tf-governance-compliance-meter__label">COMPLIANCE</span>
      <svg
        className="tf-governance-compliance-meter__ring"
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <circle
          className="tf-governance-compliance-meter__track"
          cx="50"
          cy="50"
          r="40"
        />
        <circle
          className="tf-governance-compliance-meter__fill"
          cx="50"
          cy="50"
          r="40"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text
          className="tf-governance-compliance-meter__value"
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {score.overall}%
        </text>
      </svg>
      <span className="tf-governance-compliance-meter__trend">
        {score.trend > 0 ? "▲" : score.trend < 0 ? "▼" : "—"} {Math.abs(score.trend)}%
      </span>
      <div className="tf-governance-compliance-meter__breakdown">
        {Object.entries(score.byCategory).map(([cat, val]) => (
          <div key={cat} className="tf-governance-compliance-meter__category">
            <span className="tf-governance-compliance-meter__cat-label">
              {cat.toUpperCase()}
            </span>
            <div className="tf-governance-compliance-meter__bar">
              <div
                className="tf-governance-compliance-meter__bar-fill"
                style={{ width: `${val}%` }}
              />
            </div>
            <span className="tf-governance-compliance-meter__cat-value">{val}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

GovernanceComplianceMeter.displayName = "GovernanceComplianceMeter";

export default GovernanceComplianceMeter;
